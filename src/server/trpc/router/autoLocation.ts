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
            if (process.env.MOCK_MODE === 'true') {
                const { mockAreas } = await import('../../../mocks/mockData');
                const areas = Array.isArray(mockAreas?.areas) ? mockAreas.areas : [];
                if (areas.length === 0) throw new Error('No mock areas available');
                const firstArea = areas[0];
                if (!firstArea) throw new Error('No mock area available');
                return { name: firstArea.name, region: firstArea.region };
            }
            const res = await fetch(
                `https://developer.sepush.co.za/business/2.0/areas_nearby?lat=${input.lat}&lon=${input.lon}`,
                {
                    headers: { token: process.env.STATUS_API_TOKEN || "" },
                }
            );
            const result = await res.json();
            const areas = Array.isArray(result?.areas) ? result.areas : [];
            if (areas.length === 0) throw new Error("No areas found for your location.");
            const firstArea = areas[0];
            if (!firstArea) throw new Error("No area available from API result");
            return { name: firstArea.name, region: firstArea.region };
        }),

    search: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(async ({ input }) => {
            if (process.env.MOCK_MODE === 'true') {
                const { mockAreas } = await import('../../../mocks/mockData');
                return mockAreas;
            }
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
