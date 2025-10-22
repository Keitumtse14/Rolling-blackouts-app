import { useRef, useState } from 'react';
import Image from 'next/image';
import { trpc } from '../../utils/trpc';

// Modal no longer renders its own back control; header is responsible for back/gear layout.
function MyModal({ onClose }: { onClose?: () => void }) {
  const [searchResult, setSearchResult] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const debounceRef = useRef<number | null>(null);
  const [isFocused, setIsFocused] = useState(false);
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

  // Debounce without useEffect: schedule setDebouncedTerm from input handler
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    debounceRef.current = window.setTimeout(() => {
      setDebouncedTerm(value);
    }, 350) as unknown as number;
  };

  const searchQuery = trpc.autoLocation.search.useQuery({ text: debouncedTerm }, { enabled: !!debouncedTerm });
  const { data, isLoading, error } = searchQuery;

  // Keyboard navigation for results
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const resultsCount = Array.isArray(data?.areas) ? data.areas.length : 0;

  const handleEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // commit immediate search
      setSearchTerm(searchResult);
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      setDebouncedTerm(searchResult);
    }
  };

  return (
    <>
      <div className="relative flex flex-col items-center justify-center">
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

        <div className="flex items-center justify-center w-full">
            <input
              className="border-solid border-black border-2 rounded mt-20 inline-block px-2 py-1 w-full max-w-md md:max-w-lg lg:max-w-xl"
            type="search"
            name="area-search"
            id="search"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleEvent}
            aria-label="Search area"
          />
        </div>

        <div className="w-full">
          <div className="sr-only" aria-live="polite">
            {isLoading ? 'Searching...' : resultsCount ? `${resultsCount} results` : ''}
          </div>

          <div className="search-results mt-4">
            {isLoading && debouncedTerm ? (
              <div className="space-y-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-12 bg-gray-200 animate-pulse rounded" />
                ))}
              </div>
            ) : error ? (
              <div className="text-red-600">{error instanceof Error ? error.message : 'Error searching'}</div>
            ) : data ? (
              <div role="list" className="space-y-2">
                {data.areas.map((a: any, idx: number) => (
                  <button
                    key={a.id || idx}
                    role="listitem"
                    ref={(el) => (itemRefs.current[idx] = el)}
                    className={`w-full text-left p-2 rounded hover:bg-gray-100 ${activeIndex === idx ? 'bg-blue-50' : ''}`}
                    onClick={() => setSearchResult(a.name)}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown') {
                        const next = Math.min(resultsCount - 1, idx + 1);
                        setActiveIndex(next);
                        itemRefs.current[next]?.focus();
                      } else if (e.key === 'ArrowUp') {
                        const prev = Math.max(0, idx - 1);
                        setActiveIndex(prev);
                        itemRefs.current[prev]?.focus();
                      } else if (e.key === 'Enter') {
                        setSearchResult(a.name);
                      }
                    }}
                    tabIndex={0}
                  >
                    <div className="font-semibold">{a.name}</div>
                    <div className="text-xs text-gray-600">{a.region}</div>
                  </button>
                ))}
              </div>
            ) : (
              debouncedTerm ? (
                <div className="text-sm text-gray-500">No results</div>
              ) : (
                !isFocused ? (
                  <div className="text-sm text-gray-400">Type to search areas (e.g. 'Cape Town')</div>
                ) : null
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyModal;
