import { Shield, Zap, Lock, ArrowRight, TrendingUp, CheckCircle, Eye, Wallet, Settings, Send, Target, Calendar, Users, Github, Twitter, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { InteractiveBackground } from '../components/InteractiveBackground';

export const LandingPage = () => {
  return (
    // 1. Removed bg-neutral-50 so the global 8-bit gradient shows through
    <div className="min-h-screen bg-transparent font-sans text-brand-dark">
      <InteractiveBackground />
      
      {/* Hero Section */}
      <section className="relative py-24 px-6 lg:px-12 overflow-hidden">
        {/* Removed blurry cyber orbs as they clash with 8-bit style */}
        
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold mb-6 bg-white border-2 border-brand-dark shadow-sm">
            <Shield className="w-4 h-4" />
            Military-Grade Security
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold font-display text-brand-dark mb-6 leading-tight">
            True Privacy on Solana
            <br />
            <span className="text-primary-600">
              ZKProtocol
            </span>
          </h1>
          
          <p className="text-xl text-brand-dark/80 max-w-2xl mx-auto mb-8 leading-relaxed font-mono">
            Private transactions with lightning-fast speed using ZK-SNARKs and Pedersen commitments. Complete privacy without KYC.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="large" onClick={() => window.location.href = '/dashboard'}>
              Start Private Trading
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            {/* Outline button variant automatically handles the retro look based on previous config */}
            <Button variant="outline" size="large" onClick={() => window.location.href = '/technology'}>
              Learn Technology
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Metrics - Converted to Pixel Cards */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Finality Time', value: '<1s', icon: Zap },
              { label: 'Transaction Fee', value: '$0.01', icon: TrendingUp },
              { label: 'Privacy Level', value: '100%', icon: Lock },
              { label: 'KYC Required', value: 'None', icon: CheckCircle },
            ].map((metric) => (
              <div 
                key={metric.label} 
                className="pixel-card p-8 group hover:-translate-y-1 transition-transform"
              >
                <div className="w-12 h-12 bg-primary-500 border-2 border-brand-dark flex items-center justify-center mb-4 shadow-sm group-hover:shadow-DEFAULT transition-all">
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold font-display text-brand-dark mb-2">{metric.value}</div>
                <div className="text-sm font-bold text-brand-dark/70 uppercase tracking-wider">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center text-brand-dark mb-4">
            Leading Privacy Features
          </h2>
          <p className="text-xl text-center text-brand-dark/80 mb-16 max-w-2xl mx-auto font-mono">
            Comprehensive platform for private transactions on Solana ecosystem
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Private Deposits',
                description: 'Store assets with Zero Knowledge proofs. No one can track your on-chain deposits.',
                icon: Lock,
              },
              {
                title: 'Private Trading',
                description: 'Trade tokens with complete privacy. Your trading strategy stays confidential with ZK-SNARKs.',
                icon: Eye,
              },
              {
                title: 'Cross-Chain Bridge',
                description: 'Bridge private assets between Ethereum and Solana with layered security and guaranteed privacy.',
                icon: ArrowRight,
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="pixel-card p-8 group hover:-translate-y-2 transition-transform"
              >
                <div className="w-16 h-16 bg-white border-2 border-brand-dark flex items-center justify-center mb-6 shadow-sm group-hover:shadow-DEFAULT transition-all">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold font-display text-brand-dark mb-3">
                  {feature.title}
                </h3>
                <p className="text-brand-dark/80 leading-relaxed font-mono">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Flow */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-brand-dark mb-4">
              User Flow
            </h2>
            <p className="text-xl text-brand-dark/80 max-w-2xl mx-auto font-mono">
              Simple steps to start trading with complete privacy on ZKProtocol
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: '01',
                title: 'Connect Your Wallet',
                description: 'Install Solana wallet extension (Phantom or Solflare) and connect to ZKProtocol dashboard. Start with complete privacy controls at your fingertips.',
                icon: Wallet,
                benefits: ['Phantom & Solflare supported', 'Solana Devnet ready', 'Instant connection'],
              },
              {
                step: '02',
                title: 'Set Privacy Level',
                description: 'Choose Standard, Enhanced, or Maximum privacy level. Enable ZK proof verification and configure transaction mixing level from 1 to 10 for optimal anonymity.',
                icon: Settings,
                benefits: ['3 privacy levels', 'Dynamic privacy score', 'Custom mixing controls'],
              },
              {
                step: '03',
                title: 'Private Transaction',
                description: 'Deposit assets with cryptographic shielding, trade tokens privately via Jupiter aggregator, or transfer funds with complete confidentiality. All protected by ZK-SNARKs.',
                icon: Send,
                benefits: ['Private swap & transfer', 'Cross-chain bridge', 'Real-time pricing'],
              },
              {
                step: '04',
                title: 'Privacy Verification',
                description: 'Real-time ZK proof generation and verification. Transaction confirmed with cryptographic guarantee. Privacy metadata logged for transparency without revealing sensitive data.',
                icon: CheckCircle,
                benefits: ['ZK-SNARKs verification', 'On-chain confirmation', 'Privacy preserved'],
              },
            ].map((step, index) => (
              <div 
                key={step.step} 
                className="pixel-card p-8 flex flex-col lg:flex-row gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-600 border-2 border-brand-dark flex items-center justify-center shadow-DEFAULT mb-4 lg:mb-0">
                    <span className="text-xl font-bold font-display text-white">{step.step}</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-white border-2 border-brand-dark flex items-center justify-center flex-shrink-0 shadow-sm">
                      <step.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-display text-brand-dark mb-2">
                        {step.title}
                      </h3>
                      <p className="text-lg text-brand-dark/80 leading-relaxed font-mono">{step.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 ml-0 lg:ml-16">
                    {step.benefits.map((benefit) => (
                      <span
                        key={benefit}
                        className="text-sm px-3 py-1.5 bg-primary-50 text-primary-700 border-2 border-brand-dark font-bold uppercase tracking-wide"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-500 text-white border-2 border-brand-dark text-sm font-bold shadow-DEFAULT">
              <Shield className="w-4 h-4" />
              Complete Financial Privacy • Zero-Knowledge Protection • Military-Grade Security
            </div>
          </div>
        </div>
      </section>

      {/* Security Proof */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold font-display text-brand-dark mb-6">
                Cryptographic Guarantees
              </h2>
              <p className="text-lg text-brand-dark/80 mb-6 leading-relaxed font-mono">
                Zero Knowledge proofs provide mathematical certainty that your transactions are private. No backdoors, no trusted parties.
              </p>
              <ul className="space-y-4">
                {[
                  'ZK-SNARKs for proof generation',
                  'Pedersen commitments for hiding values',
                  'Range proofs for preventing overflow',
                  'Nullifiers for preventing double-spending',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-success-500 border-2 border-brand-dark flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-brand-dark font-bold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pixel-card p-12 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-primary-500 border-4 border-brand-dark flex items-center justify-center mx-auto mb-6 shadow-DEFAULT">
                  <Shield className="w-16 h-16 text-white" />
                </div>
                <div className="text-xl font-bold font-display text-brand-dark">
                  Verified Security
                </div>
                <div className="text-brand-dark/70 mt-2 font-mono uppercase">
                  Military-Grade Encryption
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-brand-dark mb-4">
              Privacy is a Right
            </h2>
            <p className="text-xl text-brand-dark/80 max-w-2xl mx-auto font-mono">
              We believe that everyone deserves financial privacy without compromise
            </p>
          </div>

          {/* Mission Statement */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-primary-600 border-2 border-brand-dark flex items-center justify-center flex-shrink-0 shadow-DEFAULT">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-brand-dark mb-4">
                  Our Mission
                </h3>
                <p className="text-lg text-brand-dark/80 mb-4 leading-relaxed font-mono">
                  We are building privacy infrastructure for DeFi that enables anyone to transact with complete privacy, without requiring trust in third parties or violating compliance requirements.
                </p>
                <p className="text-lg text-brand-dark/80 leading-relaxed font-mono">
                  Zero Knowledge technology is the future of blockchain privacy. With mathematical guarantees and cryptographic security, we deliver privacy that truly cannot be broken.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[
                { title: 'Privacy First', description: 'Privacy is the default, not an optional feature' },
                { title: 'Trustless', description: 'No trusted parties or backdoors' },
                { title: 'Open Source', description: 'Transparent code for community verification' },
              ].map((value) => (
                <div key={value.title} className="pixel-card p-6">
                  <h4 className="text-lg font-bold font-display text-brand-dark mb-2">
                    {value.title}
                  </h4>
                  <p className="text-brand-dark/80 leading-relaxed font-mono">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-brand-dark text-brand-dark text-sm font-bold mb-4 shadow-sm">
                <Calendar className="w-4 h-4" />
                Development Roadmap
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold font-display text-brand-dark">
                Platform Evolution
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  quarter: 'Q1 2025',
                  status: 'Completed',
                  items: ['ZK-SNARK implementation', 'Basic private transfers', 'Devnet testing'],
                },
                {
                  quarter: 'Q2 2025',
                  status: 'In Progress',
                  items: ['Jupiter integration', 'Cross-chain bridge', 'Mobile wallet support'],
                },
                {
                  quarter: 'Q3 2025',
                  status: 'Planned',
                  items: ['Advanced privacy features', 'Mainnet beta launch', 'DAO governance'],
                },
                {
                  quarter: 'Q4 2025',
                  status: 'Planned',
                  items: ['Full mainnet launch', 'Multi-chain expansion', 'Institutional partnerships'],
                },
              ].map((phase) => (
                <div key={phase.quarter} className="pixel-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold font-display text-brand-dark">{phase.quarter}</h4>
                    <span
                      className={`px-2 py-1 text-xs font-bold border-2 border-brand-dark uppercase ${
                        phase.status === 'Completed'
                          ? 'bg-success-500 text-white'
                          : phase.status === 'In Progress'
                          ? 'bg-warning-500 text-brand-dark'
                          : 'bg-white text-brand-dark'
                      }`}
                    >
                      {phase.status}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-primary-500 border border-brand-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Shield className="w-2.5 h-2.5 text-white" />
                        </div>
                        <span className="text-sm text-brand-dark font-mono">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Community */}
          <div className="text-center">
            <h3 className="text-2xl lg:text-3xl font-bold font-display text-brand-dark mb-8">
              Join Our Community
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { platform: 'Discord', members: '5,000+ members', icon: MessageCircle },
                { platform: 'Twitter', members: '10K+ followers', icon: Twitter },
                { platform: 'GitHub', members: 'Open Source', icon: Github },
              ].map((social) => (
                <div
                  key={social.platform}
                  className="pixel-card p-8 text-center group hover:-translate-y-1 transition-transform"
                >
                  <social.icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold font-display text-brand-dark mb-2">
                    {social.platform}
                  </h4>
                  <p className="text-brand-dark/80 font-mono">{social.members}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 lg:px-12 overflow-hidden">
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-brand-dark mb-6">
            Ready to Trade with Complete Privacy?
          </h2>
          <p className="text-xl text-brand-dark/80 mb-8 leading-relaxed font-mono">
            Connect your wallet and start private transactions on Solana in seconds.
          </p>
          <Button size="large" onClick={() => window.location.href = '/dashboard'}>
            Launch ZKProtocol Dashboard
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};