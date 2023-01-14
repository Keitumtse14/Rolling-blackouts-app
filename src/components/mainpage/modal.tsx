import { useState } from 'react';
import AddAreaInfo from './add-area-info'

function MyModal() {
  const [isToggled, setIsToggled] = useState(false);
  const [searchResult, setSearchResult] = useState('')


  const handleEvent = async (event: KeyboardEvent) => {

    if (event.key === 'Enter') {

      const areasearch = searchResult

      try {
        const response = await fetch(`http://localhost:8010/proxy/areas_search?text=${areasearch}`, {
          method: 'GET',
          headers: {
            "token": "6088BC7E-D684456A-876D29F3-D6EABD4B"
          }
        });
        const data = await response.json()
        console.log(data);

      } catch (error) {

      }
    }
  }


  return <>
    {
      isToggled ? <AddAreaInfo /> : <div className='flex items-center justify-center'>
        <input
          className='border-solid border-black border-2 rounded mt-20 inline-block g'
          type="search"
          name="area-search"
          id="search"
          onChange={event => setSearchResult(event.target.value)}
          onKeyDown={handleEvent} />
        <button className=" ml-2 mt-[80px]" onClick={() => setIsToggled(!isToggled)}>X</button>
      </div>
    }
  </>



}

export default MyModal;