import { trpc } from '../../utils/trpc';



function LoadSheddingInfo() {
  const { data, isLoading, error } = trpc.status.get.useQuery();

  if (isLoading) return <div className="mx-auto text-2xl text-gray-500">Loading load shedding info...</div>;
  if (error) return <div className="mx-auto text-2xl text-red-500">Error loading info.</div>;
  return (
    <div className="mx-auto text-2xl text-gray-900 dark:text-gray-100">
      {data
        ? (
          <>
            {(() => {
              const updated = data?.status?.eskom?.stage_updated;
              if (!updated) return <div>N/A</div>;
              const updatedDate = new Date(updated);
              const now = new Date();
              const diffMs = now.getTime() - updatedDate.getTime();
              const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
              const diffWeeks = Math.floor(diffDays / 7);
              const diffMonths = Math.floor(diffDays / 30.44);
              const diffYears = Math.floor(diffDays / 365.25);

              let result = "";
              if (diffYears > 0) {
                result = `${diffYears} year${diffYears > 1 ? "s" : ""}`;
                const remMonths = diffMonths % 12;
                if (remMonths > 0) result += `, ${remMonths} month${remMonths > 1 ? "s" : ""}`;
              } else if (diffMonths > 0) {
                result = `${diffMonths} month${diffMonths > 1 ? "s" : ""}`;
                const remWeeks = diffWeeks % 4;
                if (remWeeks > 0) result += `, ${remWeeks} week${remWeeks > 1 ? "s" : ""}`;
              } else if (diffWeeks > 0) {
                result = `${diffWeeks} week${diffWeeks > 1 ? "s" : ""}`;
                const remDays = diffDays % 7;
                if (remDays > 0) result += `, ${remDays} day${remDays > 1 ? "s" : ""}`;
              } else {
                result = `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
              }
              return (
                <div className="flex flex-col items-center justify-center p-2 sm:p-4 rounded-lg bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 shadow max-w-xs w-full mx-auto">
                  <span className="text-base sm:text-lg font-semibold">No loadshedding for the past</span>
                  <span className="text-xl sm:text-3xl font-bold mt-2">{result}</span>
                </div>
              );
            })()}
          </>
        )
        : "No data available."}
    </div>
  );
}


export default LoadSheddingInfo
