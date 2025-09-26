import { useQuery, useQueryClient } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";

export function useAutoLocation() {
    const queryClient = useQueryClient();

    // 1️⃣ Client-side localStorage for auto-location preference
    const { data: autoLocationEnabled = false } = useQuery({
        queryKey: ["auto-location-enabled"],
        queryFn: () => {
            if (typeof window === "undefined") return false;
            return window.localStorage.getItem("autoLocationEnabled") === "true";
        },
    });

    // 2️⃣ Client-side persisted area
    const { data: persistedArea } = useQuery({
        queryKey: ["auto-location-area"],
        queryFn: () => {
            if (typeof window === "undefined") return null;
            const stored = window.localStorage.getItem("autoLocationArea");
            return stored ? JSON.parse(stored) : null;
        },
    });

    // 3️⃣ Server-side mutation to get nearby area via tRPC
    const autoLocationMutation = trpc.autoLocation.nearby.useMutation({
        onSuccess: (area) => {
            // Persist to localStorage
            if (typeof window !== "undefined") {
                window.localStorage.setItem("autoLocationArea", JSON.stringify(area));
            }
            // Update React Query cache
            queryClient.setQueryData(["auto-location-area"], area);
        },
    });

    // 4️⃣ Handler to trigger geolocation + mutation
    const handleAutoLocation = () => {
        if (!navigator.geolocation) {
            autoLocationMutation.reset();
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                autoLocationMutation.mutate({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            },
            () => {
                autoLocationMutation.reset();
            }
        );
    };

    return {
        autoLocationEnabled,
        autoLocationLoading: autoLocationMutation.isLoading,
        autoLocationError:
            autoLocationMutation.error instanceof Error
                ? autoLocationMutation.error.message
                : "",
        autoLocationArea: autoLocationMutation.data ?? persistedArea,
        handleAutoLocation,
    };
}
