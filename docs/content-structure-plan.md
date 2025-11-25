# Content Structure Plan - Zero Knowledge Privacy Platform

## 1. Material Inventory

**Platform Components Required:**
- Landing page dengan Zero Knowledge messaging
- Features showcase (Privacy deposits, Private trading, Cross-chain bridge)
- Dashboard interface untuk user transactions
- Wallet connection interface (Phantom, Solflare, dll)
- Transaction history dengan privacy indicators
- Statistics dan metrics display
- Technology/About information

**Reference Materials:**
- **Erebus Protocol**: Privacy protocol di Solana, ZK-SNARKs, Pedersen commitments
- **Konekt.market UI**: Clean navigation, numbered capabilities, modern minimal aesthetic
- **Key Messaging**: "Military-Grade Security", "True Privacy", "Lightning Fast"
- **Performance Metrics**: <1 detik finalitas, $0.01 biaya transaksi

**Visual Assets Needed:**
- Logo dan brand identity (akan di-specify sebagai SVG icons)
- Cryptographic visualization patterns
- Network/blockchain connection graphics
- Wallet integration icons (Phantom, Solflare logos)

## 2. Website Structure

**Type:** MPA (Multi-Page Application)

**Reasoning:** 
- Platform memiliki 3 distinct user journeys: Marketing (landing), Application (dashboard), Information (about/tech)
- Dashboard memerlukan authenticated state terpisah
- Landing page fokus conversion, Dashboard fokus functionality
- Content cukup kompleks (>6 sections total) dengan multiple personas (investor, trader, developer)
- Separation of concerns antara public marketing dan private application

## 3. Page/Section Breakdown

### Page 1: Landing Page (`/`)

**Purpose**: Convert visitors menjadi users dengan messaging Zero Knowledge privacy dan trust

**Content Mapping:**

| Section | Component Pattern | Data Source | Content to Extract | Visual Asset |
|---------|------------------|-------------|-------------------|--------------|
| Hero | Hero Pattern (500-600px) | Erebus messaging | "Military-Grade Security" tagline + "True Privacy on Solana" headline | Logo (SVG) |
| Trust Metrics | Data Card Grid (4 cards) | Performance data | <1s finality, $0.01 fees, Solana network, ZK-SNARKs | - |
| Core Features | 3-Column Card Grid | Features list | Private Deposits, Private Trading, Cross-Chain Bridge | Feature icons (SVG: Lock, Exchange, Bridge) |
| How It Works | Numbered Capabilities (3-4 steps) | Technical flow | ZK proof generation → Pedersen commitment → Solana finalization | - |
| Security Proof | 2-Column Layout | Technical specs | Zero Knowledge proofs explanation + cryptographic guarantees | Cryptographic pattern visualization |
| CTA Section | Hero Pattern (reduced) | - | "Start Trading Privately" + wallet connection | - |

### Page 2: Dashboard (`/dashboard`)

**Purpose**: Authenticated user interface untuk private transactions

**Content Mapping:**

| Section | Component Pattern | Data Source | Content to Extract | Visual Asset |
|---------|------------------|-------------|-------------------|--------------|
| Dashboard Header | Navigation Bar | User state | Wallet address (truncated), Balance, Network status | Wallet icon |
| Quick Stats | Metrics Grid (4 metrics) | User data | Total deposits, Active trades, Privacy score, Gas saved | - |
| Transaction Actions | Card with Tabs | Actions | Deposit, Withdraw, Trade, Bridge tabs | - |
| Privacy Indicator | Status Badge | ZK state | Privacy level (Private/Public), Proof status | Shield icon (SVG) |
| Transaction History | Table Pattern | Transaction log | Date, Type, Amount, Status, Privacy flag | Privacy indicator icons |
| Network Status | Info Card | Blockchain data | Solana RPC status, Block height, Confirmation time | - |

### Page 3: Technology (`/technology`)

**Purpose**: Technical deep-dive untuk developers dan technical investors

**Content Mapping:**

| Section | Component Pattern | Data Source | Content to Extract | Visual Asset |
|---------|------------------|-------------|-------------------|--------------|
| Page Hero | Content Page Header | - | "Zero Knowledge Technology" headline | - |
| ZK-SNARKs Explanation | 2-Column Asymmetric | Technical docs | What are ZK-SNARKs + Why Solana | Diagram pattern |
| Architecture | Timeline/Flow Pattern | System architecture | Proof generation → Verification → Settlement flow | - |
| Cryptographic Guarantees | Card Grid (3 cards) | Security features | Pedersen commitments, Range proofs, Nullifiers | - |
| Performance Benchmarks | Data Visualization | Metrics | Proof generation time, Verification cost, Transaction throughput | Chart placeholder |
| Developer Resources | Link Grid | - | Documentation, GitHub, API Reference | - |

### Page 4: About (`/about`)

**Purpose**: Build trust dengan transparency tentang team dan mission

**Content Mapping:**

| Section | Component Pattern | Data Source | Content to Extract | Visual Asset |
|---------|------------------|-------------|-------------------|--------------|
| Page Hero | Content Page Header | - | "Privacy is a Right" mission statement | - |
| Mission Statement | Content Block | - | Why privacy matters in DeFi | - |
| Roadmap | Timeline Pattern | - | Q1-Q4 2025 milestones | - |
| Partnerships | Logo Grid | - | Solana, Security auditors, Ecosystem partners | Partner logos |
| Community | 2-Column Layout | - | Discord, Twitter, GitHub links + stats | Social icons (SVG) |

## 4. Content Analysis

**Information Density:** Medium-High
- Landing: Marketing copy + technical credibility (~800 words)
- Dashboard: Data-driven interface (minimal text, high functionality)
- Technology: Technical documentation (~1200 words)
- About: Mission + roadmap (~500 words)
- **Total estimated**: ~2500 words across 4 pages

**Content Balance:**
- **Data/Interactive**: 45% (Dashboard, metrics, transactions)
- **Text**: 35% (Technical explanations, marketing copy)
- **Visual/Icons**: 20% (SVG icons, patterns, diagrams)
- **Content Type**: Data-driven with technical depth

**Key Design Implications:**
- Light mode membutuhkan excellent contrast untuk data readability
- Privacy indicators harus instantly recognizable
- Wallet connection UI must be prominent dan trustworthy
- Technical content needs clear hierarchy (complex concepts)
- Dashboard requires clean, distraction-free interface
