Demo deployment (mock-mode)
===========================

This branch contains a demo/deployment configuration that runs the app in mock-mode (no external API token required).

How it works
- `vercel.json` sets `MOCK_MODE=true` for build and runtime, so the app serves mock data from `src/mocks/mockData.ts`.

Deploy to Vercel
1. Push the `demo` branch to your Git provider.
2. Import the repo in Vercel and select the `demo` branch for deployment.
3. The Vercel project will pick up `MOCK_MODE=true` from `vercel.json` and the build should succeed without `STATUS_API_TOKEN`.

If you prefer to manage envs in Vercel settings, set `MOCK_MODE=true` in Project → Settings → Environment Variables for Production and Preview.
