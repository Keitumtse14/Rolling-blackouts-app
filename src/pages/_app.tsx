import { type AppType } from "next/app";
import { trpc } from "../utils/trpc";
import "../styles/globals.css";
import React from "react";

const ThemeContext = React.createContext({ themeEnabled: false, setThemeEnabled: (_: boolean) => { } });

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeEnabled, setThemeEnabled] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = window.localStorage.getItem('themeEnabled');
    return stored === 'true';
  });
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('themeEnabled', themeEnabled.toString());
      const root = window.document.documentElement;
      if (themeEnabled) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [themeEnabled]);
  return (
    <ThemeContext.Provider value={{ themeEnabled, setThemeEnabled }}>
      {children}
    </ThemeContext.Provider>
  );
};

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      {/* Demo badge when running in mock/demo mode */}
      {process.env.NEXT_PUBLIC_MOCK_MODE === 'true' || process.env.MOCK_MODE === 'true' ? (
        <div style={{ position: 'fixed', right: 12, top: 12, zIndex: 60 }} className="bg-yellow-300 text-xs px-2 py-1 rounded">
          Demo Mode
        </div>
      ) : null}
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export { ThemeContext };
export default trpc.withTRPC(MyApp);
