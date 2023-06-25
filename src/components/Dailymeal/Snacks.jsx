import React from 'react'

const Snacks = ({snacksData}) => {
  return ( 

    <div>

    <div className="text-center rounded-lg " style={{ backgroundColor: "#E9E1D2", alignItems: "center" }}>
      <p className="flex ">
        <div style={{ minWidth: "10%" }}> <img style={{ width: "50px", height: "40px" }} className="px-2 py-2  rounded-full" src={snacksData.img_url} alt="" /></div>
        <p className='text-xs px-2 pt-3'> {snacksData.name}</p>
      </p>
    </div>
  </div>
  )
}

export default Snacks