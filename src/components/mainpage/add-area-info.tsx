import { useState } from 'react'
import MyModal from './modal'
import Image from 'next/image';


function AddArea() {

  const [addAreaToggle, setAddAreaToggle] = useState(false)

  return <>
    {addAreaToggle ? < MyModal /> : <button
      onClick={() => setAddAreaToggle(!addAreaToggle)}
      className="flex items-center mx-auto my-40 hover:scale-110">
      <span className="text-3xl font-bold">Add Area</span>
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