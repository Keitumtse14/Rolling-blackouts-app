import React from 'react'

function LoadSheddingInfo() {
  return (
    <div className="flex">
      <div className=" text-xs my-auto mx-auto">
        <div> Vosloorus Ext 8</div>
        <div>
          <div> Eskom Direct </div>
          <div>Power Off 12:00 - 16:00</div>
        </div>
      </div>
      <div className="h-40 w-40 bg-red-500 text-white rounded-full mx-auto hover:scale-125 relative">
        <div className="absolute left-5 top-4">
          <h1 className="text-xl text-center mb-6">Stage 6</h1>
          <div className="text-xs text-center mb-8">
            Stage 5 starts tomorrow
          </div>
          <button className="text-xs ml-8">More info</button>
        </div>
      </div>
    </div>
  )
}

export default LoadSheddingInfo