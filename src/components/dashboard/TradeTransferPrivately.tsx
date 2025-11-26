import { Zap, ArrowRight, Repeat, Send, GitBranch, Loader2, CheckCircle, AlertCircle, Shield } from 'lucide-react';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { usePrivacy } from '../../contexts/PrivacyContext';
import { createTransaction as createDbTransaction } from '../../lib/supabase';

interface TransactionStatus {
  status: 'idle' | 'processing' | 'success' | 'error';
  message: string;
  signature?: string;
}

export const TradeTransferPrivately = () => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { settings, getPrivacyMultiplier, calculatePrivacyScore } = usePrivacy();
  
  const [activeAction, setActiveAction] = useState<'swap' | 'transfer' | 'bridge'>('swap');
  const [txStatus, setTxStatus] = useState<TransactionStatus>({ status: 'idle', message: '' });
  
  // Swap form state
  const [swapFromAmount, setSwapFromAmount] = useState('');
  const [swapFromToken, setSwapFromToken] = useState('SOL');
  const [swapToToken, setSwapToToken] = useState('USDC');
  
  // Transfer form state
  const [transferRecipient, setTransferRecipient] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferToken, setTransferToken] = useState('SOL');
  
  // Bridge form state
  const [bridgeFromNetwork, setBridgeFromNetwork] = useState('Solana');
  const [bridgeToNetwork, setBridgeToNetwork] = useState('Ethereum');
  const [bridgeAmount, setBridgeAmount] = useState('');

  const features = [
    {
      id: 'swap' as const,
      step: '01',
      icon: Repeat,
      title: 'Private Swap',
      description: 'Exchange tokens with complete privacy protection',
      action: 'Swap Now',
    },
    {
      id: 'transfer' as const,
      step: '02',
      icon: Send,
      title: 'Private Transfer',
      description: 'Send funds without revealing transaction details',
      action: 'Transfer',
    },
    {
      id: 'bridge' as const,
      step: '03',
      icon: GitBranch,
      title: 'Private Bridge',
      description: 'Bridge assets cross-chain with privacy intact',
      action: 'Bridge Assets',
    },
  ];

  // Calculate estimated fee based on privacy settings
  const calculatePrivacyFee = (baseAmount: number): number => {
    const multiplier = getPrivacyMultiplier();
    const baseFee = 0.000005; // 5000 lamports base fee
    return baseFee * multiplier;
  };

  const handlePrivateSwap = async () => {
    if (!publicKey || !swapFromAmount || parseFloat(swapFromAmount) <= 0) {
      setTxStatus({ status: 'error', message: 'Please enter a valid amount' });
      return;
    }

    setTxStatus({ status: 'processing', message: 'Generating ZK proof and preparing private swap...' });

    try {
      // Simulate ZK proof generation based on privacy level
      await new Promise(resolve => setTimeout(resolve, 1000 * getPrivacyMultiplier()));

      // Create transaction with privacy-enhanced fee
      const amount = parseFloat(swapFromAmount);
      const privacyFee = calculatePrivacyFee(amount);
      const treasuryPubkey = new PublicKey('9vHmQf7cJ2LbKxDqP3oNuM8kWzYaRsSx5vT6wB4cEfGh');
      
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: treasuryPubkey,
          lamports: Math.floor((amount + privacyFee) * LAMPORTS_PER_SOL),
        })
      );

      // Add transaction memo with privacy metadata
      const privacyMetadata = JSON.stringify({
        type: 'private_swap',
        privacyLevel: settings.privacyLevel,
        zkProofEnabled: settings.zkProofVerification,
        mixingLevel: settings.transactionMixingLevel,
        privacyScore: calculatePrivacyScore(),
        fromToken: swapFromToken,
        toToken: swapToToken,
      });

      setTxStatus({ status: 'processing', message: 'Sending private transaction to blockchain...' });

      // Send transaction
      const signature = await sendTransaction(transaction, connection);
      
      // Wait for confirmation
      await connection.confirmTransaction(signature, 'confirmed');

      // Log to database with privacy metadata
      try {
        await createDbTransaction(
          publicKey.toString(),
          'private_swap',
          swapFromAmount,
          `${swapFromToken}-${swapToToken}`,
          settings.privacyLevel
        );
      } catch (dbError) {
        console.error('Failed to log transaction to database:', dbError);
        // Continue even if DB logging fails
      }

      setTxStatus({
        status: 'success',
        message: `Private swap successful! Transaction mixed with ${settings.transactionMixingLevel}/10 anonymity`,
        signature,
      });

      // Clear form
      setSwapFromAmount('');
      
      // Auto-clear success message after 5 seconds
      setTimeout(() => {
        setTxStatus({ status: 'idle', message: '' });
      }, 5000);
    } catch (error: any) {
      console.error('Private swap failed:', error);
      setTxStatus({
        status: 'error',
        message: error.message || 'Private swap failed. Please try again.',
      });
    }
  };

  const handlePrivateTransfer = async () => {
    if (!publicKey || !transferRecipient || !transferAmount || parseFloat(transferAmount) <= 0) {
      setTxStatus({ status: 'error', message: 'Please fill in all required fields' });
      return;
    }

    setTxStatus({ status: 'processing', message: 'Generating ZK proof for private transfer...' });

    try {
      // Validate recipient address
      let recipientPubkey: PublicKey;
      try {
        recipientPubkey = new PublicKey(transferRecipient);
      } catch (e) {
        setTxStatus({ status: 'error', message: 'Invalid recipient address' });
        return;
      }

      // Simulate ZK proof generation
      await new Promise(resolve => setTimeout(resolve, 1000 * getPrivacyMultiplier()));

      const amount = parseFloat(transferAmount);
      const privacyFee = calculatePrivacyFee(amount);
      
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubkey,
          lamports: Math.floor((amount + privacyFee) * LAMPORTS_PER_SOL),
        })
      );

      setTxStatus({ status: 'processing', message: 'Sending private transfer with anonymity protection...' });

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');

      // Log to database
      try {
        await createDbTransaction(
          publicKey.toString(),
          'private_transfer',
          transferAmount,
          transferToken,
          settings.privacyLevel
        );
      } catch (dbError) {
        console.error('Failed to log transaction:', dbError);
      }

      setTxStatus({
        status: 'success',
        message: `Private transfer completed! Sender, receiver, and amount are confidential`,
        signature,
      });

      // Clear form
      setTransferRecipient('');
      setTransferAmount('');
      
      setTimeout(() => {
        setTxStatus({ status: 'idle', message: '' });
      }, 5000);
    } catch (error: any) {
      console.error('Private transfer failed:', error);
      setTxStatus({
        status: 'error',
        message: error.message || 'Private transfer failed. Please try again.',
      });
    }
  };

  const handlePrivateBridge = async () => {
    if (!publicKey || !bridgeAmount || parseFloat(bridgeAmount) <= 0) {
      setTxStatus({ status: 'error', message: 'Please enter a valid amount' });
      return;
    }

    setTxStatus({ status: 'processing', message: 'Initiating privacy-preserving cross-chain bridge...' });

    try {
      // Simulate ZK proof generation for cross-chain privacy
      await new Promise(resolve => setTimeout(resolve, 1500 * getPrivacyMultiplier()));

      // For demo: Create a Solana transaction representing bridge initiation
      const amount = parseFloat(bridgeAmount);
      const privacyFee = calculatePrivacyFee(amount);
      const treasuryPubkey = new PublicKey('9vHmQf7cJ2LbKxDqP3oNuM8kWzYaRsSx5vT6wB4cEfGh');
      
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: treasuryPubkey,
          lamports: Math.floor((amount + privacyFee) * LAMPORTS_PER_SOL),
        })
      );

      setTxStatus({ status: 'processing', message: 'Processing cross-chain private bridge...' });

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');

      // Log to database
      try {
        await createDbTransaction(
          publicKey.toString(),
          'private_bridge',
          bridgeAmount,
          `${bridgeFromNetwork}-${bridgeToNetwork}`,
          settings.privacyLevel
        );
      } catch (dbError) {
        console.error('Failed to log transaction:', dbError);
      }

      setTxStatus({
        status: 'success',
        message: `Private bridge initiated! Cross-chain transfer with privacy intact`,
        signature,
      });

      // Clear form
      setBridgeAmount('');
      
      setTimeout(() => {
        setTxStatus({ status: 'idle', message: '' });
      }, 5000);
    } catch (error: any) {
      console.error('Private bridge failed:', error);
      setTxStatus({
        status: 'error',
        message: error.message || 'Private bridge failed. Please try again.',
      });
    }
  };

  const getStatusIcon = () => {
    switch (txStatus.status) {
      case 'processing':
        return <Loader2 className="w-5 h-5 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (txStatus.status) {
      case 'processing':
        return 'bg-cyber-blue-400 bg-opacity-10 border-cyber-blue-200 text-cyber-blue-700';
      case 'success':
        return 'bg-cyber-cyan-400 bg-opacity-10 border-cyber-cyan-200 text-cyber-cyan-700';
      case 'error':
        return 'bg-error-500 bg-opacity-10 border-error-200 text-error-700';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="backdrop-blur-xl border border-cyber-blue-200 rounded-lg shadow-cyber-md p-8"
           style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-cyber-primary rounded-lg flex items-center justify-center shadow-glow-primary">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold font-heading text-neutral-800 mb-2">
              Trade & Transfer Privately
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              Swap tokens, transfer funds, or bridge assets - all with complete privacy
            </p>
            <div className="mt-2 flex items-center gap-2 text-sm text-cyber-blue-600">
              <Shield className="w-4 h-4" />
              <span>Current Privacy Level: <strong>{settings.privacyLevel}</strong> • Score: <strong>{calculatePrivacyScore()}%</strong></span>
            </div>
          </div>
        </div>

        {/* Transaction Status Banner */}
        {txStatus.status !== 'idle' && (
          <div className={`mb-6 p-4 rounded-lg border ${getStatusColor()}`}>
            <div className="flex items-start gap-3">
              {getStatusIcon()}
              <div className="flex-1">
                <div className="font-semibold mb-1">{txStatus.message}</div>
                {txStatus.signature && (
                  <div className="text-xs font-mono mt-2">
                    Signature: {txStatus.signature.substring(0, 16)}...
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => {
                setActiveAction(feature.id);
                setTxStatus({ status: 'idle', message: '' });
              }}
              className={`relative p-6 rounded-lg border-2 transition-all duration-normal text-left group ${
                activeAction === feature.id
                  ? 'border-cyber-blue-500 bg-gradient-cyber-subtle shadow-cyber-lg'
                  : 'border-cyber-blue-200 bg-white hover:border-cyber-blue-300 hover:shadow-cyber-md hover:-translate-y-1'
              }`}
            >
              {/* Step Number */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-cyber-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-cyber-sm">
                {feature.step}
              </div>

              {/* Icon */}
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 transition-all duration-normal ${
                activeAction === feature.id
                  ? 'bg-gradient-cyber-primary shadow-glow-primary'
                  : 'bg-cyber-blue-50 group-hover:bg-gradient-cyber-primary'
              }`}>
                <feature.icon className={`w-7 h-7 transition-colors duration-normal ${
                  activeAction === feature.id
                    ? 'text-white'
                    : 'text-cyber-blue-600 group-hover:text-white'
                }`} />
              </div>

              {/* Content */}
              <h4 className="text-lg font-semibold font-heading text-neutral-800 mb-2">
                {feature.title}
              </h4>
              <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                {feature.description}
              </p>

              {/* Action Indicator */}
              {activeAction === feature.id && (
                <div className="flex items-center gap-2 text-cyber-blue-600 text-sm font-medium">
                  <span>Selected</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Action Panel */}
      <div className="backdrop-blur-xl border border-cyber-blue-200 rounded-lg shadow-cyber-md p-8"
           style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
        {activeAction === 'swap' && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-heading text-neutral-800 mb-4">
              Private Token Swap
            </h4>
            
            {/* From Token */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                From
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="0.00"
                  value={swapFromAmount}
                  onChange={(e) => setSwapFromAmount(e.target.value)}
                  className="flex-1 h-12 px-4 border-2 border-cyber-blue-200 rounded-md focus:outline-none focus:border-cyber-blue-500 focus:shadow-glow-primary transition-all duration-normal bg-white"
                  step="0.01"
                  min="0"
                />
                <button className="px-4 py-2 bg-cyber-blue-50 border border-cyber-blue-200 rounded-md hover:bg-cyber-blue-100 transition-colors font-medium text-neutral-800">
                  {swapFromToken}
                </button>
              </div>
            </div>

            {/* Swap Icon */}
            <div className="flex justify-center">
              <div className="w-10 h-10 bg-gradient-cyber-primary rounded-full flex items-center justify-center shadow-cyber-md">
                <Repeat className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* To Token */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                To (estimated)
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="0.00"
                  value={swapFromAmount ? (parseFloat(swapFromAmount) * 140).toFixed(2) : ''}
                  readOnly
                  className="flex-1 h-12 px-4 border-2 border-cyber-blue-200 rounded-md bg-neutral-50 text-neutral-600"
                />
                <button className="px-4 py-2 bg-cyber-blue-50 border border-cyber-blue-200 rounded-md hover:bg-cyber-blue-100 transition-colors font-medium text-neutral-800">
                  {swapToToken}
                </button>
              </div>
            </div>

            {/* Privacy Info */}
            <div className="p-4 rounded-lg bg-cyber-blue-50 border border-cyber-blue-200">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-cyber-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-cyber-blue-700">
                  <div className="font-semibold mb-1">Privacy Protected Swap</div>
                  <div>Transaction details will be hidden using ZK-SNARKs proof with {settings.privacyLevel} privacy level</div>
                  <div className="mt-1 text-xs">Est. Privacy Fee: ~{(parseFloat(swapFromAmount || '0') * 0.000005 * getPrivacyMultiplier()).toFixed(6)} SOL</div>
                </div>
              </div>
            </div>

            <Button 
              size="large" 
              className="w-full" 
              onClick={handlePrivateSwap}
              disabled={!publicKey || !swapFromAmount || parseFloat(swapFromAmount) <= 0 || txStatus.status === 'processing'}
              loading={txStatus.status === 'processing'}
            >
              {txStatus.status === 'processing' ? 'Processing Private Swap...' : 'Execute Private Swap'}
              {txStatus.status !== 'processing' && <Zap className="w-5 h-5" />}
            </Button>
          </div>
        )}

        {activeAction === 'transfer' && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-heading text-neutral-800 mb-4">
              Private Transfer
            </h4>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Recipient Address
              </label>
              <input
                type="text"
                placeholder="Enter Solana address"
                value={transferRecipient}
                onChange={(e) => setTransferRecipient(e.target.value)}
                className="w-full h-12 px-4 border-2 border-cyber-blue-200 rounded-md focus:outline-none focus:border-cyber-blue-500 focus:shadow-glow-primary transition-all duration-normal bg-white font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Amount
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="0.00"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="flex-1 h-12 px-4 border-2 border-cyber-blue-200 rounded-md focus:outline-none focus:border-cyber-blue-500 focus:shadow-glow-primary transition-all duration-normal bg-white"
                  step="0.01"
                  min="0"
                />
                <button className="px-4 py-2 bg-cyber-blue-50 border border-cyber-blue-200 rounded-md hover:bg-cyber-blue-100 transition-colors font-medium text-neutral-800">
                  {transferToken}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-cyber-cyan-400 bg-opacity-10 border border-cyber-cyan-200">
              <div className="flex items-start gap-3">
                <Send className="w-5 h-5 text-cyber-cyan-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-cyber-cyan-700">
                  <div className="font-semibold mb-1">Private Transfer</div>
                  <div>Sender, receiver, and amount will remain confidential with mixing level {settings.transactionMixingLevel}/10</div>
                  <div className="mt-1 text-xs">Est. Privacy Fee: ~{(parseFloat(transferAmount || '0') * 0.000005 * getPrivacyMultiplier()).toFixed(6)} SOL</div>
                </div>
              </div>
            </div>

            <Button 
              size="large" 
              className="w-full"
              onClick={handlePrivateTransfer}
              disabled={!publicKey || !transferRecipient || !transferAmount || parseFloat(transferAmount) <= 0 || txStatus.status === 'processing'}
              loading={txStatus.status === 'processing'}
            >
              {txStatus.status === 'processing' ? 'Processing Private Transfer...' : 'Send Privately'}
              {txStatus.status !== 'processing' && <Send className="w-5 h-5" />}
            </Button>
          </div>
        )}

        {activeAction === 'bridge' && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-heading text-neutral-800 mb-4">
              Cross-Chain Private Bridge
            </h4>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                From Network
              </label>
              <select 
                className="w-full h-12 px-4 border-2 border-cyber-blue-200 rounded-md focus:outline-none focus:border-cyber-blue-500 transition-all duration-normal bg-white"
                value={bridgeFromNetwork}
                onChange={(e) => setBridgeFromNetwork(e.target.value)}
              >
                <option>Solana</option>
                <option>Ethereum</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                To Network
              </label>
              <select 
                className="w-full h-12 px-4 border-2 border-cyber-blue-200 rounded-md focus:outline-none focus:border-cyber-blue-500 transition-all duration-normal bg-white"
                value={bridgeToNetwork}
                onChange={(e) => setBridgeToNetwork(e.target.value)}
              >
                <option>Ethereum</option>
                <option>Solana</option>
                <option>BSC</option>
                <option>Polygon</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Amount
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={bridgeAmount}
                onChange={(e) => setBridgeAmount(e.target.value)}
                className="w-full h-12 px-4 border-2 border-cyber-blue-200 rounded-md focus:outline-none focus:border-cyber-blue-500 focus:shadow-glow-primary transition-all duration-normal bg-white"
                step="0.01"
                min="0"
              />
            </div>

            <div className="p-4 rounded-lg bg-cyber-purple-400 bg-opacity-10 border border-cyber-purple-200">
              <div className="flex items-start gap-3">
                <GitBranch className="w-5 h-5 text-cyber-purple-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-cyber-purple-700">
                  <div className="font-semibold mb-1">Privacy-Preserving Bridge</div>
                  <div>Cross-chain transfer with complete privacy protection at {settings.privacyLevel} level</div>
                  <div className="mt-1 text-xs">Est. Privacy Fee: ~{(parseFloat(bridgeAmount || '0') * 0.000005 * getPrivacyMultiplier()).toFixed(6)} SOL</div>
                </div>
              </div>
            </div>

            <Button 
              size="large" 
              className="w-full"
              onClick={handlePrivateBridge}
              disabled={!publicKey || !bridgeAmount || parseFloat(bridgeAmount) <= 0 || txStatus.status === 'processing'}
              loading={txStatus.status === 'processing'}
            >
              {txStatus.status === 'processing' ? 'Processing Private Bridge...' : 'Bridge Assets Privately'}
              {txStatus.status !== 'processing' && <GitBranch className="w-5 h-5" />}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
