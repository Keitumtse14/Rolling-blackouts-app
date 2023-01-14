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
        <svg

          width="15"
          height="15"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_150_30)">
            <path
              d="M6 0C2.69169 0 0 2.69146 0 6C0 9.30854 2.69169 12 6 12C9.30831 12 12 9.30854 12 6C12 2.69146 9.30831 0 6 0ZM6 11.5385C2.94623 11.5385 0.461538 9.05377 0.461538 6C0.461538 2.94623 2.94623 0.461538 6 0.461538C9.05377 0.461538 11.5385 2.94623 11.5385 6C11.5385 9.05377 9.05377 11.5385 6 11.5385Z"
              fill="black"
            />
            <path
              d="M8.88477 5.76923H6.23092V3.23077C6.23092 3.10315 6.12753 3 6.00015 3C5.87277 3 5.76938 3.10315 5.76938 3.23077V5.76923H3.11553C2.98815 5.76923 2.88477 5.87238 2.88477 6C2.88477 6.12762 2.98815 6.23077 3.11553 6.23077H5.76938V9C5.76938 9.12762 5.87277 9.23077 6.00015 9.23077C6.12753 9.23077 6.23092 9.12762 6.23092 9V6.23077H8.88477C9.01215 6.23077 9.11553 6.12762 9.11553 6C9.11553 5.87238 9.01215 5.76923 8.88477 5.76923Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_150_30">
              <rect width="12" height="12" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </button>}
  </>
}

export default AddArea