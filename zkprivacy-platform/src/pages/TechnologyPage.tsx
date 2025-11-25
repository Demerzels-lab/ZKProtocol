import { Shield, Lock, Code, Zap, CheckCircle, GitBranch } from 'lucide-react';

export const TechnologyPage = () => {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-neutral-50 py-16 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-neutral-900 mb-4">
            Zero Knowledge Technology
          </h1>
          <p className="text-xl text-neutral-700">
            Fondasi matematis dan kriptografi yang membuat privasi sempurna menjadi mungkin
          </p>
        </div>
      </section>

      {/* ZK-SNARKs Explanation */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-600 text-sm font-medium mb-4">
                <Code className="w-4 h-4" />
                Core Technology
              </div>
              <h2 className="text-4xl font-bold text-neutral-900 mb-6">
                Apa itu ZK-SNARKs?
              </h2>
              <p className="text-lg text-neutral-700 mb-4">
                Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge (ZK-SNARKs) adalah cryptographic proof system yang memungkinkan satu party (prover) membuktikan kepada party lain (verifier) bahwa suatu statement benar, tanpa mengungkapkan informasi apapun selain kebenaran statement tersebut.
              </p>
              <p className="text-lg text-neutral-700 mb-6">
                Dalam konteks blockchain privacy, ZK-SNARKs memungkinkan verifikasi transaksi tanpa mengungkapkan sender, receiver, atau amount yang ditransfer.
              </p>
              <ul className="space-y-3">
                {[
                  'Succinct: Proof berukuran sangat kecil (beberapa KB)',
                  'Non-Interactive: Tidak memerlukan interaksi bolak-balik',
                  'Zero-Knowledge: Tidak leak informasi apapun',
                  'Sound: Sangat sulit untuk forge proof palsu',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-success-500 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-neutral-50 rounded-lg p-8">
              <div className="bg-white border border-neutral-200 rounded-lg p-6 mb-4">
                <div className="text-sm text-neutral-500 mb-2">Mathematical Foundation</div>
                <div className="font-mono text-sm text-neutral-900">
                  π = (A, B, C)
                  <br />
                  e(A, B) = e(α, β) · e(L, γ) · e(C, δ)
                </div>
              </div>
              <p className="text-sm text-neutral-600">
                Elliptic curve pairing digunakan untuk verify proof dengan computational cost minimal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Solana */}
      <section className="py-24 px-6 lg:px-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-neutral-900 mb-16">
            Kenapa Solana?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'High Performance',
                description: 'Solana mampu process 65,000 TPS dengan finality <1 detik, ideal untuk private transactions yang memerlukan speed.',
                icon: Zap,
              },
              {
                title: 'Low Cost',
                description: 'Transaction fee rata-rata $0.00025, membuat privacy transactions affordable untuk semua user.',
                icon: Lock,
              },
              {
                title: 'Developer Friendly',
                description: 'Rust-based smart contracts dengan extensive tooling dan documentation untuk ZK implementations.',
                icon: Code,
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-white p-8 rounded-lg border border-neutral-200 shadow-card">
                <div className="w-14 h-14 bg-primary-50 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Flow */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-neutral-900 mb-16">
            Transaction Architecture
          </h2>

          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 -translate-y-1/2 hidden lg:block"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
              {[
                {
                  title: 'Proof Generation',
                  description: 'Client-side generation menggunakan proving key. Input: transaction data + witness.',
                  time: '~500ms',
                },
                {
                  title: 'Verification',
                  description: 'On-chain verification menggunakan verification key. Extremely fast (<1ms).',
                  time: '<1ms',
                },
                {
                  title: 'Settlement',
                  description: 'Solana finalization dengan confirmed transaction hash dan on-chain privacy guarantee.',
                  time: '~400ms',
                },
              ].map((step, index) => (
                <div key={step.title} className="relative">
                  <div className="bg-white border-2 border-primary-500 rounded-lg p-8 shadow-card relative z-10">
                    <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-neutral-700 mb-4">{step.description}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-success-50 text-success-600 rounded-full text-sm font-medium">
                      <Zap className="w-4 h-4" />
                      {step.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cryptographic Guarantees */}
      <section className="py-24 px-6 lg:px-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-neutral-900 mb-16">
            Cryptographic Components
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Pedersen Commitments',
                description: 'Cryptographic commitment scheme yang perfectly hiding dan computationally binding. Digunakan untuk commit transaction values tanpa revealing.',
                formula: 'C = g^v · h^r',
              },
              {
                title: 'Range Proofs',
                description: 'Membuktikan bahwa committed value berada dalam range tertentu (misalnya, non-negative) tanpa reveal value tersebut.',
                formula: 'v ∈ [0, 2^n]',
              },
              {
                title: 'Nullifiers',
                description: 'Unique identifier untuk mencegah double-spending dalam private transactions, derived dari secret spending key.',
                formula: 'nf = PRF(sk, ρ)',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 rounded-lg border border-neutral-200 shadow-card">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-6">
                  <GitBranch className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-neutral-700 mb-4">{item.description}</p>
                <div className="bg-neutral-50 px-4 py-2 rounded font-mono text-sm text-neutral-900">
                  {item.formula}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Benchmarks */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-neutral-900 mb-16">
            Performance Benchmarks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { metric: 'Proof Generation Time', value: '500-800ms', description: 'Client-side computation' },
              { metric: 'Verification Time', value: '<1ms', description: 'On-chain verification' },
              { metric: 'Proof Size', value: '~200 bytes', description: 'Extremely compact' },
              { metric: 'Transaction Throughput', value: '~100 TPS', description: 'With ZK verification' },
            ].map((benchmark) => (
              <div key={benchmark.metric} className="bg-neutral-50 p-8 rounded-lg border border-neutral-200">
                <div className="text-sm text-neutral-500 mb-2">{benchmark.metric}</div>
                <div className="text-4xl font-bold text-primary-600 mb-2">{benchmark.value}</div>
                <div className="text-sm text-neutral-600">{benchmark.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Resources */}
      <section className="py-24 px-6 lg:px-12 bg-primary-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-neutral-900 mb-6">
            Developer Resources
          </h2>
          <p className="text-lg text-neutral-700 mb-8">
            Dokumentasi lengkap dan tools untuk build dengan Zero Knowledge privacy
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Documentation', url: '#' },
              { label: 'GitHub', url: '#' },
              { label: 'API Reference', url: '#' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                className="bg-white py-4 px-6 rounded-lg border border-neutral-200 font-semibold text-neutral-900 hover:shadow-card-hover transition-shadow"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
