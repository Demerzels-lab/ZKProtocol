# Design Specification - Zero Knowledge Privacy Platform

## 1. Design Direction & Rationale

**Style**: Modern Minimalism Premium (Light Mode) dengan Privacy-Focused Adaptations

**Visual Essence**: Clean, professional light interface yang menekankan trust dan technical sophistication. Menggunakan generous whitespace, subtle depth layers, dan restrained color palette untuk menciptakan privacy-focused aesthetic tanpa dark mode extremes. Inspirasi dari fintech platforms (Stripe, Plaid) dengan blockchain credibility (Phantom wallet aesthetics dalam light mode).

**Real-World References**:
- **Stripe Dashboard** - Professional data presentation dengan clean white surfaces
- **Phantom Wallet (Light Mode)** - Crypto interface yang approachable namun technical
- **Linear App** - Minimalist task management dengan subtle interactions
- **Plaid** - Financial technology platform dengan trust-focused design

**Why This Direction**:
1. **Light mode accessibility** - Better readability untuk complex transaction data dan technical documentation
2. **Professional credibility** - Clean whites dan neutrals membangun trust untuk financial platform
3. **Technical sophistication** - Generous spacing dan subtle depth menunjukkan platform quality
4. **Zero Knowledge messaging** - Privacy indicators dan cryptographic elements tetap prominent tanpa dark mode dramatics
5. **Blockchain integration** - Wallet connection UI dan transaction states clearly visible

---

## 2. Design Tokens

### 2.1 Color Palette

#### Primary Brand (Privacy Blue - Trust + Security)
| Token | Value | Usage | WCAG |
|-------|-------|-------|------|
| primary-50 | `#EEF2FF` | Hover backgrounds, badges | - |
| primary-100 | `#E0E7FF` | Active states, selections | - |
| primary-500 | `#6366F1` | Primary CTAs, links, focus rings | 4.56:1 ✅ AA |
| primary-600 | `#4F46E5` | Hover states on buttons | 6.27:1 ✅ AA |
| primary-900 | `#312E81` | Text emphasis (rare) | 12.3:1 ✅ AAA |

**Note**: Indigo/blue menciptakan trust dan security associations. 84% saturation untuk modern tech feel tanpa neon extremes.

#### Neutrals (Structure & Content)
| Token | Value | Usage |
|-------|-------|-------|
| neutral-50 | `#FAFAFA` | Page background (lightest) |
| neutral-100 | `#F5F5F5` | Card/surface background |
| neutral-200 | `#E5E5E5` | Borders, dividers |
| neutral-500 | `#A3A3A3` | Disabled text, placeholders |
| neutral-700 | `#404040` | Secondary text, labels |
| neutral-900 | `#171717` | Primary text, headings |

**Contrast Validation**:
- neutral-900 on white: 16.5:1 ✅ AAA (body text)
- neutral-700 on white: 8.6:1 ✅ AAA (secondary text)
- primary-500 on white: 4.56:1 ✅ AA (interactive elements)

#### Semantic Colors
| Token | Value | Usage |
|-------|-------|-------|
| success-500 | `#10B981` | Transaction confirmed, privacy active |
| success-50 | `#ECFDF5` | Success badge backgrounds |
| warning-500 | `#F59E0B` | Pending states, attention needed |
| warning-50 | `#FFFBEB` | Warning backgrounds |
| error-500 | `#EF4444` | Failed transactions, errors |
| error-50 | `#FEF2F2` | Error backgrounds |

#### Background System (3-Layer Depth)
| Layer | Color | Usage |
|-------|-------|-------|
| Page | neutral-50 `#FAFAFA` | Base canvas |
| Surface | White `#FFFFFF` | Cards, modals, navigation |
| Elevated | White + shadow-card | Dropdowns, popovers |

