// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  // ✅ Internationalization (i18n)
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

  // ✅ ESLint (optional: only check on production build)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ TypeScript (optional: allow production build even with type errors)
  typescript: {
    ignoreBuildErrors: false, // set to true if you want builds to pass despite TS errors
  },

  // ✅ Experimental features (add only if you need them)
  // experimental: {
  //   turbo: true, // Next 15 supports Turbopack
  // },

  // ✅ PWA setup (requires `next-pwa` package)
  // pwa: {
  //   dest: "public",
  //   disable: process.env.NODE_ENV === "development",
  // },

  // ✅ Output options (useful for Docker/Static builds)
  // output: "standalone", // uncomment if you're deploying with Docker
};

export default config;
