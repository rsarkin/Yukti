# Yukti — AI-Powered Indian Election Literacy Assistant

An interactive, bilingual (English + Hindi) web application designed to educate Indian citizens about the electoral process, simplify voter registration, and empower them to exercise their democratic right with confidence.

> **Built for the Future of Civic Engagement**

---

## Features

| Feature | Description |
|---------|-------------|
| **EVM Simulator** | Interactive 5-step simulation of the real Electronic Voting Machine experience, complete with Presiding Officer control, Ballot Unit, and VVPAT verification |
| **Voter Journey Wizard** | Personalized 4-stage roadmap: Eligibility → Registration → Preparation → Ready |
| **Chat with Yukti** | Gemini 1.5 Flash-powered AI assistant with **Voice-to-Text support** (Bilingual) |
| **Mobile Navigation** | Dedicated premium bottom navigation bar for seamless mobile accessibility |
| **Election News** | High-end news hub with **Skeleton Loaders**, scroll-reveal animations, and full-article modal |
| **Booth Locator** | Step-by-step guide to find your assigned polling station |
| **Constituency Finder** | Pincode-based lookup for Lok Sabha and Vidhan Sabha constituencies |
| **Report Misconduct** | 4-step complaint generator with formal letter output and delivery options |
| **Yukti Saathi** | Modern volunteer hub for campus ambassadors and community guides |

## Design System

- **Aesthetic**: NeoPOP / Minimalist — warm cream backgrounds, serif headings, thin-stroke SVG icons
- **Typography**: Playfair Display (headings), DM Sans (body), Noto Sans Devanagari (Hindi)
- **Colors**: Cream (#F5F0E8), Charcoal (#2D2A26), Muted Blue (#5B8DB8), Caramel (#C4956A)
- **Rules**: No filled icons, no emoji in UI chrome, no gradients on text

## Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 (new `@theme` syntax)
- **Routing**: React Router v7
- **AI**: Gemini 1.5 Flash API (client-side)
- **Integrations**: Google Services MCP (Gmail, Calendar, Drive)
- **No backend** — fully client-side SPA

## Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/yukti.git
cd yukti

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your Gemini API key:
# VITE_GEMINI_API_KEY=your_key_here

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/
│   ├── landing/       # Hero, Stats, WhyVote, Constitution, Timeline, Bodies, FeatureStrip
│   ├── evm/           # EVMSimulator, BallotUnit, VVPATAnimation, EVMInfoAccordion
│   ├── journey/       # JourneyWizard, EligibilityChecker, RegistrationGuide, VotingDayGuide
│   ├── chat/          # ChatWindow (Gemini-powered)
│   ├── booth/         # BoothLocator
│   ├── constituency/  # ConstituencyFinder
│   ├── register/      # FormStepper, StepCard
│   ├── report/        # ReportWizard (4-step complaint generator)
│   ├── news/          # ElectionNews
│   └── layout/        # Navbar, Footer
├── context/           # LanguageContext, JourneyContext
├── constants/         # translations.js, electionData.js, prompts.js
├── hooks/             # useGemini, useGoogleServices, useCounterAnimation
├── data/              # pincodes.json
└── styles/            # tokens.js
```

## Bilingual Support

Toggle between English and Hindi using the language button in the navbar. All UI strings are centralized in `src/constants/translations.js`. Hindi typography uses Noto Sans Devanagari via Google Fonts CDN.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini 1.5 Flash API key | Yes (for AI chat) |

The app works without the API key — chat will show a configuration notice instead of AI responses.

## Build

```bash
npm run build
```

Production bundle is output to `dist/`. Total bundle size is under 500KB (gzipped ~100KB).

---

**Yukti** — *Your Vote. Your Voice. Your India.*
