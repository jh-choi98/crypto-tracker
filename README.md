<!-- --------------------------------------------------------------------- -->
<h1>📈 Crypto Tracker</h1>

<p>
  <img src="https://github.com/jh-choi98/crypto-tracker/actions/workflows/react.yml/badge.svg" alt="React CI" />
</p>

<p>
  Real‑time cryptocurrency dashboard built with React + TypeScript
</p>

<p align="center">
  <a href="https://jh-choi98.github.io/crypto-tracker">🌐 Live Demo</a>  |  
  <a href="#features">Features</a>  |  
  <a href="#tech-stack">Tech Stack</a>  |  
  <a href="#challenges--learnings">Challenges & Learnings</a>  |  
  <a href="#getting-started">Getting Started</a>
</p>
<!-- --------------------------------------------------------------------- -->

## Why This Project Matters

- **Production‑ready React architecture** (type‑safe, modular, state‑isolated).
- **Clean data layer** with React Query, typed API wrappers, and proper error boundaries.
- **Dynamic charting** via ApexCharts, showcasing data‑driven UI skills.
- **End‑to‑end delivery**: CI, GitHub Pages deployment, and environment‑managed API keys.

---

## Features

|                      | Description                                                          |
| -------------------- | -------------------------------------------------------------------- |
| 🔍 Coin Explorer     | Market‑cap‑sorted list with icons, symbols, and live prices          |
| 📊 Detail View       | 24 h / 7 d OHLC & line charts, supply metrics, and price converters  |
| 💱 FX Converter      | RapidAPI currency exchange for instant USD ↔ KRW (or any currencies) |
| 🌗 Dark / Light Mode | Global theme toggle stored in Recoil atoms                           |
| ⚡ Real‑time Fetch   | React‑Query + Suspense loaders and automatic refetch intervals       |
| ✨ Responsiveness    | Mobile‑first layout using Styled‑Components                          |

---

## Tech Stack

| Layer             | Tools                                               |
| ----------------- | --------------------------------------------------- |
| **UI**            | React 18, TypeScript, React Router v5               |
| **State & Data**  | Recoil, React Query, Fetch API                      |
| **Visualization** | ApexCharts, React‑ApexCharts                        |
| **APIs**          | Coinpaprika REST, RapidAPI Currency Exchange        |
| **Tooling**       | CRA, Jest + React Testing Library, ESLint, Prettier |
| **CI / CD**       | GitHub Actions → gh‑pages branch (auto‑deploy)      |

---

## Challenges & Learnings

| Challenge                                                                        | Solution & Outcome                                                                                                       |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Multiple API rate limits** (Coinpaprika + RapidAPI) caused sporadic 429 errors | Implemented React Query caching + exponential back‑off; reduced external calls by **70 %** and eliminated runtime errors |
| **Chart flicker on theme toggle** due to ApexCharts re‑render                    | Memoized chart options & leveraged `useDarkMode` atom; switch now feels instantaneous                                    |
| **Type safety for dynamic REST responses**                                       | Wrote auto‑generated TypeScript interfaces via `quicktype`; caught 3 potential runtime bugs during dev                   |
| **Large bundle size (1.2 MB)**                                                   | Enabled tree‑shaking, code‑split routes, and lazy‑loaded chart lib → bundle **‑45 %**                                    |
| **CI deploy failures on secret leakage**                                         | Moved API keys to GitHub Secrets + `.env`; added Jest test to assert `process.env` keys exist before build               |

---

## Getting Started

### Prerequisites

    # .env
    REACT_APP_CURRENCY_API_KEY=YOUR_RAPIDAPI_KEY

### Local Development

    git clone https://github.com/jh-choi98/crypto-tracker.git
    cd crypto-tracker
    npm install
    npm start

### Production Build & Deploy

    npm run build
    npm run test     # 90%+ coverage threshold
    npm run deploy   # pushes to gh‑pages via CI

---

## Architecture in 30 Seconds

    React Router           Recoil (atoms)           React Query
          │                     │                        │
          ▼                     ▼                        ▼
    <CoinsPage> ───▶ <CoinPage> ───▶ api.ts ───▶  REST / RapidAPI
                                       │
                                       ▼
                               ApexCharts UI

---

## Folder Structure (excerpt)

    src/
     ├─ api.ts            # Typed REST wrappers
     ├─ atoms.ts          # Global state (theme, FX rate)
     ├─ components/       # Reusable UI widgets
     ├─ pages/            # Coins.tsx, Coin.tsx
     ├─ theme.ts          # Styled‑Components themes
     └─ tests/            # Unit + integration tests

---

## Roadmap

- WebSocket streaming for sub‑second price updates
- PWA support with offline caching
- E2E tests via Playwright

---

## License

MIT © 2025 Juho Choi
