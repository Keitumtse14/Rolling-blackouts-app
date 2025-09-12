import { z } from "zod";
import { router, publicProcedure } from "../trpc";

// Simulate persistent storage with an in-memory object (replace with DB in production)
let settingsState = {
    notificationEnabled: false,
    autoLocationEnabled: false,
    themeEnabled: false,
};

export const settingsRouter = router({
    get: publicProcedure.query(() => settingsState),
    set: publicProcedure
        .input(
            z.object({
                notificationEnabled: z.boolean(),
                autoLocationEnabled: z.boolean(),
                themeEnabled: z.boolean(),
            })
        )
        .mutation(({ input }) => {
            settingsState = { ...input };
            return settingsState;
        }),
});
