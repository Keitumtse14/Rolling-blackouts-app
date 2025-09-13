import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#fff" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div id="next" className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  );
}