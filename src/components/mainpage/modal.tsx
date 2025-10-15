import { useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../../utils/trpc';
import AddAreaInfo from './add-area-info';

function MyModal() {
  const [isToggled, setIsToggled] = useState(false);
  const [searchResult, setSearchResult] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [autoLocationLoading, setAutoLocationLoading] = useState(false);
  const [autoLocationError, setAutoLocationError] = useState('');
  const [autoLocationArea, setAutoLocationArea] = useState<null | { name: string; region: string }>(null);
  const autoLocationMutation = trpc.autoLocation.nearby.useMutation();

  const handleAutoLocation = () => {
    setAutoLocationLoading(true);
    setAutoLocationError('');
    setAutoLocationArea(null);
    if (!navigator.geolocation) {
      setAutoLocationError('Geolocation is not supported by your browser.');
      setAutoLocationLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      try {
        const res = await autoLocationMutation.mutateAsync({ lat, lon });
        if (res && res.name) {
          setAutoLocationArea({ name: res.name, region: res.region });
        } else {
          setAutoLocationError('No areas found for your location.');
        }
      } catch (err: any) {
        setAutoLocationError(err?.message || 'Failed to fetch area for your location.');
      }
      setAutoLocationLoading(false);
    }, (error) => {
      setAutoLocationError('Unable to retrieve your location.');
      setAutoLocationLoading(false);
    });
  };

  const searchQuery = trpc.autoLocation.search.useQuery(
    { text: searchTerm },
    { enabled: !!searchTerm }
  );
  const { data, isLoading, error } = searchQuery;

  const handleEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearchTerm(searchResult);
    }
  };

  return (
    <>
      {isToggled ? (
        <AddAreaInfo />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <button
            className="flex items-center px-3 py-2 mb-2 border border-gray-300 rounded hover:bg-gray-100"
            onClick={handleAutoLocation}
            aria-label="Detect location"
            disabled={autoLocationLoading}
          >
            <Image
              src="/map-point-search-svgrepo-com.svg"
              alt="Detect location"
              width={24}
              height={24}
              className="mr-2"
            />
            {autoLocationLoading ? "Detecting..." : "Auto Location"}
          </button>

          {autoLocationError && (
            <div className="mx-auto text-xs text-red-600 mb-2">
              {autoLocationError}
            </div>
          )}

          {autoLocationArea && (
            <div className="mx-auto text-xs text-green-700 mb-2">
              Closest Area:{" "}
              <span className="font-semibold">{autoLocationArea.name}</span>
              <br />
              <span>{autoLocationArea.region}</span>
            </div>
          )}

          <div className="flex items-center justify-center">
            <input
              className="border-solid border-black border-2 rounded mt-20 inline-block g"
              type="search"
              name="area-search"
              id="search"
              onChange={(e) => setSearchResult(e.target.value)}
              onKeyDown={handleEvent}
            />
            <button
              className="ml-2 mt-[80px]"
              onClick={() => setIsToggled(!isToggled)}
              aria-label="Close"
            >
              <Image
                src="/close-circle-svgrepo-com.svg"
                alt="Close"
                width={16}
                height={16}
                className="min-w-[1rem] min-h-[1rem]"
              />
            </button>
          </div>

          {isLoading && <div className="mx-auto text-2xl mb-2">Searching...</div>}
          {error && (
            <div className="mx-auto text-2xl text-red-600 mb-2">
              {error instanceof Error ? error.message : "Error searching"}
            </div>
          )}

          {data && (
            <div className="mx-auto text-xs mt-4">
              {typeof data === "string" || typeof data === "number"
                ? String(data)
                : JSON.stringify(data)}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default MyModal;
