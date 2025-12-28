# Pragati – Agentic Workspace

Pragati is a web-based AI operating surface that lets you orchestrate autonomous goals, capture reasoning traces, and interact with a conversational agent in Hindi or English. The interface is optimised for Vercel deployment and ships with a resilient fallback mode when no OpenAI API key is configured.

## Features
- Agentic chat loop with mission-aware goals and contextual suggestions
- Structured goal rail to track pending, active, blocked, and completed objectives
- Tailwind-powered responsive UI with dark-friendly palette
- Optional OpenAI integration (Responses API) with graceful degradation when the key is missing

## Quickstart
```bash
npm install
npm run dev
```

Visit `http://localhost:3000` and issue directives to Pragati. When an `OPENAI_API_KEY` environment variable is present, the backend will use the OpenAI Responses API (`gpt-4.1-mini`). Without it, a deterministic planning heuristic keeps the experience usable.

## Environment
Copy `.env.example` to `.env.local` and set your OpenAI credentials if available:
```bash
cp .env.example .env.local
```

## Scripts
- `npm run dev` – start the Next.js development server
- `npm run build` – generate the production build
- `npm run start` – run the production server
- `npm run lint` – lint the project
- `npm run type-check` – run TypeScript without emitting output

## Deployment
This project targets Vercel. Once dependencies are installed and tests pass, deploy with:
```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-e9f8cda2
```

## Project Structure
```
app/                 # Next.js app directory
  api/agent/         # Agent reasoning endpoint
  components/        # UI building blocks
  globals.css        # Tailwind layer definitions
lib/                 # Runtime helpers and data types
```

## License
MIT © 2024 Pragati Agent Workspace
