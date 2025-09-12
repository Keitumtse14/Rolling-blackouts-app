import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AddAreaInfo from './add-area-info'

function MyModal() {
  const [isToggled, setIsToggled] = useState(false);
  const [searchResult, setSearchResult] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['area-search', searchTerm],
    queryFn: async () => {
      if (!searchTerm) return null;
      const response = await fetch(`http://localhost:8010/areas_search?text=${searchTerm}`, {
        headers: {
          "token": "Your key"
        }
      });
      return response.json();
    },
    enabled: !!searchTerm,
  });

  const handleEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchTerm(searchResult);
    }
  };


  return (
    <>
      {isToggled ? (
        <AddAreaInfo />
      ) : (
        <div className='flex items-center justify-center'>
          <input
            className='border-solid border-black border-2 rounded mt-20 inline-block g'
            type="search"
            name="area-search"
            id="search"
            onChange={event => setSearchResult(event.target.value)}
            onKeyDown={handleEvent}
          />
          <button className=" ml-2 mt-[80px]" onClick={() => setIsToggled(!isToggled)}>X</button>
        </div>
      )}
      {/* Show area search results */}
      {isLoading && searchTerm && <div className="mx-auto text-2xl">Searching...</div>}
      {error && searchTerm && <div className="mx-auto text-2xl text-red-600">Error searching</div>}
      {data && searchTerm && (
        <div className="mx-auto text-xs mt-4">{JSON.stringify(data)}</div>
      )}
    </>
  );
}

export default MyModal;