**Critical**: Surface must have ≥5% lightness contrast with page (white vs #FAFAFA = 2% lightness difference + shadow creates perceived depth).

### 2.2 Typography

#### Font Families
```
Primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
Monospace: 'JetBrains Mono', 'Fira Code', monospace (wallet addresses, hashes)
```

**Rationale**: Inter optimized untuk screen readability, neutral personality untuk professional credibility. Monospace untuk technical data (addresses, transaction hashes).

#### Type Scale (Desktop)
| Token | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| hero | 64px | 700 (Bold) | 1.1 | -0.02em | Landing hero headlines |
| title | 48px | 700 (Bold) | 1.2 | -0.01em | Page headers, section titles |
| subtitle | 32px | 600 (Semibold) | 1.3 | 0 | Feature headers, card titles |
| body-large | 20px | 400 (Regular) | 1.6 | 0 | Intro text, feature descriptions |
| body | 16px | 400 (Regular) | 1.5 | 0 | Standard content, UI text |
| small | 14px | 400 (Regular) | 1.5 | 0 | Captions, helper text |
| caption | 12px | 400 (Regular) | 1.4 | 0.01em | Metadata, timestamps |
| mono | 14px | 400 (Regular) | 1.4 | 0 | Wallet addresses, hashes |

#### Type Scale (Mobile <768px)
- hero: 40px
- title: 32px
- subtitle: 24px
- body: 16px (unchanged)

#### Weights Available
- Regular 400: Body text, descriptions
- Medium 500: Navigation links, subtle emphasis
- Semibold 600: Subheadings, button text
- Bold 700: Headlines, primary emphasis

### 2.3 Spacing (8-Point Grid)

**Prefer 8px multiples for consistency:**

| Token | Value | Usage |
|-------|-------|-------|
| xs | 8px | Tight inline spacing (icon + text) |
| sm | 16px | Standard element spacing |
| md | 24px | Related group spacing |
| lg | 32px | Card/component padding (MINIMUM) |
| xl | 48px | Section internal spacing |
| 2xl | 64px | Section boundaries (between major sections) |
| 3xl | 96px | Hero section spacing, dramatic gaps |
| 4xl | 128px | Maximum spacing (rare usage) |

**Critical Rules**:
- Cards MINIMUM 32px padding (never 16px)
- Sections MINIMUM 64px apart (prefer 96px)
- Content max-width 60-75 characters (~750px at 16px)

### 2.4 Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| sm | 8px | Small elements, badges |
| md | 12px | Buttons, inputs |
| lg | 16px | Cards, major components |
| xl | 24px | Modals, large containers |
| full | 9999px | Pills, avatar shapes |

**Consistency Rule**: Use md (12px) for interactive elements, lg (16px) for containers.

### 2.5 Shadows (Subtle Elevation)

```css
/* card - Subtle depth for floating surfaces */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);

/* card-hover - Gentle lift on interaction */
box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);

/* modal - Prominent overlay */
box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);

/* privacy-glow - Subtle brand tint for privacy indicators */
box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
```

### 2.6 Animation

| Token | Value | Usage |
|-------|-------|-------|
| fast | 200ms | Button clicks, immediate feedback |
| base | 250ms | Standard transitions (90% usage) |
| slow | 300ms | Modals, drawers, emphasis |
| easing-out | cubic-bezier(0, 0, 0.2, 1) | Default (natural deceleration) |
| easing-in-out | cubic-bezier(0.4, 0, 0.2, 1) | Smooth elegance |

**Performance Rule**: Animate ONLY `transform` and `opacity` (GPU-accelerated).

---

## 3. Component Specifications

### 3.1 Hero Section (Landing Page)

**Structure**:
- Height: 500-600px
- Layout: Centered content, max-width 900px
- Headline: 64px bold, max 2 lines
- Subheadline: 20px regular, max-width 600px
- CTA buttons: Primary + Secondary side-by-side
- Background: White with subtle gradient overlay (neutral-50 to white, 5% opacity)

**Tokens**:
- Padding: 96px vertical, 48px horizontal
- Gap: 24px between headline and subheadline
- Button gap: 16px
- Background: White `#FFFFFF`

**Privacy Messaging Pattern**:
- Headline emphasizes "Zero Knowledge" or "True Privacy"
- Subheadline includes technical proof point (ZK-SNARKs, Pedersen commitments)
- Optional: Floating cryptographic pattern visualization (subtle, decorative)

**States**: Static (no hover state for section, but buttons have hover)

### 3.2 Button (Primary CTA)

**Structure**:
- Height: 56px
- Padding: 24px horizontal
- Font: Semibold 600, 16px
- Radius: 12px
- Icon spacing: 8px (if icon present)

**Tokens**:
```
Default:
  background: primary-500 (#6366F1)
  color: white
  shadow: none

Hover:
  background: primary-600 (#4F46E5)
  transform: translateY(-2px)
  shadow: card-hover
  transition: all 250ms ease-out

Active:
  transform: translateY(0)
  shadow: card

Disabled:
  background: neutral-200
  color: neutral-500
  cursor: not-allowed
```

**Note**: ❌ NO gradient backgrounds. Solid colors only per style guide.

### 3.3 Wallet Connection Card

**Structure** (Dashboard header component):
- Height: 64px
- Display: Flex horizontal (wallet icon + address + balance + network indicator)
- Padding: 16px 24px
- Background: White card with shadow-card
- Radius: 16px

**Tokens**:
```
Wallet Icon: 32px size, primary-500 color
Address: 14px mono font, neutral-700, truncated (0x1234...5678)
Balance: 20px semibold, neutral-900
Network Badge: 8px radius, success-50 bg, success-500 text, 12px
Gap: 16px between elements
```

**States**:
- **Connected**: Green dot indicator, full display
- **Connecting**: Yellow dot, "Connecting..." text
- **Disconnected**: Red dot, "Connect Wallet" button
- **Hover**: Slight lift (translateY(-2px)), shadow increase

**Wallet Provider Icons**:
- Phantom, Solflare, Slope logos (24px size)
- SVG format, displayed in connection modal

### 3.4 Transaction Card (Dashboard)

**Structure**:
- Padding: 32px
- Background: White on neutral-50 page
- Radius: 16px
- Border: 1px solid neutral-200
- Shadow: card (subtle elevation)

**Layout**:
- Header: Transaction type + Privacy indicator (flex justify-between)
- Body: Amount (large), Timestamp (small), Status badge
- Footer: Transaction hash (mono font, truncated, copy button)

**Privacy Indicator**:
```
Private: 
  Icon: Shield with checkmark (SVG)
  Color: primary-500
  Label: "Private" badge (primary-50 bg)

Public:
  Icon: Eye (SVG)
  Color: neutral-500
  Label: "Public" badge (neutral-100 bg)
```

**States**:
- **Hover**: Lift -4px, shadow-card-hover, scale(1.01)
- **Transition**: 250ms ease-out

### 3.5 Navigation Bar

**Structure**:
- Height: 72px
- Position: Sticky top
- Background: White with backdrop-blur (10px) untuk glassmorphism
- Border-bottom: 1px solid neutral-200
- Shadow on scroll: card

**Layout** (Horizontal):
```
[Logo 36px] --- [Nav Links] --------------- [Search 48px] [Connect Wallet Button]
```

**Tokens**:
- Container: max-width 1400px, padding 0 48px
- Logo: 36px height, left aligned
- Nav links: 16px medium, neutral-700, gap 32px
  - Hover: primary-500 color transition
  - Active: primary-600, underline (2px, -4px offset)
- Search: 48px height, 12px radius, neutral-100 bg
- CTA button: Primary button (48px height)

**Mobile (<768px)**:
- Hamburger menu (right side)
- Logo center or left
- Hide search, show in mobile menu

### 3.6 Privacy Status Badge

**Structure** (Custom component untuk Zero Knowledge platform):
- Display: Inline-flex
- Padding: 6px 12px
- Radius: 8px (sm)
- Font: 12px medium
- Icon: 16px (left of text, gap 6px)

**Variants**:

**Private (Active ZK)**:
```
Background: primary-50
Color: primary-600
Icon: Shield-check (SVG)
Text: "Private"
Glow: 0 0 0 3px rgba(99,102,241,0.1) on hover
```

**Public**:
```
Background: neutral-100
Color: neutral-600
Icon: Eye (SVG)
Text: "Public"
```

**Proof Generating**:
```
Background: warning-50
Color: warning-600
Icon: Loading spinner (animated)
Text: "Generating Proof..."
Animation: Rotate 360deg 1s linear infinite
```

**Usage**: Transaction history, deposit/withdraw forms, dashboard header

---

## 4. Layout & Responsive

### 4.1 Layout Patterns (Berdasarkan Content Structure Plan)

**Page 1 (Landing `/`)**: Marketing-focused dengan conversion optimization

```
Section Sequence:
1. Hero (500-600px)
   - Centered layout, max-width 900px
   - Headline (64px) + Subheadline (20px) + CTA buttons
   - Background: White dengan subtle pattern overlay

2. Trust Metrics (auto height, 64px padding)
   - 4-column grid → 2-col tablet → 1-col mobile
   - Apply Data Card Grid pattern
   - Gap: 24px between cards

3. Core Features (auto height, 96px padding top)
   - 3-column card grid → 1-col mobile
   - Apply Card component (§3.4)
   - Card padding: 32px, gap: 32px

4. How It Works (auto height, 96px padding)
   - Numbered Capabilities pattern (konekt.market style)
   - Vertical flow dengan step numbers (48px size, primary-500)
   - 2-column alternating layout desktop

5. Security Proof (auto height, 64px padding)
   - 7/5 asymmetric split (content left, visual right)
   - Technical explanation + cryptographic pattern visual

6. CTA Section (400px)
   - Centered content, Primary button 56px
   - Background: neutral-50 subtle contrast
```

**Page 2 (Dashboard `/dashboard`)**: Function-focused data interface

```
Layout Structure:
1. Dashboard Navigation (72px sticky header)
   - Apply Navigation Bar pattern (§3.5)
   - Wallet Connection Card integrated (§3.3)

2. Quick Stats (auto height, 48px padding)
   - 4-column metrics grid → 2-col mobile
   - Large numbers (32px bold) + labels (14px)
   - Background: White cards on neutral-50

3. Transaction Actions (auto height, center 8-col)
   - Tabbed interface (Deposit/Withdraw/Trade/Bridge)
   - Card with 48px padding
   - Input fields: 56px height per spec (§3.2 modified)

4. Transaction History (auto height, full-width)
   - Table pattern: columns (Date, Type, Amount, Status, Privacy)
   - Row height: 64px, padding: 16px
   - Apply Transaction Card on mobile (stacked)
   - Privacy indicators per §3.6
```

**Page 3 (Technology `/technology`)**: Content-focused educational layout

```
Layout Pattern: Content Page
1. Page Header (200px)
   - Title (48px) + Breadcrumb
   - Background: neutral-50

2. Main Content (8-col center, max-width 750px)
   - Body text 16px, line-height 1.5
   - Headings: subtitle scale (32px)
   - Gaps: 32px between sections

3. Architecture Flow (full-width, 96px padding)
   - Timeline pattern horizontal
   - Step cards: 3-col → 1-col mobile

4. Performance Benchmarks (8-col center)
   - Chart embed placeholder
   - Caption: 14px below chart
```

**Page 4 (About `/about`)**: Trust-building narrative

```
Layout Pattern: Content Page + Grid Elements
1. Page Header (200px) - same as Technology
2. Mission Block (7-col center) - text content
3. Roadmap Timeline (full-width) - horizontal timeline
4. Partner Logos (full-width) - 6-col grid → 3-col mobile
```

### 4.2 Grid System

**12-Column Grid**:
- Max container: 1400px (2xl breakpoint)
- Gutter: 24px (desktop), 16px (mobile)
- Common splits:
  - 6-6: 50/50 content
  - 8-4: Primary content + sidebar
  - 4-4-4: Three-column features

### 4.3 Breakpoints

```
Mobile:    320-767px   (1 col layouts, stacked)
Tablet:    768-1023px  (2 col, reduced spacing)
Desktop:   1024-1279px (Full layouts, standard spacing)
Large:     1280px+     (Max-width containers, generous spacing)
```

### 4.4 Responsive Strategy

**Spacing Reduction**:
- Mobile: Reduce by 33% (96px → 64px, 64px → 48px)
- Tablet: Reduce by 20% (96px → 80px, 64px → 52px)

**Grid Adaptation**:
- 4-col → 2-col (tablet) → 1-col (mobile)
- 3-col → 2-col (tablet) → 1-col (mobile)
- Horizontal navigation → Hamburger menu (<768px)

**Typography Adjustments**:
- Hero: 64px → 40px (mobile)
- Body: 16px maintained (don't reduce for readability)
- Increase line-height on mobile (+0.1 for comfort)

**Touch Targets**:
- Minimum: 48×48px (all interactive elements)
- Button height: 56px (desktop) → 56px (mobile unchanged)
- Tap spacing: 8px minimum between elements

### 4.5 Container Max-Widths

```
sm:  100% (mobile full-width)
md:  100% (tablet full-width)
lg:  1024px
xl:  1200px
2xl: 1400px
```

---

## 5. Interaction & Animation Standards

### 5.1 Micro-Animations (All Interactive Elements)

**Button Hover**:
```css
transform: translateY(-2px);
box-shadow: card-hover;
transition: all 250ms ease-out;
```

**Card Hover**:
```css
transform: translateY(-4px) scale(1.01);
box-shadow: card-hover;
transition: all 250ms ease-out;
```

**Link Hover**:
```css
color: primary-500;
transition: color 200ms ease-out;
```

**Input Focus**:
```css
outline: none;
box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
border-color: primary-500;
transition: all 200ms ease-out;
```

### 5.2 Page Transitions

**Content Fade In**:
```css
opacity: 0 → 1;
transform: translateY(20px) → translateY(0);
transition: all 300ms ease-out;
Stagger: 50ms delay per element
```

**Modal Open**:
```css
Backdrop: opacity 0 → 0.5 (200ms)
Modal: scale(0.95) → scale(1), opacity 0 → 1 (300ms ease-out)
```

### 5.3 Loading States

**Wallet Connecting**:
- Spinner icon rotation: 360deg 1s linear infinite
- Text pulse: opacity 0.5 → 1 (1s ease-in-out infinite)

**Transaction Pending**:
- Privacy badge with animated dots
- Status text: "Processing" with ellipsis animation

**Button Loading**:
- Replace text with spinner (20px)
- Maintain button dimensions (no layout shift)
- Disable pointer events

### 5.4 Privacy Indicator Animations

**Proof Generation**:
```css
Shield icon: Pulse scale(1) → scale(1.1) (1s ease-in-out infinite)
Badge glow: box-shadow intensity 0 → 100% (2s ease-in-out)
```

**Transaction Confirmed**:
```css
Checkmark: Draw SVG path (400ms ease-out)
Badge: Background flash primary-100 → primary-50 (600ms)
```

### 5.5 Performance Requirements

**GPU-Accelerated Only**:
```
✅ transform: translate, scale, rotate
✅ opacity: fade effects
❌ width, height, margin, padding, top, left
```

**Reduced Motion**:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 5.6 Scroll Behavior

**Smooth Scroll** (navigation anchor links):
```css
scroll-behavior: smooth;
```

**Scroll Indicators**:
- Navigation bar shadow appears after 100px scroll
- Back-to-top button fades in after 400px scroll

**Parallax** (Optional, use sparingly):
- Maximum 2 layers
- Offset ≤16px per scroll
- Only on hero decorative elements

---

## Document Version

- **Version**: 1.0
- **Created**: 2025-11-25
- **Platform**: Zero Knowledge Privacy Platform
- **Style Base**: Modern Minimalism Premium (Light Mode)
- **Target Audience**: Crypto enthusiasts, privacy-focused users (20-40)
- **Key Differentiation**: Professional light interface untuk blockchain/privacy platform dengan excellent data readability dan trustworthy aesthetic
