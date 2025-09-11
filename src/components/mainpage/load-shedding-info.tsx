import { useQuery } from '@tanstack/react-query';


function fetchStatus() {
  return fetch('http://localhost:8010/proxy/status', {
    headers: {
      "token": 'Your key',
    }
  }).then(res => res.json());
}

function LoadSheddingInfo() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['status'],
    queryFn: fetchStatus,
  });

  const statusData = data?.status?.eskom?.stage;
  const nextstageData = data?.status?.eskom?.next_stages?.[0]?.stage;
  const nextstageTimeData = data?.status?.eskom?.next_stages?.[0]?.stage_start_timestamp?.substring(11, 16);

  if (isLoading) {
    return <div className="mx-auto text-2xl">Loading...</div>;
  }
  if (error) {
    return <div className="mx-auto text-2xl text-red-600">Error loading data</div>;
  }
  return (
    <div className="flex">
      {statusData ? (
        <div className="h-40 w-40 bg-red-600 text-white rounded-full mx-auto hover:scale-125 relative transition duration-250">
          <div className="absolute left-5 top-4">
            <h1 className="text-xl text-center mb-6 ml-3">Stage {statusData}</h1>
            <div className="text-xs mb-8 ml-2 text-center">
              {nextstageData && nextstageData > 0 && (
                <div>Stage {nextstageData} starts {nextstageTimeData}</div>
              )}
            </div>
            <button className="text-xs ml-8">More info</button>
          </div>
        </div>
      ) : (
        <div className="mx-auto text-2xl">...</div>
      )}
    </div>
  );
}


export default LoadSheddingInfo
