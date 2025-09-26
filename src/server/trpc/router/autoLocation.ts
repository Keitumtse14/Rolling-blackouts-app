// server/routers/autoLocation.ts
import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const autoLocationRouter = router({
    nearby: publicProcedure
        .input(
            z.object({
                lat: z.number(),
                lon: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            const res = await fetch(
                `https://developer.sepush.co.za/business/2.0/areas_nearby?lat=${input.lat}&lon=${input.lon}`,
                {
                    headers: { token: process.env.STATUS_API_TOKEN || "" },
                }
            );
            const result = await res.json();
            if (!result.areas || result.areas.length === 0)
                throw new Error("No areas found for your location.");
            const firstArea = result.areas[0];
            return { name: firstArea.name, region: firstArea.region };
        }),

    search: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(async ({ input }) => {
            const res = await fetch(
                `https://developer.sepush.co.za/business/2.0/areas_search?text=${encodeURIComponent(
                    input.text
                )}`,
                {
                    headers: { token: process.env.STATUS_API_TOKEN || "" },
                }
            );
            if (!res.ok) throw new Error("Failed to search areas");
            return res.json();
        }),
});
