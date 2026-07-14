<div align="center">

# Portfolio — Shoaib Jamadar

**AI & ML Student · Computer Vision · Multi-Agent Systems · Full-Stack**

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-s7oaib.vercel.app)
[![LinkedIn](https://img.shields.io/badge/💼_LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/shoaib-jamadar77/)
[![Email](https://img.shields.io/badge/✉️_Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:s7oaibjamadar@gmail.com)

</div>

---

## About This Portfolio

A modern, responsive portfolio website built to showcase my projects, skills, and experience as an AI & Machine Learning student. The site features a clean light theme with emerald and blue accents, smooth animations, and real-time GitHub integration.

**Live URL:** [portfolio-s7oaib.vercel.app](https://portfolio-s7oaib.vercel.app)

---

## How It Works

### Architecture

```
Portfolio/
├── src/
│   ├── App.tsx              # Main React component with all sections
│   ├── index.css            # Global styles, theme, animations
│   ├── main.tsx             # React entry point
│   ├── data/
│   │   └── profileData.ts   # Profile data (skills, experience, socials)
│   └── utils/
│       └── github.ts        # GitHub API integration
├── public/                  # Static assets (icons, resume PDF)
├── index.html               # HTML entry point
├── vite.config.ts           # Vite configuration
└── package.json             # Dependencies
```

### Key Features

| Feature | Description |
|---------|-------------|
| **GitHub API Integration** | Fetches repositories in real-time, displays stars, languages, and topics |
| **Framer Motion Animations** | Smooth scroll reveals, stagger effects, skill bar fills, and card hover states |
| **Responsive Design** | Fully responsive across desktop, tablet, and mobile devices |
| **Glassmorphism UI** | Modern frosted glass effect on cards and header |
| **Project Filtering** | Filter repositories by programming language with search functionality |
| **Contact Form** | Interactive contact form with validation |
| **Resume Download** | Direct PDF download link |

### Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 19, TypeScript, Vite |
| **Styling** | CSS3 (Custom Properties, Glassmorphism) |
| **Animations** | Framer Motion |
| **API** | GitHub REST API |
| **Deployment** | Vercel |

### Sections

1. **Hero** — Introduction with name, title, bio, and quick links
2. **Projects** — Live GitHub repos with filtering and search
3. **Skills** — Technical skills organized by category with progress bars
4. **Experience** — Professional timeline with roles and achievements
5. **Contact** — Contact form and social links

---

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/s7oaib/Portfolio.git

# Navigate to project directory
cd Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

### Other Platforms

The project builds to static files in `dist/`, so it can be deployed anywhere that serves static sites (Netlify, GitHub Pages, Cloudflare Pages, etc.)

---

## Customization

Edit `src/data/profileData.ts` to update:

- Personal information (name, title, bio)
- Skills and categories
- Work experience
- Social links
- Resume URL

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

![Profile Views](https://komarev.com/ghpvc/?username=s7oaib&color=blueviolet&style=flat-square&label=Profile+Views)

</div>
