import { router, publicProcedure } from "../trpc";

export const statusRouter = router({
    get: publicProcedure.query(async () => {
        // Replace with your actual fetch logic or proxy
        const { env } = await import("../../../env/server.mjs");
        const res = await fetch("https://developer.sepush.co.za/business/2.0/status", {
            headers: {
                token: env.STATUS_API_TOKEN,
            },
        });
        return res.json();
    }),
});
