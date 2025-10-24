import Image from 'next/image';
import SettingsIcon from './settings-icon';

type Props = {
    addAreaOpen: boolean;
    setAddAreaOpen: (v: boolean) => void;
};

export default function Header({ addAreaOpen, setAddAreaOpen }: Props) {
    return (
        <div className="w-full max-w-5xl mx-auto flex items-center justify-between pb-10">
            {/* Left: either back control (when modal open) or an empty spacer so spacing matches */}
            <div className="flex items-center">
                {addAreaOpen ? (
                    <button
                        onClick={() => setAddAreaOpen(false)}
                        aria-label="Close"
                        className="p-2 rounded hover:bg-gray-100 bg-transparent"
                    >
                        <Image src="/round-arrow-left-svgrepo-com.svg" alt="Back" width={40} height={40} />
                    </button>
                ) : (
                    <div className="w-10 h-10" />
                )}
            </div>

            {/* Right: settings gear */}
            <div className="flex items-center">
                <SettingsIcon />
            </div>
        </div>
    );
}
