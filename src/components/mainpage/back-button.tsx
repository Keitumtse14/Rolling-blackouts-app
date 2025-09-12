import React from 'react';
import { useRouter } from 'next/router';

const BackButton: React.FC = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium"
      aria-label="Go back"
    >
      <img
        src="/arrow-left-svgrepo-com.svg"
        alt="Back"
        width={24}
        height={24}
        className="mr-2"
      />
      Back
    </button>
  );
};

export default BackButton;
