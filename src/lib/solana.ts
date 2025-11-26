import { Connection, PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js';

// Solana devnet RPC endpoint
const SOLANA_RPC_ENDPOINT = 'https://api.devnet.solana.com';

export const connection = new Connection(SOLANA_RPC_ENDPOINT, 'confirmed');

/**
 * Get SOL balance for a wallet address
 */
export const getSolBalance = async (publicKey: PublicKey): Promise<number> => {
  try {
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error('Error getting SOL balance:', error);
    return 0;
  }
};

/**
 * Get recent transactions for a wallet
 */
export const getRecentTransactions = async (publicKey: PublicKey, limit: number = 10) => {
  try {
    const signatures = await connection.getSignaturesForAddress(publicKey, { limit });
    
    const transactions = await Promise.all(
      signatures.map(async (sig) => {
        const tx = await connection.getParsedTransaction(sig.signature, {
          maxSupportedTransactionVersion: 0,
        });
        
        return {
          signature: sig.signature,
          blockTime: sig.blockTime,
          status: sig.confirmationStatus,
          err: sig.err,
          transaction: tx,
        };
      })
    );
    
    return transactions;
  } catch (error) {
    console.error('Error getting transactions:', error);
    return [];
  }
};

/**
 * Create a SOL transfer transaction
 */
export const createTransferTransaction = async (
  fromPubkey: PublicKey,
  toPubkey: PublicKey,
  amount: number
): Promise<Transaction> => {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey,
      toPubkey,
      lamports: amount * LAMPORTS_PER_SOL,
    })
  );

  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = fromPubkey;

  return transaction;
};

/**
 * Get transaction fee estimate
 */
export const getTransactionFee = async (transaction: Transaction): Promise<number> => {
  try {
    const fee = await transaction.getEstimatedFee(connection);
    return fee ? fee / LAMPORTS_PER_SOL : 0.000005; // Default estimate
  } catch (error) {
    console.error('Error estimating fee:', error);
    return 0.000005;
  }
};
