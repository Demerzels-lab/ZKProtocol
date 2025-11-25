import { Shield, Settings, Lock, Zap, CheckCircle, TrendingUp } from 'lucide-react';
import { usePrivacy } from '../../contexts/PrivacyContext';

export const PrivacyControls = () => {
  const { settings, updateSettings, calculatePrivacyScore } = usePrivacy();

  const privacyScore = calculatePrivacyScore();

  const privacyLevels = [
    {
      level: 'standard' as const,
      name: 'Standard',
      description: 'Basic privacy protection',
      icon: Shield,
      color: 'cyber-blue',
      features: ['ZK-SNARKs proof', 'Basic mixing', 'Standard fee'],
    },
    {
      level: 'enhanced' as const,
      name: 'Enhanced',
      description: 'Advanced privacy features',
      icon: Lock,
      color: 'cyber-purple',
      features: ['Enhanced mixing', 'Multi-hop routing', 'Optimized fee'],
    },
    {
      level: 'maximum' as const,
      name: 'Maximum',
      description: 'Maximum privacy guarantee',
      icon: Zap,
      color: 'cyber-cyan',
      features: ['Maximum mixing', 'Anonymity sets', 'Premium protection'],
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-cyber-cyan-600';
    if (score >= 60) return 'text-cyber-purple-500';
    return 'text-cyber-blue-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-cyber-cyan-400';
    if (score >= 60) return 'bg-cyber-purple-400';
    return 'bg-cyber-blue-400';
  };

  return (
    <div className="backdrop-blur-xl border border-cyber-blue-200 rounded-lg shadow-cyber-md p-8"
         style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-cyber-primary rounded-lg flex items-center justify-center shadow-cyber-sm">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-heading text-neutral-800">Privacy Controls</h3>
            <p className="text-sm text-neutral-600">Configure your privacy settings</p>
          </div>
        </div>
        
        {/* Dynamic Privacy Score */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-cyber-subtle border border-cyber-blue-200">
          <TrendingUp className={`w-5 h-5 ${getScoreColor(privacyScore)}`} />
          <div className="text-right">
            <div className="text-xs text-neutral-600">Privacy Score</div>
            <div className={`text-2xl font-bold font-heading ${getScoreColor(privacyScore)}`}>
              {privacyScore}%
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Level Selection */}
      <div className="space-y-3 mb-6">
        <label className="block text-sm font-medium text-neutral-700 mb-3">
          Privacy Level
        </label>
        {privacyLevels.map((item) => (
          <button
            key={item.level}
            onClick={() => updateSettings({ privacyLevel: item.level })}
            className={`w-full p-4 rounded-lg border-2 transition-all duration-normal text-left ${
              settings.privacyLevel === item.level
                ? 'border-cyber-blue-500 bg-cyber-blue-50 shadow-cyber-md'
                : 'border-cyber-blue-200 bg-white hover:border-cyber-blue-300 hover:shadow-cyber-sm'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 bg-gradient-cyber-primary rounded-lg flex items-center justify-center flex-shrink-0 shadow-cyber-sm`}>
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-neutral-800">{item.name}</h4>
                  {settings.privacyLevel === item.level && (
                    <CheckCircle className="w-5 h-5 text-cyber-blue-600" />
                  )}
                </div>
                <p className="text-sm text-neutral-600 mb-2">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs px-2 py-1 bg-cyber-blue-100 text-cyber-blue-700 rounded border border-cyber-blue-200"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Advanced Settings */}
      <div className="space-y-4 pt-6 border-t border-cyber-blue-100">
        <label className="block text-sm font-medium text-neutral-700 mb-3">
          Advanced Settings
        </label>

        {/* ZK Proof Verification */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-neutral-800">ZK Proof Verification</div>
            <div className="text-sm text-neutral-600">Automatic proof generation</div>
          </div>
          <button
            onClick={() => updateSettings({ zkProofVerification: !settings.zkProofVerification })}
            className={`relative w-14 h-7 rounded-full transition-all duration-normal ${
              settings.zkProofVerification
                ? 'bg-gradient-cyber-primary shadow-glow-primary'
                : 'bg-neutral-200'
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-normal shadow-cyber-sm ${
                settings.zkProofVerification ? 'transform translate-x-7' : ''
              }`}
            />
          </button>
        </div>

        {/* Auto Privacy Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-neutral-800">Auto Privacy Mode</div>
            <div className="text-sm text-neutral-600">Enable privacy by default</div>
          </div>
          <button
            onClick={() => updateSettings({ autoPrivacyToggle: !settings.autoPrivacyToggle })}
            className={`relative w-14 h-7 rounded-full transition-all duration-normal ${
              settings.autoPrivacyToggle
                ? 'bg-gradient-cyber-primary shadow-glow-primary'
                : 'bg-neutral-200'
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-normal shadow-cyber-sm ${
                settings.autoPrivacyToggle ? 'transform translate-x-7' : ''
              }`}
            />
          </button>
        </div>

        {/* Transaction Mixing Level */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium text-neutral-800">Transaction Mixing</div>
            <div className="text-sm font-semibold text-cyber-blue-600">
              Level {settings.transactionMixingLevel}
            </div>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={settings.transactionMixingLevel}
            onChange={(e) => updateSettings({ transactionMixingLevel: parseInt(e.target.value) })}
            className="w-full h-2 bg-cyber-blue-100 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${settings.transactionMixingLevel * 10}%, #DBEAFE ${settings.transactionMixingLevel * 10}%, #DBEAFE 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-neutral-500 mt-1">
            <span>Basic</span>
            <span>Maximum</span>
          </div>
        </div>
      </div>

      {/* Privacy Status with Dynamic Score */}
      <div className={`mt-6 p-4 rounded-lg ${getScoreBgColor(privacyScore)} bg-opacity-10 border ${getScoreBgColor(privacyScore).replace('bg-', 'border-').replace('400', '200')}`}>
        <div className="flex items-start gap-3">
          <CheckCircle className={`w-5 h-5 ${getScoreColor(privacyScore)} flex-shrink-0 mt-0.5`} />
          <div className={`text-sm ${getScoreColor(privacyScore).replace('text-', 'text-').replace('600', '700')}`}>
            <div className="font-semibold mb-1">Privacy Protection Active - Score: {privacyScore}%</div>
            <div>Your transactions are protected with {settings.privacyLevel} privacy settings</div>
          </div>
        </div>
      </div>
    </div>
  );
};
