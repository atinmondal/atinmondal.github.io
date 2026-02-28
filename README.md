# atinmondal.github.io

Personal portfolio website built with React, Tailwind CSS, Framer Motion, and Three.js.

Includes an AI chatbot assistant powered by Google Gemini (free tier).

## Local Development

```bash
npm install
npm run dev
```

## AI Chatbot Setup

1. Get a free API key from https://aistudio.google.com
2. Create a `.env` file in the root:
   ```
   VITE_GEMINI_API_KEY=your_key_here
   ```
3. For production, add `VITE_GEMINI_API_KEY` as a GitHub repository secret

## Deployment

Automated via GitHub Actions on push to `main`. Requires:
- GitHub Pages source set to **GitHub Actions** (Settings > Pages)
- `VITE_GEMINI_API_KEY` added as a repository secret (Settings > Secrets)

## Tech Stack

- React 18 + Vite 5
- Tailwind CSS 3
- Framer Motion (animations)
- Three.js (particle background)
- Google Gemini API (AI chatbot)
- GitHub Actions (CI/CD)
