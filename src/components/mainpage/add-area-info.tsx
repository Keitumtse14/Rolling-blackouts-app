import MyModal from './modal'
import Image from 'next/image';

type Props = {
  addAreaOpen: boolean;
  setAddAreaOpen: (v: boolean) => void;
};

function AddArea({ addAreaOpen, setAddAreaOpen }: Props) {
  return <>
    {addAreaOpen ? <MyModal onClose={() => setAddAreaOpen(false)} /> : <button
      onClick={() => setAddAreaOpen(true)}
      className="flex items-center mx-auto hover:scale-110">
      <span className="text-3xl font-bold ">Add Area</span>
      <div className="ml-4">
        <Image
          src="/add-circle-svgrepo-com.svg"
          alt="Add Area"
          width={40}
          height={40}
        />
      </div>
    </button>}
  </>
}

export default AddArea