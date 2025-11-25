import { Shield, Target, Users, Calendar, Github, Twitter, MessageCircle } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-neutral-50 py-16 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-neutral-900 mb-4">
            Privacy is a Right
          </h1>
          <p className="text-xl text-neutral-700">
            Kami percaya bahwa setiap orang berhak atas privasi finansial tanpa kompromi
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-16 h-16 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Target className="w-8 h-8 text-primary-500" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-neutral-700 mb-4">
                Kami membangun infrastruktur privasi untuk DeFi yang memungkinkan siapa saja bertransaksi dengan privasi penuh, tanpa memerlukan trust kepada pihak ketiga atau melanggar compliance.
              </p>
              <p className="text-lg text-neutral-700">
                Zero Knowledge technology adalah masa depan privasi blockchain. Dengan mathematical guarantees dan cryptographic security, kami memberikan privasi yang benar-benar tidak bisa di-break.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { title: 'Privacy First', description: 'Privasi adalah default, bukan optional feature' },
              { title: 'Trustless', description: 'Tidak ada trusted party atau backdoor' },
              { title: 'Open Source', description: 'Transparent code untuk community verification' },
            ].map((value) => (
              <div key={value.title} className="bg-neutral-50 p-6 rounded-lg border border-neutral-200">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-neutral-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-24 px-6 lg:px-12 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-600 text-sm font-medium mb-4">
              <Calendar className="w-4 h-4" />
              Development Roadmap
            </div>
            <h2 className="text-4xl font-bold text-neutral-900">
              Platform Evolution
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                quarter: 'Q1 2025',
                status: 'Completed',
                items: [
                  'ZK-SNARK implementation untuk Solana',
                  'Basic private transfer functionality',
                  'Devnet testing dan security audit',
                ],
              },
              {
                quarter: 'Q2 2025',
                status: 'In Progress',
                items: [
                  'Jupiter Aggregator integration untuk private swaps',
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
              <div key={phase.quarter} className="bg-white rounded-lg border border-neutral-200 shadow-card p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-neutral-900">{phase.quarter}</h3>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      phase.status === 'Completed'
                        ? 'bg-success-50 text-success-600'
                        : phase.status === 'In Progress'
                        ? 'bg-warning-50 text-warning-600'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {phase.status}
                  </span>
                </div>
                <ul className="space-y-3">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-700">{item}</span>
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
          <h2 className="text-4xl font-bold text-center text-neutral-900 mb-4">
            Partnerships & Ecosystem
          </h2>
          <p className="text-xl text-center text-neutral-700 mb-16 max-w-2xl mx-auto">
            Bekerja sama dengan ecosystem leaders untuk membangun privasi yang lebih baik
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
                description: 'DEX aggregation untuk private swaps',
                type: 'DeFi',
              },
              {
                name: 'Security Auditors',
                description: 'Third-party security verification',
                type: 'Security',
              },
            ].map((partner) => (
              <div key={partner.name} className="bg-neutral-50 p-8 rounded-lg border border-neutral-200 text-center">
                <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {partner.name}
                </h3>
                <p className="text-neutral-700 mb-3">{partner.description}</p>
                <span className="inline-block px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm font-medium">
                  {partner.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-24 px-6 lg:px-12 bg-primary-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Join Our Community
            </h2>
            <p className="text-xl text-neutral-700">
              Connect dengan privacy advocates dan developers di seluruh dunia
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
                className="bg-white p-8 rounded-lg border border-neutral-200 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 text-center group"
              >
                <social.icon className="w-12 h-12 text-primary-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {social.platform}
                </h3>
                <p className="text-neutral-700">{social.members}</p>
              </a>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-neutral-700 mb-4">
              Punya pertanyaan atau ingin collaborate?
            </p>
            <a
              href="mailto:hello@zkprivacy.io"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-md font-semibold hover:bg-primary-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
