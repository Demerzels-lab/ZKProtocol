import { useState, useEffect, useMemo } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Shield, TrendingUp, Activity, Zap, Plus, ArrowDown, ArrowUp, Repeat, Eye, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { PrivacyControls } from '../components/dashboard/PrivacyControls';
import { TradeTransferPrivately } from '../components/dashboard/TradeTransferPrivately';
import { PrivacyProvider, usePrivacy } from '../contexts/PrivacyContext';
import { getSolBalance, getRecentTransactions } from '../lib/solana';
import { getSolPrice } from '../lib/jupiter';
import { walletConnect, createTransaction as createDbTransaction, getDashboardStats } from '../lib/supabase';
import { InteractiveBackground } from '../components/InteractiveBackground';

interface DbTransaction {
  id: string;
  type: string;
  amount: number;
  privacyLevel: string;
  status: string;
  txHash: string;
  createdAt: string;
}

interface Stats {
  totalDeposits: string;
  totalTrades: number;
  privacyScore: number;
  balance: string;
  gasSaved: string;
}

const DashboardPageContent = () => {
  const { publicKey, sendTransaction, connected, connecting } = useWallet();
  const { connection } = useConnection();
  const { calculatePrivacyScore } = usePrivacy();
  
  const [balance, setBalance] = useState<number>(0);
  const [solPrice, setSolPrice] = useState<number>(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [transactions, setTransactions] = useState<DbTransaction[]>([]);
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'trade'>('deposit');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [onChainTxs, setOnChainTxs] = useState<any[]>([]);

  // Load SOL price from Jupiter
  useEffect(() => {
    const loadPrice = async () => {
      const price = await getSolPrice();
      setSolPrice(price);
    };
    loadPrice();
    
    // Update price every 30 seconds
    const interval = setInterval(loadPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  // Load wallet data when connected
  useEffect(() => {
    if (publicKey && connected) {
      loadWalletData();
    }
  }, [publicKey, connected]);

  const loadWalletData = async () => {
    if (!publicKey) return;

    try {
      // Get SOL balance from blockchain
      const bal = await getSolBalance(publicKey);
      setBalance(bal);

      // Get on-chain transactions
      const txs = await getRecentTransactions(publicKey, 10);
      setOnChainTxs(txs);

      // Register wallet with backend
      const result = await walletConnect(publicKey.toString(), 'phantom');
      setUserId(result.user.id);

      // Load backend stats
      await loadDashboardData(result.user.id);
    } catch (error) {
      console.error('Error loading wallet data:', error);
    }
  };

  const loadDashboardData = async (userIdParam: string) => {
    try {
      const data = await getDashboardStats(userIdParam);
      setStats(data.stats);
      setTransactions(data.recentTransactions);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const handleTransaction = async () => {
    if (!publicKey || !amount || parseFloat(amount) <= 0) return;

    setIsProcessing(true);
    try {
      if (activeTab === 'deposit' || activeTab === 'withdraw') {
        // Create actual Solana transaction
        const recipientPubkey = new PublicKey('9vHmQf7cJ2LbKxDqP3oNuM8kWzYaRsSx5vT6wB4cEfGh'); // Treasury address
        
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: activeTab === 'deposit' ? recipientPubkey : publicKey,
            lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
          })
        );

        // Send transaction
        const signature = await sendTransaction(transaction, connection);
        
        // Wait for confirmation
        await connection.confirmTransaction(signature, 'confirmed');

        // Log to backend
        if (userId) {
          await createDbTransaction(userId, activeTab, amount, 'SOL', 'private');
          await loadDashboardData(userId);
        }

        // Refresh balance
        await loadWalletData();

        setAmount('');
        alert(`Transaction successful! Signature: ${signature.substring(0, 8)}...`);
      } else {
        // Trade simulation (would integrate with Jupiter swap in production)
        if (userId) {
          await createDbTransaction(userId, 'trade', amount, 'SOL', 'private');
          await loadDashboardData(userId);
        }
        setAmount('');
        alert('Trade simulation successful!');
      }
    } catch (error: any) {
      console.error('Transaction failed:', error);
      alert(`Transaction failed: ${error.message || 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const truncateAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDown className="w-5 h-5" />;
      case 'withdraw':
        return <ArrowUp className="w-5 h-5" />;
      case 'trade':
      case 'swap':
        return <Repeat className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  const balanceInUsd = useMemo(() => {
    return (balance * solPrice).toFixed(2);
  }, [balance, solPrice]);

  if (!connected) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="pixel-card p-12 max-w-md w-full text-center bg-white/90">
          <div className="w-20 h-20 bg-primary-500 border-2 border-brand-dark flex items-center justify-center mx-auto mb-6 shadow-DEFAULT">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold font-display text-brand-dark mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-xl text-brand-dark/80 mb-8 leading-relaxed font-mono">
            Start trading with complete privacy. Connect your wallet to access Zero Knowledge protocol on Solana Devnet.
          </p>
          <div className="flex justify-center">
            {/* Wallet button usually renders its own styles, we wrap it to enforce theme */}
            <div className="pixel-btn bg-primary-500 text-white">
              <WalletMultiButton style={{ background: 'transparent', height: 'auto', padding: '12px 24px', fontFamily: 'inherit' }} />
            </div>
          </div>
          {connecting && (
            <div className="flex items-center justify-center gap-2 mt-4 font-mono text-brand-dark">
              <div className="w-3 h-3 bg-primary-500 animate-pulse"></div>
              <p className="text-sm">Connecting...</p>
            </div>
          )}
          <p className="text-sm text-brand-dark/60 mt-6 font-mono border-t-2 border-brand-dark/10 pt-4">
            Devnet mode: Connect Phantom, Solflare, or other Solana-compatible wallets
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-6 lg:px-12 bg-transparent text-brand-dark font-sans">
      <InteractiveBackground />
      
      <div className="max-w-7xl mx-auto">
        {/* Wallet Header - Pixel Glass */}
        <div className="pixel-card p-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-500 border-2 border-brand-dark flex items-center justify-center shadow-sm">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand-dark/60 mb-1">Connected Wallet</div>
              <div className="font-mono text-xl font-bold text-brand-dark bg-white border-2 border-brand-dark px-3 py-1 shadow-sm">
                {truncateAddress(publicKey?.toString() || '')}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-2 bg-secondary-500/10 text-secondary-600 border-2 border-secondary-500 text-sm font-bold flex items-center gap-2 uppercase tracking-wide">
              <div className="w-2 h-2 bg-secondary-500 animate-pulse"></div>
              Solana Devnet
            </div>
            {/* Custom wrapper for wallet button to match pixel theme */}
            <div className="border-2 border-brand-dark shadow-sm bg-white hover:bg-gray-50 transition-colors">
               <WalletMultiButton style={{ background: 'transparent', color: '#5016CA', height: '40px', borderRadius: '0', fontFamily: 'VT323' }} />
            </div>
          </div>
        </div>

        {/* Real-time SOL Price - Retro Banner */}
        {solPrice > 0 && (
          <div className="pixel-card p-4 mb-8 bg-white/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-secondary-500 border-2 border-brand-dark flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-brand-dark font-display">JUPITER FEED:</span>
              </div>
              <div className="text-xl font-bold font-mono text-primary-600 bg-primary-50 px-3 py-1 border-2 border-primary-200">
                1 SOL = ${solPrice.toFixed(2)} USD
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats - Pixel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Wallet Balance', value: `${balance.toFixed(4)} SOL`, subValue: `$${balanceInUsd}`, icon: Plus, bg: 'bg-primary-100' },
            { label: 'Total Transactions', value: onChainTxs.length.toString(), subValue: 'On-chain', icon: Activity, bg: 'bg-secondary-100' },
            { label: 'Privacy Score', value: `${calculatePrivacyScore()}%`, subValue: 'Privacy active', icon: Shield, bg: 'bg-success-100' },
            { label: 'Network', value: 'Devnet', subValue: 'Solana', icon: Zap, bg: 'bg-warning-100' },
          ].map((stat) => (
            <div 
              key={stat.label} 
              className="pixel-card p-6 hover:-translate-y-1 transition-transform group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold uppercase tracking-wide text-brand-dark/70">{stat.label}</span>
                <div className={`w-8 h-8 ${stat.bg} border-2 border-brand-dark flex items-center justify-center shadow-sm group-hover:shadow-DEFAULT transition-all`}>
                  <stat.icon className="w-4 h-4 text-brand-dark" />
                </div>
              </div>
              <div className="text-2xl font-bold font-display text-brand-dark mb-1">{stat.value}</div>
              {stat.subValue && (
                <div className="text-sm font-mono text-brand-dark/60 bg-gray-100 inline-block px-2 border border-gray-300">{stat.subValue}</div>
              )}
            </div>
          ))}
        </div>

        {/* Privacy Controls & Trade Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Privacy Controls */}
          <PrivacyControls />

          {/* Trade & Transfer Privately */}
          <TradeTransferPrivately />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transaction Actions */}
          <div className="lg:col-span-2">
            <div className="pixel-card p-8">
              <h3 className="text-2xl font-bold font-display text-brand-dark mb-6 border-b-4 border-brand-dark pb-2 inline-block">
                Private Transaction
              </h3>

              {/* Tabs - Pixel Style */}
              <div className="flex gap-4 mb-8">
                {[
                  { id: 'deposit', label: 'Deposit', icon: ArrowDown },
                  { id: 'withdraw', label: 'Withdraw', icon: ArrowUp },
                  { id: 'trade', label: 'Trade', icon: Repeat },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-brand-dark font-bold uppercase tracking-wide transition-all ${
                      activeTab === tab.id
                        ? 'bg-primary-500 text-white shadow-DEFAULT transform -translate-y-1'
                        : 'bg-white text-brand-dark hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Transaction Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-brand-dark mb-2 uppercase tracking-wide">
                    Amount (SOL)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full h-14 px-4 border-2 border-brand-dark text-xl font-mono text-brand-dark focus:outline-none focus:shadow-DEFAULT transition-all bg-white placeholder-brand-dark/30"
                      step="0.01"
                      min="0"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-dark font-bold">SOL</div>
                  </div>
                  {amount && solPrice > 0 && (
                    <p className="text-sm font-mono text-brand-dark/70 mt-2 bg-gray-100 inline-block px-2 border border-gray-300">
                      ≈ ${(parseFloat(amount) * solPrice).toFixed(2)} USD
                    </p>
                  )}
                </div>

                <div className="bg-primary-50 border-2 border-brand-dark p-4 flex items-start gap-4">
                  <Shield className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div className="text-sm text-brand-dark font-mono">
                    <div className="font-bold mb-1 uppercase text-primary-700">Real Blockchain Transaction</div>
                    <div>Transaction will execute on Solana Devnet. {activeTab === 'deposit' ? 'SOL will be sent to treasury address.' : activeTab === 'withdraw' ? 'SOL will return to your wallet.' : 'Trade simulation via Jupiter aggregator.'}</div>
                  </div>
                </div>

                <Button
                  size="large"
                  onClick={handleTransaction}
                  loading={isProcessing}
                  className="w-full text-xl"
                  disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance}
                >
                  {isProcessing ? 'Processing...' : `Execute ${activeTab}`}
                </Button>
              </div>
            </div>
          </div>

          {/* Balance Card & Network */}
          <div className="space-y-6">
            <div className="pixel-card p-0 overflow-hidden bg-primary-600 border-none shadow-DEFAULT">
              <div className="p-8 text-white relative">
                {/* Pixel decoration */}
                <div className="absolute top-2 right-2 w-4 h-4 bg-white/20"></div>
                <div className="absolute top-2 right-8 w-4 h-4 bg-white/20"></div>
                <div className="absolute top-8 right-2 w-4 h-4 bg-white/20"></div>
                
                <div className="text-sm font-bold uppercase tracking-wider mb-2 opacity-80">Real-time Balance</div>
                <div className="text-4xl font-bold font-display mb-2">{balance.toFixed(4)}</div>
                <div className="font-mono bg-black/20 inline-block px-2 py-1 text-sm border border-white/20">SOL (${balanceInUsd})</div>
              </div>
            </div>

            <div className="pixel-card p-6">
              <h4 className="text-lg font-bold font-display text-brand-dark mb-4 border-b-2 border-brand-dark/10 pb-2">
                Network Status
              </h4>
              <div className="space-y-4 font-mono text-lg">
                <div className="flex items-center justify-between">
                  <span className="text-brand-dark/70">Connection</span>
                  <span className="px-2 py-0.5 bg-success-500 text-white border-2 border-brand-dark text-sm">
                    ACTIVE
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-brand-dark/70">Network</span>
                  <span className="font-bold text-brand-dark">Devnet</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-brand-dark/70">Wallet</span>
                  <span className="font-bold text-brand-dark">Connected</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* On-chain Transaction History */}
        {onChainTxs.length > 0 && (
          <div className="mt-8 pixel-card p-8">
            <h3 className="text-2xl font-bold font-display text-brand-dark mb-6">
              Recent On-Chain Transactions
            </h3>

            <div className="space-y-4">
              {onChainTxs.slice(0, 5).map((tx) => (
                <div
                  key={tx.signature}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 border-2 border-brand-dark bg-white hover:bg-gray-50 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-4 mb-2 md:mb-0">
                    <div className="w-10 h-10 bg-secondary-500 border-2 border-brand-dark flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-brand-dark uppercase text-sm">Transaction</div>
                      <div className="text-sm text-brand-dark/60 font-mono break-all md:break-normal">
                        {truncateAddress(tx.signature)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono text-brand-dark/80 mb-1">
                      {tx.blockTime ? new Date(tx.blockTime * 1000).toLocaleString() : 'Pending'}
                    </div>
                    {tx.err ? (
                      <span className="px-2 py-0.5 bg-error text-white border-2 border-brand-dark text-xs font-bold uppercase">
                        Failed
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-success-500 text-white border-2 border-brand-dark text-xs font-bold uppercase flex items-center gap-1 justify-end w-fit ml-auto">
                        <CheckCircle className="w-3 h-3" />
                        Confirmed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Wrap with PrivacyProvider
export const DashboardPage = () => {
  return (
    <PrivacyProvider>
      <DashboardPageContent />
    </PrivacyProvider>
  );
};