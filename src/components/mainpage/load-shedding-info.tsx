import { useQuery } from '@tanstack/react-query';


function fetchStatus() {
  // return fetch('http://localhost:8010/status', {
  //   headers: {
  //     "token": 'Your key',
  //   }
  // }).then(res => res.json());
}

function LoadSheddingInfo() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['status'],
    queryFn: fetchStatus,
  });

  // When fetch is commented out, show a placeholder message
  return (
    <div className="mx-auto text-2xl text-gray-500">Load shedding info is currently disabled.</div>
  );
}


export default LoadSheddingInfo
