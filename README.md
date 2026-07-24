# Lakshay Yadav — Developer Portfolio

A modern, production-ready, minimalist developer portfolio built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Features interactive dot-grid canvas physics, sound effects, dark mode support, fingerprint-based global visitor counter, and centralized data configuration.

---

## 🚀 About Me

Hi, I'm **Lakshay Yadav**, a 21-year-old Computer Science & Engineering student and Full-Stack / Backend Developer passionate about building high-performance, scalable web applications. 

- 💻 **Stack**: React, Next.js, Node.js, Express.js, TypeScript, PostgreSQL, MongoDB, Redis
- 🌐 **Website**: [lakshayyadav.dev](https://lakshayyadav.dev)
- 🐙 **GitHub**: [@Lkshayyadav](https://github.com/Lkshayyadav)
- 💼 **LinkedIn**: [Lakshay Yadav](https://www.linkedin.com/in/lakshay-yadav-7141532a9/)
- 🐦 **Twitter**: [@LakshayYadav21](https://x.com/LakshayYadav21)

---

## ✨ Features

- **Decoupled Architecture**: All bio sections, socials, and project metadata are centralized under `src/data/` for zero-code-change maintainability.
- **Local Resume Downloads**: Serves resume PDF directly from `public/assets/resume/resume.pdf`.
- **Interactive Dot Grid**: Canvas liquid displacement physics reacting to cursor movement on outer page margins.
- **Global Visitor Counter**: Persistent visitor tracking powered by Neon PostgreSQL with automatic persistent microservice fallback (`CounterAPI`).
- **Floating Controls**: Integrated Command Palette (Ctrl+K), Theme Switcher (Dark/Light), UI Sound FX Toggle, and Scroll-to-Top dock.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm / pnpm / yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Lkshayyadav/Portfolio.git

# Navigate to project directory
cd Portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Project Structure

```text
├── public/
│   ├── assets/
│   │   ├── resume/
│   │   │   └── resume.pdf
│   │   └── images/
├── src/
│   ├── app/            # Next.js App Router & API endpoints
│   ├── components/     # UI Components & Interactive Canvas
│   ├── data/           # Data configuration files (bio, about, socials)
│   ├── hooks/          # Custom React hooks (Sound FX, etc.)
│   └── lib/            # Central config & Visitor DB logic
└── README.md
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
