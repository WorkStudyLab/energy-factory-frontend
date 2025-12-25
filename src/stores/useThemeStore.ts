import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "default" | "christmas";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleChristmas: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "christmas",
      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme);
      },
      toggleChristmas: () => {
        const newTheme = get().theme === "christmas" ? "default" : "christmas";
        set({ theme: newTheme });
        applyTheme(newTheme);
      },
    }),
    {
      name: "theme-storage",
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme);
        }
      },
    }
  )
);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("dark", "christmas");
  if (theme !== "default") {
    root.classList.add(theme);
  }
}
