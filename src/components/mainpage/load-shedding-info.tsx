import { useState, useEffect, useRef } from 'react';

function LoadSheddingInfo() {
  const [statusData, setStatusData] = useState(null)
  const [nextstageData, setnextstageData] = useState(null)
  const [nextstageTimeData, setnextstageTimeData] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const isInitialMount = useRef(true);

  console.log(isLoading);

  useEffect(() => {
    if (!isInitialMount.current) return;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:8010/proxy/status', {
          headers: {
            "token": 'Your key',
          }
        });

        const status = await response.json();
        setStatusData(status?.status?.eskom?.stage)
        setnextstageData(status?.status?.eskom?.next_stages[0].stage)
        setnextstageTimeData(status?.status?.eskom?.next_stages[0].stage_start_timestamp.substring(11, 16))

      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    isInitialMount.current = false;
  }, []);

  return (
    <div className="flex">
      {(statusData) ? <div className="h-40 w-40 bg-red-600 text-white rounded-full mx-auto hover:scale-125 relative transition duration-250">
        <div className="absolute left-5 top-4">
          <h1 className="text-xl text-center mb-6 ml-3">Stage {statusData}</h1>
          <div className="text-xs mb-8 ml-2 text-center">
            {nextstageData && nextstageData > 0 && <div>Stage {nextstageData} starts {nextstageTimeData}</div>}
          </div>
          <button className="text-xs ml-8">More info</button>
        </div>
      </div> : <div className="mx-auto text-2xl ">...</div>}
    </div>
  );
}


export default LoadSheddingInfo
