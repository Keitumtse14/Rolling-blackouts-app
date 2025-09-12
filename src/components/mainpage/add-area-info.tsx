import { useState } from 'react'
import MyModal from './modal'


function AddArea() {

  const [addAreaToggle, setAddAreaToggle] = useState(false)

  return <>
    {addAreaToggle ? < MyModal /> : <button
      onClick={() => setAddAreaToggle(!addAreaToggle)}
      className="flex items-center mx-auto my-40 hover:scale-110">
      Add Area
      <div className="ml-2 mt-1">
        <img
          src="/add-circle-svgrepo-com.svg"
          alt="Add Area"
          width={15}
          height={15}
        />
      </div>
    </button>}
  </>
}

export default AddArea