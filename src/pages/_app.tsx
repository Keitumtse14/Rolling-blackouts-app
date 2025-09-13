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
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export { ThemeContext };
export default trpc.withTRPC(MyApp);
