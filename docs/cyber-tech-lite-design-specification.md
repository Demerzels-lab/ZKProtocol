# Cyber-Tech Lite Light Theme - Design Specification
## Erebus Protocol Platform Design System

---

## 1. Direction & Rationale

### Visual Essence
Cyber-Tech Lite Light Theme mengadaptasi aesthetic futuristik cyber-tech ke dalam light interface yang accessible dan professional. Menggabungkan clean light backgrounds dengan vibrant cyber accents, subtle glows, dan contemporary gradients untuk menciptakan modern tech-forward appearance tanpa mengorbankan readability dan trust factor yang essential untuk platform finansial blockchain.

### Style Identity
**Cyber-Tech Lite** - Modern light-theme interpretation dari cyber aesthetic dengan emphasis pada:
- Light glass morphism effects dengan subtle transparency
- Vibrant gradient accents pada neutral light base  
- Contemporary tech patterns dan micro-animations
- Professional accessibility dengan cyber visual enhancements

### Real-World References
- **konekt.market** (cyber aesthetic adaptation)
- **Phantom Wallet Light Mode** (blockchain UI familiarity)
- **Linear App** (clean tech interface)
- **Stripe Dashboard** (financial platform trust)
- **Figma** (contemporary gradient usage)

---

## 2. Design Tokens

### Color System

#### Primary Cyber Palette
| Token | Hex | Usage |
|-------|-----|-------|
| cyber-blue-50 | #EFF6FF | Light backgrounds, subtle tints |
| cyber-blue-100 | #DBEAFE | Card backgrounds, hover states |
| cyber-blue-500 | #3B82F6 | Primary actions, links |
| cyber-blue-600 | #2563EB | Primary button, focused states |
| cyber-blue-700 | #1D4ED8 | Active states, pressed buttons |

#### Cyber Accent Palette  
| Token | Hex | Usage |
|-------|-----|-------|
| cyber-purple-400 | #A855F7 | Secondary accents, highlights |
| cyber-purple-500 | #9333EA | Secondary actions |
| cyber-cyan-400 | #22D3EE | Success states, positive indicators |
| cyber-cyan-500 | #06B6D4 | Active connections, live data |

#### Neutral Light Base
| Token | Hex | Usage |
|-------|-----|-------|
| neutral-50 | #FAFAFA | Page backgrounds |
| neutral-100 | #F5F5F5 | Card surfaces |
| neutral-200 | #E5E5E5 | Borders, dividers |
| neutral-400 | #A3A3A3 | Secondary text |
| neutral-600 | #525252 | Primary text |
| neutral-800 | #262626 | Headers, emphasis |

#### Semantic Colors
| Token | Hex | Usage |
|-------|-----|-------|
| success-500 | #10B981 | Success transactions, confirmations |
| warning-500 | #F59E0B | Warnings, pending states |
| error-500 | #EF4444 | Errors, failed transactions |
| info-500 | #3B82F6 | Information, notifications |

