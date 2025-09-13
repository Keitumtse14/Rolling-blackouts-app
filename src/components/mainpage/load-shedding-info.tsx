import { trpc } from '../../utils/trpc';



function LoadSheddingInfo() {
  const { data, isLoading, error } = trpc.status.get.useQuery();

  if (isLoading) return <div className="mx-auto text-2xl text-gray-500">Loading load shedding info...</div>;
  if (error) return <div className="mx-auto text-2xl text-red-500">Error loading info.</div>;
  return (
    <div className="mx-auto text-2xl text-gray-900 dark:text-gray-100">
      {data ? JSON.stringify(data) : "No data available."}
    </div>
  );
}


export default LoadSheddingInfo
