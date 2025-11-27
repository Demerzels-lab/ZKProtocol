import { Shield, Lock, Code, Zap, CheckCircle, GitBranch } from 'lucide-react';
import { InteractiveBackground } from '../components/InteractiveBackground';

export const TechnologyPage = () => {
  return (
    // 1. Transparent background to show global gradient & interactive pixels
    <div className="min-h-screen bg-transparent text-brand-dark font-sans">
      <InteractiveBackground />
      
      {/* Page Header */}
      <section className="relative py-16 px-6 lg:px-12 overflow-hidden">
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold font-display text-brand-dark mb-6 leading-tight">
            Zero Knowledge Technology
          </h1>
          <p className="text-xl text-brand-dark/80 font-mono">
            Mathematical and cryptographic foundation that makes perfect privacy possible
          </p>
        </div>
      </section>

      {/* ZK-SNARKs Explanation */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-brand-dark shadow-sm text-primary-700 text-sm font-bold uppercase tracking-wider mb-6">
                <Code className="w-4 h-4" />
                Core Technology
              </div>
              <h2 className="text-3xl font-bold font-display text-brand-dark mb-6">
                What are ZK-SNARKs?
              </h2>
              <p className="text-lg text-brand-dark/80 mb-4 leading-relaxed font-mono">
                Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge (ZK-SNARKs) are cryptographic proof systems that enable one party (prover) to prove to another party (verifier) that a statement is true, without revealing any information beyond the truth of the statement itself.
              </p>
              <p className="text-lg text-brand-dark/80 mb-6 leading-relaxed font-mono">
                In the context of blockchain privacy, ZK-SNARKs enable transaction verification without revealing the sender, receiver, or amount transferred.
              </p>

              <ul className="space-y-4">
                {[
                  'Succinct: Proofs are extremely small (few KB)',
                  'Non-Interactive: No back-and-forth interaction required',
                  'Zero-Knowledge: No information leakage whatsoever',
                  'Sound: Extremely difficult to forge false proofs',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-success-500 border-2 border-brand-dark flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-brand-dark font-mono text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pixel-card p-8 bg-white/90">
              <div className="bg-primary-50 border-2 border-brand-dark p-6 mb-4">
                <div className="text-sm font-bold uppercase tracking-wide text-brand-dark/60 mb-2">Mathematical Foundation</div>
                <div className="font-mono text-lg text-brand-dark break-words">
                  π = (A, B, C)
                  <br />
                  <br />
                  e(A, B) = e(α, β) · e(L, γ) · e(C, δ)
                </div>
              </div>
              <p className="text-sm text-brand-dark/70 font-mono border-t-2 border-brand-dark/10 pt-4">
                Elliptic curve pairing is used to verify proofs with minimal computational cost
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Solana */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center text-brand-dark mb-16">
            Why Solana?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'High Performance',
                description: 'Solana processes 65,000 TPS with <1 second finality, ideal for private transactions requiring speed.',
                icon: Zap,
                bg: 'bg-warning-500'
              },
              {
                title: 'Low Cost',
                description: 'Average transaction fee of $0.00025, making privacy transactions affordable for all users.',
                icon: Lock,
                bg: 'bg-primary-500'
              },
              {
                title: 'Developer Friendly',
                description: 'Rust-based smart contracts with extensive tooling and documentation for ZK implementations.',
                icon: Code,
                bg: 'bg-secondary-500'
              },
            ].map((feature) => (
              <div key={feature.title} 
                   className="pixel-card p-8 hover:-translate-y-2 transition-transform group bg-white/90">
                <div className={`w-14 h-14 ${feature.bg} border-2 border-brand-dark flex items-center justify-center mb-6 shadow-sm group-hover:shadow-DEFAULT transition-all`}>
                  <feature.icon className="w-7 h-7 text-white" />
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

      {/* Architecture Flow */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center text-brand-dark mb-16">
            Transaction Architecture
          </h2>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-brand-dark -translate-y-1/2 hidden lg:block opacity-20"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
              {[
                {
                  title: 'Proof Generation',
                  description: 'Client-side generation using proving key. Input: transaction data + witness.',
                  time: '~500ms',
                },
                {
                  title: 'Verification',
                  description: 'On-chain verification using verification key. Extremely fast (<1ms).',
                  time: '<1ms',
                },
                {
                  title: 'Settlement',
                  description: 'Solana finalization with confirmed transaction hash and on-chain privacy guarantee.',
                  time: '~400ms',
                },
              ].map((step, index) => (
                <div key={step.title} className="relative group">
                  <div className="pixel-card p-8 bg-white/95 relative z-10 hover:-translate-y-1 transition-transform">
                    <div className="w-12 h-12 bg-brand-dark text-white border-2 border-brand-dark flex items-center justify-center font-bold font-display text-xl mb-4 shadow-sm">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold font-display text-brand-dark mb-2">
                      {step.title}
                    </h3>
                    <p className="text-brand-dark/80 mb-4 leading-relaxed font-mono">{step.description}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 border-2 border-primary-500 text-sm font-bold uppercase tracking-wide">
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
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center text-brand-dark mb-16">
            Cryptographic Components
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Pedersen Commitments',
                description: 'Cryptographic commitment scheme that is perfectly hiding and computationally binding. Used to commit transaction values without revealing.',
                formula: 'C = g^v · h^r',
              },
              {
                title: 'Range Proofs',
                description: 'Proves that a committed value is within a certain range (e.g., non-negative) without revealing the value itself.',
                formula: 'v ∈ [0, 2^n]',
              },
              {
                title: 'Nullifiers',
                description: 'Unique identifier to prevent double-spending in private transactions, derived from secret spending key.',
                formula: 'nf = PRF(sk, ρ)',
              },
            ].map((item) => (
              <div key={item.title} 
                   className="pixel-card p-8 bg-white/90 hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 bg-white border-2 border-brand-dark flex items-center justify-center mb-6 shadow-sm">
                  <GitBranch className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold font-display text-brand-dark mb-3">
                  {item.title}
                </h3>
                <p className="text-brand-dark/80 mb-4 leading-relaxed font-mono">{item.description}</p>
                <div className="bg-primary-50 px-4 py-2 border-2 border-brand-dark/20 font-mono text-lg text-brand-dark">
                  {item.formula}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Benchmarks */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-center text-brand-dark mb-16">
            Performance Benchmarks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { metric: 'Proof Generation Time', value: '500-800ms', description: 'Client-side computation' },
              { metric: 'Verification Time', value: '<1ms', description: 'On-chain verification' },
              { metric: 'Proof Size', value: '~200 bytes', description: 'Extremely compact' },
              { metric: 'Transaction Throughput', value: '~100 TPS', description: 'With ZK verification' },
            ].map((benchmark) => (
              <div key={benchmark.metric} 
                   className="pixel-card p-8 bg-white/90 text-center">
                <div className="text-sm font-bold uppercase tracking-wide text-brand-dark/60 mb-2">{benchmark.metric}</div>
                <div className="text-4xl font-bold font-display text-primary-600 mb-2">{benchmark.value}</div>
                <div className="text-sm font-mono text-brand-dark/80">{benchmark.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Resources */}
      <section className="relative py-24 px-6 lg:px-12 overflow-hidden">
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-brand-dark mb-6">
            Developer Resources
          </h2>
          <p className="text-xl text-brand-dark/80 mb-8 leading-relaxed font-mono text-center">
            Complete documentation and tools to build with Zero Knowledge privacy
          </p>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 gap-4 max-w-xs">
              {[
                { label: 'GitHub', url: '#' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  className="pixel-card py-4 px-6 font-bold text-brand-dark hover:text-primary-600 hover:-translate-y-1 transition-transform uppercase tracking-widest text-lg bg-white/90 text-center"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};