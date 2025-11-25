import { useState, useEffect, useMemo } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Shield, TrendingUp, Activity, Zap, Plus, ArrowDown, ArrowUp, Repeat, Eye, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { getSolBalance, getRecentTransactions } from '../lib/solana';
import { getSolPrice } from '../lib/jupiter';
import { walletConnect, createTransaction as createDbTransaction, getDashboardStats } from '../lib/supabase';

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

export const DashboardPage = () => {
  const { publicKey, sendTransaction, connected, connecting } = useWallet();
  const { connection } = useConnection();
  
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
        alert(`Transaction berhasil! Signature: ${signature.substring(0, 8)}...`);
      } else {
        // Trade simulation (would integrate with Jupiter swap in production)
        if (userId) {
          await createDbTransaction(userId, 'trade', amount, 'SOL', 'private');
          await loadDashboardData(userId);
        }
        setAmount('');
        alert('Trade simulation berhasil!');
      }
    } catch (error: any) {
      console.error('Transaction failed:', error);
      alert(`Transaction gagal: ${error.message || 'Unknown error'}`);
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
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-12 h-12 text-primary-500" />
          </div>
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-lg text-neutral-700 mb-8">
            Mulai trading dengan privasi penuh. Connect wallet Anda untuk akses Zero Knowledge protocol di Solana Devnet.
          </p>
          <div className="flex justify-center">
            <WalletMultiButton className="!bg-primary-500 hover:!bg-primary-600 !h-14 !px-6 !text-base !font-semibold !rounded-md" />
          </div>
          {connecting && (
            <p className="text-sm text-neutral-500 mt-4">Connecting to wallet...</p>
          )}
          <p className="text-sm text-neutral-500 mt-4">
            Devnet mode: Connect Phantom, Solflare, atau wallet lain yang support Solana
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Wallet Header */}
        <div className="bg-white rounded-lg border border-neutral-200 shadow-card p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <div className="text-sm text-neutral-500">Connected Wallet</div>
                <div className="font-mono text-lg font-semibold text-neutral-900">
                  {truncateAddress(publicKey?.toString() || '')}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-success-50 text-success-500 rounded-full text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                Solana Devnet
              </div>
              <WalletMultiButton className="!bg-neutral-100 hover:!bg-neutral-200 !text-neutral-900 !h-10 !px-4 !text-sm !font-medium !rounded-md" />
            </div>
          </div>
        </div>

        {/* Real-time SOL Price */}
        {solPrice > 0 && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary-600" />
                <span className="text-sm font-medium text-primary-900">Live from Jupiter Aggregator:</span>
              </div>
              <div className="text-lg font-bold text-primary-600">
                1 SOL = ${solPrice.toFixed(2)} USD
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Wallet Balance', value: `${balance.toFixed(4)} SOL`, subValue: `$${balanceInUsd}`, icon: Plus, color: 'primary' },
            { label: 'Total Transactions', value: onChainTxs.length.toString(), subValue: 'On-chain', icon: Activity, color: 'primary' },
            { label: 'Privacy Score', value: `${stats?.privacyScore || 100}%`, subValue: 'Private mode', icon: Shield, color: 'success' },
            { label: 'Network', value: 'Devnet', subValue: 'Solana', icon: Zap, color: 'warning' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-lg border border-neutral-200 shadow-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-500">{stat.label}</span>
                <stat.icon className={`w-5 h-5 text-${stat.color}-500`} />
              </div>
              <div className="text-2xl font-bold text-neutral-900">{stat.value}</div>
              {stat.subValue && (
                <div className="text-xs text-neutral-500 mt-1">{stat.subValue}</div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transaction Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-neutral-200 shadow-card p-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                Private Transaction
              </h3>

              {/* Tabs */}
              <div className="flex gap-2 mb-6 border-b border-neutral-200">
                {[
                  { id: 'deposit', label: 'Deposit', icon: ArrowDown },
                  { id: 'withdraw', label: 'Withdraw', icon: ArrowUp },
                  { id: 'trade', label: 'Trade', icon: Repeat },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-neutral-500 hover:text-neutral-700'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Transaction Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Amount (SOL)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full h-14 px-4 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                    step="0.01"
                    min="0"
                  />
                  {amount && solPrice > 0 && (
                    <p className="text-sm text-neutral-500 mt-2">
                      ≈ ${(parseFloat(amount) * solPrice).toFixed(2)} USD
                    </p>
                  )}
                </div>

                <div className="bg-primary-50 p-4 rounded-md">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-primary-900">
                      <div className="font-semibold mb-1">Real Blockchain Transaction</div>
                      <div>Transaction akan dieksekusi di Solana Devnet. {activeTab === 'deposit' ? 'SOL akan dikirim ke treasury address.' : activeTab === 'withdraw' ? 'SOL akan kembali ke wallet Anda.' : 'Trade simulation via Jupiter aggregator.'}</div>
                    </div>
                  </div>
                </div>

                <Button
                  size="large"
                  onClick={handleTransaction}
                  loading={isProcessing}
                  className="w-full"
                  disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance}
                >
                  {isProcessing ? 'Processing...' : `Execute ${activeTab}`}
                </Button>
              </div>
            </div>
          </div>

          {/* Balance Card */}
          <div>
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-card-hover p-8 text-white mb-6">
              <div className="text-sm opacity-90 mb-2">Real-time Balance</div>
              <div className="text-4xl font-bold mb-1">{balance.toFixed(4)}</div>
              <div className="text-sm opacity-75">SOL (${balanceInUsd})</div>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 shadow-card p-6">
              <h4 className="text-lg font-semibold text-neutral-900 mb-4">
                Network Status
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-700">Connection</span>
                  <span className="px-2 py-1 bg-success-50 text-success-600 rounded text-xs font-medium">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-700">Network</span>
                  <span className="text-sm font-semibold text-neutral-900">Devnet</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-700">Wallet</span>
                  <span className="text-sm font-semibold text-neutral-900">Connected</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* On-chain Transaction History */}
        {onChainTxs.length > 0 && (
          <div className="mt-8 bg-white rounded-lg border border-neutral-200 shadow-card p-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">
              Recent On-Chain Transactions
            </h3>

            <div className="space-y-3">
              {onChainTxs.slice(0, 5).map((tx) => (
                <div
                  key={tx.signature}
                  className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:shadow-card transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                      <Activity className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">Transaction</div>
                      <div className="text-sm text-neutral-500 font-mono">
                        {truncateAddress(tx.signature)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-neutral-700">
                      {tx.blockTime ? new Date(tx.blockTime * 1000).toLocaleString() : 'Pending'}
                    </div>
                    {tx.err ? (
                      <span className="px-2 py-1 bg-error-50 text-error-600 rounded text-xs font-medium">
                        Failed
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-success-50 text-success-600 rounded text-xs font-medium flex items-center gap-1">
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
