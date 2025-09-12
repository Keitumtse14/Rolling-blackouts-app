
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { settingsRouter } from "./settings";

export const appRouter = router({
  example: exampleRouter,
  settings: settingsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
