import { Shield, Zap, Lock, ArrowRight, TrendingUp, CheckCircle, Eye, Wallet, Settings, Send, Target, Calendar, Users, Github, Twitter, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section - Cyber-Tech Lite with Glassmorphism */}
      <section className="relative py-24 px-6 lg:px-12 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-cyber-subtle"></div>
        
        {/* Cyber Glow Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyber-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyber-purple-500 rounded-full opacity-10 blur-3xl"></div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-cyber-blue-700 text-sm font-medium mb-6 backdrop-blur-xl border border-cyber-blue-200"
               style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
            <Shield className="w-4 h-4" />
            Military-Grade Security
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold font-heading text-neutral-800 mb-6 leading-tight">
            True Privacy on Solana
            <br />
            <span className="bg-gradient-cyber-primary bg-clip-text text-transparent">
              ZKProtocol
            </span>
          </h1>
          
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Private transactions with lightning-fast speed using ZK-SNARKs and Pedersen commitments. Complete privacy without KYC.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="large" onClick={() => window.location.href = '/dashboard'}>
              Start Private Trading
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="large" onClick={() => window.location.href = '/technology'}>
              Learn Technology
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Metrics - Cyber Cards */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Finality Time', value: '<1s', icon: Zap, accent: 'cyber-cyan' },
              { label: 'Transaction Fee', value: '$0.01', icon: TrendingUp, accent: 'cyber-blue' },
              { label: 'Privacy Level', value: '100%', icon: Lock, accent: 'cyber-purple' },
              { label: 'KYC Required', value: 'None', icon: CheckCircle, accent: 'cyber-cyan' },
            ].map((metric) => (
              <div 
                key={metric.label} 
                className="backdrop-blur-xl border border-cyber-blue-200 rounded-lg p-8 shadow-cyber-md hover:shadow-cyber-lg hover:-translate-y-1 transition-all duration-normal group"
                style={{ background: 'rgba(255, 255, 255, 0.9)' }}
              >
                <div className="w-12 h-12 bg-gradient-cyber-primary rounded-lg flex items-center justify-center mb-4 shadow-cyber-sm group-hover:shadow-glow-primary transition-all duration-normal">
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-4xl font-bold font-heading text-neutral-800 mb-2">{metric.value}</div>
                <div className="text-sm text-neutral-600">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features - Glassmorphism Cards */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold font-heading text-center text-neutral-800 mb-4">
            Leading Privacy Features
          </h2>
          <p className="text-xl text-center text-neutral-600 mb-16 max-w-2xl mx-auto">
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
                className="backdrop-blur-xl border border-cyber-blue-200 rounded-lg p-8 shadow-cyber-md hover:shadow-cyber-lg hover:-translate-y-2 transition-all duration-normal group"
                style={{ background: 'rgba(255, 255, 255, 0.8)' }}
              >
                <div className="w-16 h-16 bg-gradient-cyber-subtle rounded-lg flex items-center justify-center mb-6 border border-cyber-blue-100 shadow-cyber-sm group-hover:shadow-glow-primary transition-all duration-normal">
                  <feature.icon className="w-8 h-8 text-cyber-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold font-heading text-neutral-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Flow - Cyber Step Cards */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-cyber-subtle">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading text-neutral-800 mb-4">
              User Flow
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
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
                className="flex flex-col lg:flex-row gap-6 backdrop-blur-xl border border-cyber-blue-200 rounded-lg p-8 shadow-cyber-md hover:shadow-cyber-lg transition-all duration-normal"
                style={{ background: 'rgba(255, 255, 255, 0.9)' }}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-cyber-primary rounded-lg flex items-center justify-center shadow-glow-primary mb-4 lg:mb-0">
                    <span className="text-2xl font-bold font-heading text-white">{step.step}</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-cyber-subtle rounded-lg flex items-center justify-center border border-cyber-blue-100 shadow-cyber-sm flex-shrink-0">
                      <step.icon className="w-6 h-6 text-cyber-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold font-heading text-neutral-800 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-lg text-neutral-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 ml-16">
                    {step.benefits.map((benefit) => (
                      <span
                        key={benefit}
                        className="text-xs px-3 py-1.5 bg-cyber-blue-100 text-cyber-blue-700 rounded-full border border-cyber-blue-200 font-medium"
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyber-cyan-400 bg-opacity-10 border border-cyber-cyan-200 text-cyber-cyan-700 text-sm font-medium">
              <Shield className="w-4 h-4" />
              Complete Financial Privacy • Zero-Knowledge Protection • Military-Grade Security
            </div>
          </div>
        </div>
      </section>

      {/* Security Proof - Cyber Layout */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold font-heading text-neutral-800 mb-6">
                Cryptographic Guarantees
              </h2>
              <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
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
                    <div className="w-6 h-6 bg-gradient-cyber-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-cyber-sm">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-neutral-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="backdrop-blur-xl border border-cyber-blue-200 rounded-2xl p-12 flex items-center justify-center shadow-cyber-lg"
                 style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-cyber-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow-primary">
                  <Shield className="w-16 h-16 text-white" />
                </div>
                <div className="text-2xl font-bold font-heading text-neutral-800">
                  Verified Security
                </div>
                <div className="text-neutral-600 mt-2">
                  Military-Grade Encryption
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Mission & Roadmap */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading text-neutral-800 mb-4">
              Privacy is a Right
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              We believe that everyone deserves financial privacy without compromise
            </p>
          </div>

          {/* Mission Statement */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-cyber-primary rounded-lg flex items-center justify-center flex-shrink-0 shadow-cyber-md">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading text-neutral-800 mb-4">
                  Our Mission
                </h3>
                <p className="text-lg text-neutral-600 mb-4 leading-relaxed">
                  We are building privacy infrastructure for DeFi that enables anyone to transact with complete privacy, without requiring trust in third parties or violating compliance requirements.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed">
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
                <div key={value.title} 
                     className="backdrop-blur-xl border border-cyber-blue-200 rounded-lg p-6 shadow-cyber-md"
                     style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
                  <h4 className="text-lg font-semibold font-heading text-neutral-800 mb-2">
                    {value.title}
                  </h4>
                  <p className="text-neutral-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Development Roadmap */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-cyber-blue-700 text-sm font-medium mb-4 backdrop-blur-xl border border-cyber-blue-200"
                   style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
                <Calendar className="w-4 h-4" />
                Development Roadmap
              </div>
              <h3 className="text-3xl font-bold font-heading text-neutral-800">
                Platform Evolution
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  quarter: 'Q1 2025',
                  status: 'Completed',
                  items: [
                    'ZK-SNARK implementation',
                    'Basic private transfers',
                    'Devnet testing',
                  ],
                },
                {
                  quarter: 'Q2 2025',
                  status: 'In Progress',
                  items: [
                    'Jupiter integration',
                    'Cross-chain bridge',
                    'Mobile wallet support',
                  ],
                },
                {
                  quarter: 'Q3 2025',
                  status: 'Planned',
                  items: [
                    'Advanced privacy features',
                    'Mainnet beta launch',
                    'DAO governance',
                  ],
                },
                {
                  quarter: 'Q4 2025',
                  status: 'Planned',
                  items: [
                    'Full mainnet launch',
                    'Multi-chain expansion',
                    'Institutional partnerships',
                  ],
                },
              ].map((phase) => (
                <div key={phase.quarter} 
                     className="backdrop-blur-xl border border-cyber-blue-200 rounded-lg shadow-cyber-md p-6 hover:shadow-cyber-lg transition-all duration-normal"
                     style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold font-heading text-neutral-800">{phase.quarter}</h4>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        phase.status === 'Completed'
                          ? 'bg-cyber-cyan-400 bg-opacity-10 text-cyber-cyan-600 border-cyber-cyan-200'
                          : phase.status === 'In Progress'
                          ? 'bg-warning-500 bg-opacity-10 text-warning-600 border-warning-200'
                          : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                      }`}
                    >
                      {phase.status}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-gradient-cyber-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-cyber-sm">
                          <Shield className="w-2.5 h-2.5 text-white" />
                        </div>
                        <span className="text-sm text-neutral-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Community */}
          <div className="text-center">
            <h3 className="text-3xl font-bold font-heading text-neutral-800 mb-8">
              Join Our Community
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  platform: 'Discord',
                  members: '5,000+ members',
                  icon: MessageCircle,
                },
                {
                  platform: 'Twitter',
                  members: '10K+ followers',
                  icon: Twitter,
                },
                {
                  platform: 'GitHub',
                  members: 'Open Source',
                  icon: Github,
                },
              ].map((social) => (
                <div
                  key={social.platform}
                  className="backdrop-blur-xl border border-cyber-blue-200 rounded-lg p-8 text-center shadow-cyber-md hover:shadow-cyber-lg hover:-translate-y-1 transition-all duration-normal group"
                  style={{ background: 'rgba(255, 255, 255, 0.9)' }}
                >
                  <social.icon className="w-12 h-12 text-cyber-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xl font-semibold font-heading text-neutral-800 mb-2">
                    {social.platform}
                  </h4>
                  <p className="text-neutral-600">{social.members}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Cyber Gradient */}
      <section className="relative py-24 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-cyber-subtle"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-purple-500 rounded-full opacity-10 blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold font-heading text-neutral-800 mb-6">
            Ready to Trade with Complete Privacy?
          </h2>
          <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
            Connect your wallet and start private transactions on Solana in seconds.
          </p>
          <Button size="large" onClick={() => window.location.href = '/dashboard'}>
            Launch ZKProtocol Dashboard
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};
