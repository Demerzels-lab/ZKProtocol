import { Shield, Target, Users, Calendar, Github, Twitter, MessageCircle } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Page Header */}
      <section className="relative py-16 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-cyber-subtle"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold font-heading text-neutral-800 mb-4">
            Privacy is a Right
          </h1>
          <p className="text-xl text-neutral-600">
            We believe that everyone deserves financial privacy without compromise
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-16 h-16 bg-gradient-cyber-primary rounded-lg flex items-center justify-center flex-shrink-0 shadow-cyber-md">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold font-heading text-neutral-800 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-neutral-600 mb-4 leading-relaxed">
                We are building privacy infrastructure for DeFi that enables anyone to transact with complete privacy, without requiring trust in third parties or violating compliance requirements.
              </p>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Zero Knowledge technology is the future of blockchain privacy. With mathematical guarantees and cryptographic security, we deliver privacy that truly cannot be broken.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { title: 'Privacy First', description: 'Privacy is the default, not an optional feature' },
              { title: 'Trustless', description: 'No trusted parties or backdoors' },
              { title: 'Open Source', description: 'Transparent code for community verification' },
            ].map((value) => (
              <div key={value.title} 
                   className="backdrop-blur-xl border border-cyber-blue-200 rounded-lg p-6 shadow-cyber-md hover:shadow-cyber-lg transition-all duration-normal"
                   style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
                <h3 className="text-xl font-semibold font-heading text-neutral-800 mb-2">
                  {value.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-cyber-subtle">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-cyber-blue-700 text-sm font-medium mb-4 backdrop-blur-xl border border-cyber-blue-200"
                 style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
              <Calendar className="w-4 h-4" />
              Development Roadmap
            </div>
            <h2 className="text-4xl font-bold font-heading text-neutral-800">
              Platform Evolution
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                quarter: 'Q1 2025',
                status: 'Completed',
                items: [
                  'ZK-SNARK implementation for Solana',
                  'Basic private transfer functionality',
                  'Devnet testing and security audit',
                ],
              },
              {
                quarter: 'Q2 2025',
                status: 'In Progress',
                items: [
                  'Jupiter Aggregator integration for private swaps',
                  'Cross-chain bridge (Ethereum ↔ Solana)',
                  'Mobile wallet support',
                ],
              },
              {
                quarter: 'Q3 2025',
                status: 'Planned',
                items: [
                  'Advanced privacy features (mixing, anonymity sets)',
                  'Mainnet beta launch',
                  'DAO governance implementation',
                ],
              },
              {
                quarter: 'Q4 2025',
                status: 'Planned',
                items: [
                  'Full mainnet launch',
                  'Multi-chain expansion (BSC, Polygon)',
                  'Institutional partnerships',
                ],
              },
            ].map((phase) => (
              <div key={phase.quarter} 
                   className="backdrop-blur-xl border border-cyber-blue-200 rounded-lg shadow-cyber-md p-8 hover:shadow-cyber-lg transition-all duration-normal"
                   style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold font-heading text-neutral-800">{phase.quarter}</h3>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium border ${
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
                <ul className="space-y-3">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-gradient-cyber-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-cyber-sm">
                        <Shield className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-neutral-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold font-heading text-center text-neutral-800 mb-4">
            Partnerships & Ecosystem
          </h2>
          <p className="text-xl text-center text-neutral-600 mb-16 max-w-2xl mx-auto">
            Collaborating with ecosystem leaders to build better privacy
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Solana Foundation',
                description: 'Core blockchain infrastructure partner',
                type: 'Blockchain',
              },
              {
                name: 'Jupiter Aggregator',
                description: 'DEX aggregation for private swaps',
                type: 'DeFi',
              },
              {
                name: 'Security Auditors',
                description: 'Third-party security verification',
                type: 'Security',
              },
            ].map((partner) => (
              <div key={partner.name} 
                   className="backdrop-blur-xl border border-cyber-blue-200 rounded-lg p-8 text-center shadow-cyber-md hover:shadow-cyber-lg hover:-translate-y-1 transition-all duration-normal"
                   style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
                <div className="w-20 h-20 bg-gradient-cyber-subtle rounded-full flex items-center justify-center mx-auto mb-6 border border-cyber-blue-100">
                  <Users className="w-10 h-10 text-cyber-blue-600" />
                </div>
                <h3 className="text-xl font-semibold font-heading text-neutral-800 mb-2">
                  {partner.name}
                </h3>
                <p className="text-neutral-600 mb-3 leading-relaxed">{partner.description}</p>
                <span className="inline-block px-3 py-1 bg-cyber-blue-400 bg-opacity-10 text-cyber-blue-600 border border-cyber-blue-200 rounded-full text-sm font-medium">
                  {partner.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="relative py-24 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-cyber-subtle"></div>
        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-heading text-neutral-800 mb-4">
              Join Our Community
            </h2>
            <p className="text-xl text-neutral-600">
              Connect with privacy advocates and developers worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                platform: 'Discord',
                members: '5,000+ members',
                icon: MessageCircle,
                link: '#',
              },
              {
                platform: 'Twitter',
                members: '10K+ followers',
                icon: Twitter,
                link: '#',
              },
              {
                platform: 'GitHub',
                members: 'Open Source',
                icon: Github,
                link: '#',
              },
            ].map((social) => (
              <a
                key={social.platform}
                href={social.link}
                className="backdrop-blur-xl border border-cyber-blue-200 rounded-lg p-8 text-center shadow-cyber-md hover:shadow-cyber-lg hover:-translate-y-1 transition-all duration-normal group"
                style={{ background: 'rgba(255, 255, 255, 0.9)' }}
              >
                <social.icon className="w-12 h-12 text-cyber-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold font-heading text-neutral-800 mb-2">
                  {social.platform}
                </h3>
                <p className="text-neutral-600">{social.members}</p>
              </a>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-neutral-600 mb-4">
              Have questions or want to collaborate?
            </p>
            <a
              href="mailto:hello@zkprivacy.io"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-cyber-primary text-white rounded-md font-semibold shadow-cyber-md hover:shadow-glow-primary transition-all duration-normal"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
