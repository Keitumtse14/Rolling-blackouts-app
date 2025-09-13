
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { settingsRouter } from "./settings";
import { statusRouter } from "./status";

export const appRouter = router({
  example: exampleRouter,
  settings: settingsRouter,
  status: statusRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
