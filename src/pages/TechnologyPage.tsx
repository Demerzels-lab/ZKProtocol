import { Shield, Lock, Code, Zap, CheckCircle, GitBranch } from 'lucide-react';

export const TechnologyPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Page Header */}
      <section className="relative py-16 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-cyber-subtle"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold font-heading text-neutral-800 mb-4">
            Zero Knowledge Technology
          </h1>
          <p className="text-xl text-neutral-600">
            Mathematical and cryptographic foundation that makes perfect privacy possible
          </p>
        </div>
      </section>

      {/* ZK-SNARKs Explanation */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-cyber-blue-700 text-sm font-medium mb-4 backdrop-blur-xl border border-cyber-blue-200"
                   style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
                <Code className="w-4 h-4" />
                Core Technology
              </div>
              <h2 className="text-4xl font-bold font-heading text-neutral-800 mb-6">
                What are ZK-SNARKs?
              </h2>
              <p className="text-lg text-neutral-600 mb-4 leading-relaxed">
                Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge (ZK-SNARKs) are cryptographic proof systems that enable one party (prover) to prove to another party (verifier) that a statement is true, without revealing any information beyond the truth of the statement itself.
              </p>
              <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                In the context of blockchain privacy, ZK-SNARKs enable transaction verification without revealing the sender, receiver, or amount transferred.
              </p>
              <ul className="space-y-3">
                {[
                  'Succinct: Proofs are extremely small (few KB)',
                  'Non-Interactive: No back-and-forth interaction required',
                  'Zero-Knowledge: No information leakage whatsoever',
                  'Sound: Extremely difficult to forge false proofs',
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
            <div className="backdrop-blur-xl border border-cyber-blue-200 rounded-lg p-8 shadow-cyber-md"
                 style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
              <div className="bg-gradient-cyber-subtle border border-cyber-blue-100 rounded-lg p-6 mb-4">
                <div className="text-sm text-neutral-500 mb-2">Mathematical Foundation</div>
                <div className="font-mono text-sm text-neutral-800">
                  π = (A, B, C)
                  <br />
                  e(A, B) = e(α, β) · e(L, γ) · e(C, δ)
                </div>
              </div>
              <p className="text-sm text-neutral-600">
                Elliptic curve pairing is used to verify proofs with minimal computational cost
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Solana */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-cyber-subtle">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold font-heading text-center text-neutral-800 mb-16">
            Why Solana?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'High Performance',
                description: 'Solana processes 65,000 TPS with <1 second finality, ideal for private transactions requiring speed.',
                icon: Zap,
              },
              {
                title: 'Low Cost',
                description: 'Average transaction fee of $0.00025, making privacy transactions affordable for all users.',
                icon: Lock,
              },
              {
                title: 'Developer Friendly',
                description: 'Rust-based smart contracts with extensive tooling and documentation for ZK implementations.',
                icon: Code,
              },
            ].map((feature) => (
              <div key={feature.title} 
                   className="backdrop-blur-xl border border-cyber-blue-200 rounded-lg p-8 shadow-cyber-md hover:shadow-cyber-lg hover:-translate-y-2 transition-all duration-normal"
                   style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
                <div className="w-14 h-14 bg-gradient-cyber-primary rounded-lg flex items-center justify-center mb-6 shadow-cyber-md">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold font-heading text-neutral-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Flow */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold font-heading text-center text-neutral-800 mb-16">
            Transaction Architecture
          </h2>

          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-cyber-blue-100 -translate-y-1/2 hidden lg:block"></div>
            
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
                <div key={step.title} className="relative">
                  <div className="backdrop-blur-xl border-2 border-cyber-blue-500 rounded-lg p-8 shadow-cyber-lg relative z-10"
                       style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
                    <div className="w-12 h-12 bg-gradient-cyber-primary text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 shadow-glow-primary">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold font-heading text-neutral-800 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 mb-4 leading-relaxed">{step.description}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-cyan-400 bg-opacity-10 text-cyber-cyan-600 border border-cyber-cyan-200 rounded-full text-sm font-medium">
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
      <section className="py-24 px-6 lg:px-12 bg-gradient-cyber-subtle">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold font-heading text-center text-neutral-800 mb-16">
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
                   className="backdrop-blur-xl border border-cyber-blue-200 rounded-lg p-8 shadow-cyber-md hover:shadow-cyber-lg transition-all duration-normal"
                   style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
                <div className="w-12 h-12 bg-gradient-cyber-subtle rounded-lg flex items-center justify-center mb-6 border border-cyber-blue-100">
                  <GitBranch className="w-6 h-6 text-cyber-blue-600" />
                </div>
                <h3 className="text-xl font-semibold font-heading text-neutral-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-neutral-600 mb-4 leading-relaxed">{item.description}</p>
                <div className="bg-gradient-cyber-subtle px-4 py-2 rounded font-mono text-sm text-neutral-800 border border-cyber-blue-100">
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
          <h2 className="text-4xl font-bold font-heading text-center text-neutral-800 mb-16">
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
                   className="backdrop-blur-xl border border-cyber-blue-200 rounded-lg p-8 shadow-cyber-md"
                   style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
                <div className="text-sm text-neutral-500 mb-2">{benchmark.metric}</div>
                <div className="text-4xl font-bold font-heading text-cyber-blue-600 mb-2">{benchmark.value}</div>
                <div className="text-sm text-neutral-600">{benchmark.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Resources */}
      <section className="relative py-24 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-cyber-subtle"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold font-heading text-neutral-800 mb-6">
            Developer Resources
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
            Complete documentation and tools to build with Zero Knowledge privacy
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
                className="backdrop-blur-xl border border-cyber-blue-200 py-4 px-6 rounded-lg font-semibold text-neutral-800 hover:shadow-cyber-md hover:-translate-y-1 transition-all duration-normal"
                style={{ background: 'rgba(255, 255, 255, 0.9)' }}
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
