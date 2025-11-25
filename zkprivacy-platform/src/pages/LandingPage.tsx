import { Shield, Zap, Lock, ArrowRight, TrendingUp, CheckCircle, Eye } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-white py-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-600 text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Military-Grade Security
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            True Privacy on Solana
            <br />
            <span className="text-primary-500">Zero Knowledge Protocol</span>
          </h1>
          
          <p className="text-xl text-neutral-700 max-w-2xl mx-auto mb-8">
            Transaksi private dengan kecepatan lightning-fast menggunakan ZK-SNARKs dan Pedersen commitments. Privasi penuh tanpa KYC.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="large" onClick={() => window.location.href = '/dashboard'}>
              Mulai Trading Private
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="large" onClick={() => window.location.href = '/technology'}>
              Pelajari Teknologi
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="py-16 px-6 lg:px-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Finality Time', value: '<1s', icon: Zap },
              { label: 'Transaction Fee', value: '$0.01', icon: TrendingUp },
              { label: 'Privacy Level', value: '100%', icon: Lock },
              { label: 'KYC Required', value: 'None', icon: CheckCircle },
            ].map((metric) => (
              <div key={metric.label} className="bg-white p-8 rounded-lg border border-neutral-200 shadow-card hover:shadow-card-hover transition-shadow">
                <metric.icon className="w-8 h-8 text-primary-500 mb-4" />
                <div className="text-4xl font-bold text-neutral-900 mb-2">{metric.value}</div>
                <div className="text-sm text-neutral-700">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-neutral-900 mb-4">
            Fitur Privasi Terdepan
          </h2>
          <p className="text-xl text-center text-neutral-700 mb-16 max-w-2xl mx-auto">
            Platform komprehensif untuk transaksi private di Solana ecosystem
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Private Deposits',
                description: 'Simpan aset dengan Zero Knowledge proofs. Tidak ada yang bisa tracking deposit Anda di on-chain.',
                icon: Lock,
              },
              {
                title: 'Private Trading',
                description: 'Trading token dengan privasi penuh. Strategi trading Anda tetap rahasia dengan ZK-SNARKs.',
                icon: Eye,
              },
              {
                title: 'Cross-Chain Bridge',
                description: 'Bridge aset private antara Ethereum dan Solana dengan security berlapis dan privasi terjamin.',
                icon: ArrowRight,
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-neutral-50 p-8 rounded-lg border border-neutral-200 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-250"
              >
                <div className="w-16 h-16 bg-primary-50 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-2xl font-semibold text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 lg:px-12 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-neutral-900 mb-16">
            Bagaimana Cara Kerjanya
          </h2>

          <div className="space-y-12">
            {[
              {
                step: '01',
                title: 'Generate ZK Proof',
                description: 'Sistem generate Zero Knowledge proof untuk transaksi Anda menggunakan ZK-SNARKs. Proof membuktikan validitas tanpa reveal data.',
              },
              {
                step: '02',
                title: 'Pedersen Commitment',
                description: 'Transaction data di-encrypt dengan Pedersen commitments, memberikan privasi matematis yang tidak bisa di-break.',
              },
              {
                step: '03',
                title: 'Solana Finalization',
                description: 'Transaksi private di-finalize di Solana blockchain dengan kecepatan <1 detik dan biaya minimal $0.01.',
              },
            ].map((step) => (
              <div key={step.step} className="flex gap-6">
                <div className="text-6xl font-bold text-primary-100 flex-shrink-0">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-neutral-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-lg text-neutral-700">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Proof */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-neutral-900 mb-6">
                Cryptographic Guarantees
              </h2>
              <p className="text-lg text-neutral-700 mb-6">
                Zero Knowledge proofs memberikan mathematical certainty bahwa transaksi Anda private. Tidak ada backdoor, tidak ada trusted party.
              </p>
              <ul className="space-y-4">
                {[
                  'ZK-SNARKs untuk proof generation',
                  'Pedersen commitments untuk hiding values',
                  'Range proofs untuk preventing overflow',
                  'Nullifiers untuk preventing double-spending',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-success-500 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-primary-50 rounded-lg p-12 flex items-center justify-center">
              <div className="text-center">
                <Shield className="w-32 h-32 text-primary-500 mx-auto mb-6" />
                <div className="text-2xl font-bold text-neutral-900">
                  Verified Security
                </div>
                <div className="text-neutral-700 mt-2">
                  Military-Grade Encryption
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-12 bg-neutral-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-neutral-900 mb-6">
            Siap Trading dengan Privasi Penuh?
          </h2>
          <p className="text-xl text-neutral-700 mb-8">
            Connect wallet Anda dan mulai transaksi private di Solana dalam hitungan detik.
          </p>
          <Button size="large" onClick={() => window.location.href = '/dashboard'}>
            Connect Wallet Sekarang
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};
