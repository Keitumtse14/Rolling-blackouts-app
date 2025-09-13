import { router, publicProcedure } from "../trpc";

let allowanceCache: { count: number; limit: number; resetTime: number } | null = null;

function getSouthAfricaMidnight() {
    const now = new Date();
    // South Africa is UTC+2
    const saNow = new Date(now.toLocaleString("en-US", { timeZone: "Africa/Johannesburg" }));
    saNow.setHours(0, 0, 0, 0);
    return saNow.getTime();
}

export const statusRouter = router({
    get: publicProcedure.query(async () => {
        const { env } = await import("../../../env/server.mjs");
        // Check/reset allowance cache
        const saMidnight = getSouthAfricaMidnight();
        if (!allowanceCache || Date.now() > allowanceCache.resetTime) {
            allowanceCache = null;
        }
        // If allowance is cached and limit reached, block request
        if (allowanceCache && allowanceCache.count >= allowanceCache.limit) {
            throw new Error("API request limit reached. Try again after midnight South African time.");
        }
        // Make status request
        const statusRes = await fetch("https://developer.sepush.co.za/business/2.0/status", {
            headers: {
                token: env.STATUS_API_TOKEN,
            },
        });
        const statusData = await statusRes.json();
        // Make allowance request
        const allowanceRes = await fetch("https://developer.sepush.co.za/business/2.0/api_allowance", {
            headers: {
                token: env.STATUS_API_TOKEN,
                Accept: "application/json",
            },
        });
        const allowanceData = await allowanceRes.json();
        // Cache allowance until next midnight
        allowanceCache = {
            count: allowanceData.allowance.count,
            limit: allowanceData.allowance.limit,
            resetTime: saMidnight + 24 * 60 * 60 * 1000,
        };
        // Log allowance info to console
        console.log(`API Allowance: ${allowanceData.allowance.count} / ${allowanceData.allowance.limit}`);
        return { status: statusData.status, allowance: allowanceData.allowance };
    }),
});
