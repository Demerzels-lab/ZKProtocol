# 🔒 ZKProtocol - Zero-Knowledge Privacy Network

**The ZERO-KNOWLEDGE PRIVACY NETWORK** - Execute private on-chain transactions using zero-knowledge technology while keeping your identity and balances hidden while staying fully verifiable.

## 🚀 Quick Start

### Live Demo
Visit: [https://kcbr2ildbstj.space.minimax.io](https://kcbr2ildbstj.space.minimax.io)

### Development
```bash
pnpm install
pnpm dev
```

## ✨ Features

- **🛡️ True Privacy**: ZK-SNARKs and Pedersen commitments for complete anonymity
- **⚡ Lightning Fast**: <1s transaction finality on Solana
- **💰 Low Cost**: $0.01 transaction fees
- **🔐 No KYC**: Completely anonymous transactions
- **🔄 Cross-Chain**: Ethereum ↔ Solana private bridges

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS + Cyber-Tech Lite design
- **Wallet**: Phantom & Solflare integration
- **Blockchain**: Solana Devnet + Jupiter Aggregator
- **Backend**: Supabase Edge Functions

### Privacy Implementation
- **ZK-SNARKs**: Zero-knowledge proof verification
- **Pedersen Commitments**: Cryptographic privacy
- **Transaction Mixing**: Configurable anonymity levels (1-10)
- **Privacy Scores**: Dynamic privacy calculation (0-100%)

## 📱 User Flow

1. **Connect Wallet** - Install Phantom/Solflare and connect
2. **Set Privacy Level** - Choose Standard/Enhanced/Maximum
3. **Private Transaction** - Execute with complete anonymity
4. **Privacy Verification** - Real-time ZK proof generation

## 🛠️ Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── dashboard/       # Dashboard components
│   │   ├── layout/          # Layout components
│   │   └── ui/             # UI components
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Utilities
│   └── pages/              # Page components
├── supabase/               # Backend functions
└── dist/                   # Build output
```

## 🔧 Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm build:prod   # Build optimized production
pnpm lint         # Run ESLint
```

## 📋 Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SOLANA_NETWORK=devnet
```

## 🔒 Privacy Features

### Privacy Levels
- **Standard**: Basic privacy with minimal mixing (1x fee)
- **Enhanced**: Advanced privacy with moderate mixing (1.5x fee)
- **Maximum**: Highest privacy with maximum mixing (2x fee)

### Technical Implementation
- ZK-SNARK proof generation with configurable delay
- Pedersen commitments for amount privacy
- Transaction mixing for enhanced anonymity
- Real-time privacy score calculation

## 📊 Documentation

See [PRIVACY_FEATURES_IMPLEMENTATION.md](./PRIVACY_FEATURES_IMPLEMENTATION.md) for detailed technical implementation.

See [ZKPROTOCOL_REBRANDING_SUMMARY.md](./ZKPROTOCOL_REBRANDING_SUMMARY.md) for rebranding details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with ❤️ by the ZKProtocol Team**
