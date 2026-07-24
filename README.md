<div align="center">

<img src="./logo_k.png" alt="Keraunos Logo" width="120" />

# ⚡ KERAUNOS
### Interactive Canvas Reveal Experience

A high-end, immersive landing experience blending modern web aesthetics with a custom dual-layer mouse spotlight reveal effect.

[![Live Demo](https://img.shields.io/badge/demo-live-F97316?style=for-the-badge)](https://keraunos.ai.studio/)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

</div>

---

## 🖼️ Preview

<div align="center">
  <img src="./preview_k.png" alt="Keraunos Preview" width="100%" />
</div>

🔗 **Live Link:** [keraunos.ai.studio](https://keraunos.ai.studio/)

---

## ✨ Key Features

- **⚡ Interactive Canvas Spotlight Reveal** — Dual-layer hero section using HTML5 Canvas radial gradients to reveal golden lightning artwork (`a2.png`) over a base marble statue artwork (`a1.png`), tracking mouse coordinates in real time.
- **🎯 Custom Spring Cursor** — Smooth spring-animated pointer cursor (`CustomCursor.tsx`) that dynamically scales and adapts based on interactive elements.
- **🃏 3D Tilt Feature Cards** — Interactive cards (`Card3D.tsx`) with real-time perspective tilting and light-reflection tracking on hover.
- **🎬 High-Definition Video Reel** — Fullscreen background video integration (`chariot.mp4`) with a modal video player showcase (`ChariotReel.tsx`).
- **📊 Animated Stat Counters** — Scroll-triggered numeric counter animations (`StatCounter.tsx`) showcasing key metrics and specifications.
- **🛠️ Craftsmanship Timeline** — Step-by-step interactive timeline (`ProcessTimeline.tsx`) detailing structural execution and process.
- **💼 Drawer & Detail Modals** — Custom popups for artifact specifications (`DetailModal.tsx`) and consultation inquiries (`ContactModal.tsx`).

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Build Tool | Vite |
| Frontend Library | React & React DOM |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Graphics | HTML5 Canvas (mask spotlight math) |

---

## 📁 Repository Structure

```text
keraunos-reveal/
├── public/
│   ├── a1.png                # Base marble statue artwork (Hero layer)
│   ├── a2.png                # Gold lightning artwork (Hero spotlight reveal layer)
│   └── chariot.mp4           # High-definition video background reel
├── src/
│   ├── components/
│   │   ├── Card3D.tsx          # Interactive 3D tilt feature cards
│   │   ├── ChariotReel.tsx     # Fullscreen video modal & video player showcase
│   │   ├── ContactModal.tsx    # Consultation / contact inquiry drawer modal
│   │   ├── CustomCursor.tsx    # Smooth spring-animated custom pointer cursor
│   │   ├── CustomSelect.tsx    # Custom styled dropdown select selector
│   │   ├── DetailModal.tsx     # Artifact specifications & story detail view modal
│   │   ├── ProcessTimeline.tsx # Step-by-step craftsmanship timeline component
│   │   ├── RevealLayer.tsx     # Canvas radial-gradient spotlight cursor reveal effect
│   │   └── StatCounter.tsx     # Scroll-triggered animated numeric counters
│   ├── App.tsx               # Main application layout, state orchestrator, & mouse tracking
│   ├── index.css             # Global Tailwind CSS styles & typography directives
│   ├── main.tsx              # React application entry point
│   └── types.ts              # Shared TypeScript interface definitions
├── .env.example             # Environment variables blueprint
├── .gitignore                # Git ignore rules configuration
├── index.html                # HTML entry document
├── metadata.json             # Application metadata & frame permissions configuration
├── package.json               # Project dependencies and build scripts
├── README.md                  # Project documentation & architecture overview
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite bundler configuration
```

---

## 🚀 Getting Started

Run this project locally:

**1. Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/keraunos-reveal.git
cd keraunos-reveal
```

**2. Install dependencies**
```bash
npm install
# or
yarn install
```

**3. Configure environment variables (optional)**
```bash
cp .env.example .env
```

**4. Start the development server**
```bash
npm run dev
# or
yarn dev
```

**5. Open in browser**

Navigate to `http://localhost:5173` (or the local URL printed in your terminal).

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<div align="center">

`react` • `typescript` • `tailwind-css` • `vite` • `canvas-api` • `interactive-ui` • `3d-card` • `hover-effect` • `ui-ux` • `landing-page`

</div>