#### Cyber Gradients
| Token | CSS Value | Usage |
|-------|-----------|-------|
| gradient-cyber-primary | linear-gradient(135deg, #3B82F6 0%, #9333EA 100%) | Primary CTAs, hero sections |
| gradient-cyber-subtle | linear-gradient(135deg, #EFF6FF 0%, #F3E8FF 100%) | Subtle backgrounds |
| gradient-cyber-glow | linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%) | Glow effects |

### Typography

#### Font Families
| Token | Value | Usage |
|-------|-------|-------|
| font-primary | 'Inter', system-ui, sans-serif | Body text, UI elements |
| font-heading | 'Space Grotesk', system-ui, sans-serif | Headlines, emphasis |
| font-mono | 'JetBrains Mono', Consolas, monospace | Code, addresses, hashes |

#### Font Sizes
| Token | Value (rem) | Pixel | Usage |
|-------|-------------|--------|-------|
| text-xs | 0.75 | 12px | Captions, metadata |
| text-sm | 0.875 | 14px | Secondary text |
| text-base | 1.0 | 16px | Body text |
| text-lg | 1.125 | 18px | Large body text |
| text-xl | 1.25 | 20px | Small headings |
| text-2xl | 1.5 | 24px | Section headings |
| text-3xl | 1.875 | 30px | Page headings |
| text-4xl | 2.25 | 36px | Hero headings |
| text-5xl | 3.0 | 48px | Display headings |

#### Font Weights
| Token | Value | Usage |
|-------|-------|-------|
| font-normal | 400 | Body text |
| font-medium | 500 | Emphasized text |
| font-semibold | 600 | Subheadings |
| font-bold | 700 | Headings |

#### Line Heights
| Token | Value | Usage |
|-------|-------|-------|
| leading-tight | 1.25 | Headlines |
| leading-normal | 1.5 | Body text |
| leading-relaxed | 1.625 | Large text blocks |

### Spacing Scale (4pt Grid)

| Token | Value (rem) | Pixel | Usage |
|-------|-------------|--------|-------|
| space-1 | 0.25 | 4px | Fine adjustments |
| space-2 | 0.5 | 8px | Micro spacing |
| space-3 | 0.75 | 12px | Small gaps |
| space-4 | 1.0 | 16px | Standard spacing |
| space-6 | 1.5 | 24px | Medium spacing |
| space-8 | 2.0 | 32px | Large spacing |
| space-12 | 3.0 | 48px | Section spacing |
| space-16 | 4.0 | 64px | Major spacing |
| space-24 | 6.0 | 96px | Hero spacing |
| space-32 | 8.0 | 128px | Page spacing |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| rounded-sm | 4px | Small elements |
| rounded-md | 8px | Cards, buttons |
| rounded-lg | 12px | Large cards |
| rounded-xl | 16px | Modals, panels |
| rounded-2xl | 24px | Hero elements |

### Cyber Shadows & Glows

| Token | CSS Value | Usage |
|-------|-----------|-------|
| shadow-cyber-sm | 0 1px 2px rgba(59, 130, 246, 0.1) | Subtle cyber tint |
| shadow-cyber-md | 0 4px 6px rgba(59, 130, 246, 0.15) | Cards, buttons |
| shadow-cyber-lg | 0 10px 15px rgba(59, 130, 246, 0.2) | Elevated elements |
| glow-cyber-primary | 0 0 20px rgba(59, 130, 246, 0.4) | Primary CTAs |
| glow-cyber-accent | 0 0 15px rgba(147, 51, 234, 0.3) | Accent highlights |

### Animation & Motion

| Token | Value | Usage |
|-------|-------|-------|
| duration-fast | 150ms | Micro interactions |
| duration-normal | 250ms | Standard transitions |
| duration-slow | 350ms | Complex animations |
| ease-cyber | cubic-bezier(0.4, 0.0, 0.2, 1) | Tech-like easing |

---

## 3. Component Specifications

### 3.1 Hero Section
**Structure:** Full-width container dengan cyber gradient background dan glassmorphism overlay

**Visual Specifications:**
- Height: 500-600px viewport
- Background: gradient-cyber-subtle dengan subtle tech pattern overlay
- Content container: max-width 1200px, centered
- Glassmorphism panel: backdrop-blur(20px), rgba(255, 255, 255, 0.8)

**Typography:**
- Headline: font-heading, text-5xl (48px), font-bold, cyber-blue-700
- Subheading: font-primary, text-xl (20px), font-normal, neutral-600
- CTA button: text-lg, font-semibold

**Interactive States:**
- CTA hover: Transform scale(1.02) + glow-cyber-primary
- CTA active: Transform scale(0.98)
- Duration: duration-normal (250ms)

**Cyber Elements:**
- Subtle animated tech grid pattern (opacity 0.05)
- Floating gradient orbs dengan gentle drift animation
- Text subtle glow pada headings

### 3.2 Button Components

#### Primary Cyber Button
**Structure:** Gradient background dengan subtle glow dan micro-animations

**Visual Specifications:**
- Padding: space-4 space-8 (16px 32px)
- Background: gradient-cyber-primary
- Border-radius: rounded-md (8px)
- Typography: font-medium, text-base
- Color: white

**States:**
- Default: gradient-cyber-primary + shadow-cyber-md
- Hover: Transform translateY(-1px) + glow-cyber-primary + shadow-cyber-lg
- Active: Transform translateY(0px) + reduced shadow
- Focus: Outline cyber-blue-500 dengan 2px ring
- Disabled: Opacity 0.5, cursor not-allowed

#### Secondary Cyber Button  
**Visual Specifications:**
- Background: rgba(59, 130, 246, 0.1)
- Border: 1px solid cyber-blue-200
- Color: cyber-blue-600

**States:**
- Hover: Background cyber-blue-50 + border cyber-blue-300
- Active: Background cyber-blue-100

### 3.3 Cyber Card Component
**Structure:** Light glassmorphism card dengan cyber accent borders

**Visual Specifications:**
- Background: rgba(255, 255, 255, 0.9)
- Backdrop-filter: blur(20px)
- Border: 1px solid rgba(59, 130, 246, 0.2)
- Border-radius: rounded-lg (12px)
- Padding: space-6 (24px)
- Shadow: shadow-cyber-md

**Cyber Elements:**
- Top border accent: 2px solid gradient-cyber-primary
- Subtle inner glow: inset 0 1px 0 rgba(255, 255, 255, 0.6)

**States:**
- Hover: Transform translateY(-2px) + shadow-cyber-lg
- Active: Transform scale(0.98)
- Transition: duration-normal

### 3.4 Navigation Bar
**Structure:** Fixed top navigation dengan glassmorphism background

**Visual Specifications:**
- Background: rgba(250, 250, 250, 0.95)
- Backdrop-filter: blur(20px)
- Border-bottom: 1px solid rgba(59, 130, 246, 0.1)
- Height: 64px
- Padding: space-4 space-6

**Logo Placement:** Left-aligned dengan cyber accent glow
**Navigation Items:** Center atau right-aligned dengan cyber hover effects

**States:**
- Nav item hover: Color cyber-blue-600 + subtle glow
- Active nav: Color cyber-blue-700 + underline accent
- Mobile menu: Slide down dengan glassmorphism background

### 3.5 Wallet Connection Card
**Structure:** Specialized card untuk blockchain wallet integration

**Visual Specifications:**
- Base: Cyber Card component specifications (§3.3)
- Additional: Gradient border animation saat connecting
- Status indicators: Colored dots (green=connected, amber=pending, gray=disconnected)

**Cyber Enhancements:**
- Connection animation: Pulsing glow effect
- Success state: Brief green glow kemudian fade to normal
- Wallet icons: 24px dengan subtle drop-shadow

### 3.6 Input Fields
**Structure:** Light cyber-styled form inputs dengan glow focus states

**Visual Specifications:**
- Background: neutral-50
- Border: 1px solid neutral-200
- Border-radius: rounded-md (8px)
- Padding: space-3 space-4 (12px 16px)

**States:**
- Focus: Border cyber-blue-500 + glow-cyber-primary + outline none
- Error: Border error-500 + red glow
- Success: Border success-500 + green glow

---

## 4. Layout & Responsive Design

### Cyber-Tech Lite Layout Patterns

Berdasarkan platform Erebus Protocol yang sudah ada (4 pages: Landing, Dashboard, Technology, About):

#### Landing Page Pattern
- **Hero Section:** 500-600px dengan cyber gradient background + glassmorphism content panel
- **Feature Grid:** 3-column layout (desktop) → 1-column stack (mobile)
- **Wallet Integration Section:** 2-column asymmetric (7/5 split)
- **Technology Showcase:** Full-width dengan cyber card grid (4-column)
- **Footer:** Dark cyber accent section dengan gradient overlay

#### Dashboard Page Pattern  
- **Header:** Fixed glassmorphism navbar dengan wallet status indicator
- **Main Content:** 2-column layout (sidebar 4-col + content 8-col)
- **Wallet Cards:** Grid layout dengan cyber hover effects
- **Transaction History:** Full-width table dengan cyber-styled rows
- **Analytics Cards:** 3-column metrics grid dengan gradient accents

#### Technology/About Page Pattern
- **Page Header:** 200px height dengan gradient background
- **Content:** 8-column center content + 2-column margins
- **Section Dividers:** Cyber gradient lines
- **Image Galleries:** Masonry layout untuk technical diagrams

### Responsive Strategy

#### Breakpoints
| Token | Min-width | Usage |
|-------|-----------|-------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet portrait |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |

#### Grid System
- **Desktop (lg+):** 12-column grid, gap-8 (32px)
- **Tablet (md):** 8-column grid, gap-6 (24px)  
- **Mobile (sm):** 4-column grid, gap-4 (16px)

#### Component Adaptations
- **Navigation:** Desktop horizontal → Mobile hamburger dengan glassmorphism overlay
- **Cards:** Desktop 3-4 columns → Tablet 2 columns → Mobile 1 column
- **Hero:** Desktop 2-column → Mobile stacked dengan reduced heights
- **Buttons:** Desktop standard → Mobile full-width untuk CTAs

### Container Specifications
- **Max-width:** 1200px untuk main content
- **Padding:** space-6 (24px) mobile, space-8 (32px) desktop
- **Margins:** space-4 to space-16 depending on section hierarchy

---

## 5. Interaction & Animation Patterns

### Cyber-Tech Micro Animations

#### Page Transitions
- **Duration:** duration-normal (250ms)
- **Easing:** ease-cyber cubic-bezier
- **Pattern:** Fade-in dengan subtle slide up (16px)

#### Hover Effects
- **Cards:** translateY(-2px) + enhanced shadow + subtle glow
- **Buttons:** translateY(-1px) + scale(1.02) + glow effect
- **Links:** Color transition + subtle underline animation

#### Loading States
- **Skeleton:** Gradient shimmer dengan cyber-blue-100 to cyber-blue-50
- **Spinners:** Rotating gradient ring dengan cyber colors
- **Progress:** Gradient progress bars dengan subtle glow

#### Micro Interactions
- **Form Focus:** Border color change + glow animation (150ms)
- **Button Press:** scale(0.98) active state (100ms)
- **Toggle States:** Smooth slide transitions dengan color changes

#### Blockchain-Specific Animations
- **Wallet Connecting:** Pulsing glow effect (2s loop)
- **Transaction Pending:** Rotating border gradient
- **Transaction Success:** Brief green glow expansion kemudian fade
- **Balance Updates:** Number count-up animation dengan highlight

### Performance Considerations
- **GPU Acceleration:** Gunakan transform dan opacity untuk animations
- **Reduced Motion:** Respect prefers-reduced-motion media query
- **Frame Rate:** Target 60fps untuk smooth interactions

### Accessibility Standards
- **Color Contrast:** Minimum 4.5:1 ratio (WCAG AA)
- **Touch Targets:** Minimum 44x44px untuk mobile
- **Keyboard Navigation:** Visible focus indicators dengan cyber styling
- **Screen Readers:** Semantic HTML struktur terjaga

---

## Implementation Notes

### Blockchain Integration Compatibility
Design system fully compatible dengan existing platform tech stack:
- **React/Next.js:** Component-based architecture ready
- **Solana Wallet Adapters:** UI patterns mendukung Phantom, Solflare integration
- **Jupiter Aggregator API:** Display patterns untuk real-time pricing
- **Supabase Backend:** Compatible dengan data display patterns

### Tech Stack Optimization
- **Tailwind CSS:** Design tokens dapat di-convert ke Tailwind config
- **CSS Custom Properties:** W3C format design tokens ready
- **TypeScript:** Component prop types dapat di-define dari design tokens

### File Structure Deliverables
1. **cyber-tech-lite-design-specification.md** (this document)
2. **cyber-tech-lite-design-tokens.json** (machine-readable tokens)
3. **implementation-guidelines.md** (developer handoff notes)

---

*Design System Version: Cyber-Tech Lite Light Theme v1.0*  
*Created for: Erebus Protocol Platform*  
*Date: November 2025*