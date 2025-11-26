import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://bpbtgkunrdzcoyfdhskh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwYnRna3VucmR6Y295ZmRoc2toIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5MjAzNzUsImV4cCI6MjA3ODQ5NjM3NX0.ZAtjUoDnIWUOs6Os1NUGKIRUQVOuXDlaCJ4HwQqZu50";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for edge function calls
export const walletConnect = async (walletAddress: string, walletType: string = 'phantom') => {
  const { data, error } = await supabase.functions.invoke('wallet-connect', {
    body: { walletAddress, walletType },
  });
  
  if (error) throw error;
  return data.data;
};

export const createTransaction = async (
  userId: string,
  txType: string,
  amount: string,
  tokenSymbol: string = 'SOL',
  privacyLevel: string = 'private'
) => {
  const { data, error } = await supabase.functions.invoke('transaction-create', {
    body: { userId, txType, amount, tokenSymbol, privacyLevel },
  });
  
  if (error) throw error;
  return data.data;
};

export const getDashboardStats = async (userId: string) => {
  const { data, error } = await supabase.functions.invoke('dashboard-stats', {
    body: { userId },
  });
  
  if (error) throw error;
  return data.data;
};
