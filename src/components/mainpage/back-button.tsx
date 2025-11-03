import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const BackButton: React.FC = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center px-4 py-2 rounded hover:scale-110"
      aria-label="Go back"
    >
      <Image
        src="/arrow-left-svgrepo-com.svg"
        alt="Back"
        width={24}
        height={24}
        className="mr-2 "
      />
      Back
    </button>
  );
};

export default BackButton;
