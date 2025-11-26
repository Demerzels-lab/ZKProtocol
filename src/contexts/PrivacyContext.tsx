import { createContext, useContext, useState, ReactNode } from 'react';

export interface PrivacySettings {
  privacyLevel: 'standard' | 'enhanced' | 'maximum';
  zkProofVerification: boolean;
  autoPrivacyToggle: boolean;
  transactionMixingLevel: number;
}

interface PrivacyContextType {
  settings: PrivacySettings;
  updateSettings: (newSettings: Partial<PrivacySettings>) => void;
  calculatePrivacyScore: () => number;
  getPrivacyMultiplier: () => number;
}

const PrivacyContext = createContext<PrivacyContextType | undefined>(undefined);

export const usePrivacy = () => {
  const context = useContext(PrivacyContext);
  if (!context) {
    throw new Error('usePrivacy must be used within PrivacyProvider');
  }
  return context;
};

interface PrivacyProviderProps {
  children: ReactNode;
}

export const PrivacyProvider = ({ children }: PrivacyProviderProps) => {
  const [settings, setSettings] = useState<PrivacySettings>({
    privacyLevel: 'enhanced',
    zkProofVerification: true,
    autoPrivacyToggle: true,
    transactionMixingLevel: 7,
  });

  const updateSettings = (newSettings: Partial<PrivacySettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const calculatePrivacyScore = (): number => {
    let score = 0;

    // Privacy level contribution (40%)
    switch (settings.privacyLevel) {
      case 'standard':
        score += 40;
        break;
      case 'enhanced':
        score += 70;
        break;
      case 'maximum':
        score += 100;
        break;
    }

    // ZK Proof verification (20%)
    if (settings.zkProofVerification) {
      score += 20;
    }

    // Auto privacy toggle (10%)
    if (settings.autoPrivacyToggle) {
      score += 10;
    }

    // Transaction mixing level (30%)
    score += (settings.transactionMixingLevel / 10) * 30;

    return Math.round(score);
  };

  const getPrivacyMultiplier = (): number => {
    // Returns multiplier for transaction complexity based on privacy level
    // Higher privacy = more complex transaction = higher fee
    switch (settings.privacyLevel) {
      case 'standard':
        return 1.0; // Base multiplier
      case 'enhanced':
        return 1.5; // 50% increase in complexity
      case 'maximum':
        return 2.0; // 100% increase in complexity
      default:
        return 1.0;
    }
  };

  const value = {
    settings,
    updateSettings,
    calculatePrivacyScore,
    getPrivacyMultiplier,
  };

  return (
    <PrivacyContext.Provider value={value}>
      {children}
    </PrivacyContext.Provider>
  );
};
