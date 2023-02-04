# An app to keep track of the rolling blackouts in my area using Next.js, Next-PWA, TypeScript, and Tailwind.

Unfortunately API limitations prevent hosting it

## runnning it locally

1. Clone the repo
2. Install the dependencies
3. go to https://eskomsepush.gumroad.com/l/api?layout=profile and subscribe for the free teir
4. Once you get the API token emailed to you, go to load-shedding-info.tsx and modal.tsx
5. Add the token key to the `"token": YOUR_TOKEN_KEY` in the fetch requests in both the components
6. Make sure the proxy server dependency is installed
7. Start the proxy server with the following command `lcp --proxyUrl https://developer.sepush.co.za/business/2.0`
8. Npm run build then npm run start
