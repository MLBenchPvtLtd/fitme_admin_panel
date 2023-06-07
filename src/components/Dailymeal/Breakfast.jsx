import React from 'react'

const Breakfast = ({ breakfast }) => {

    return (
        <div>
        
            <div className="text-center rounded-lg " style={{ backgroundColor: "#FBE3E6", alignItems: "center" }}>
                <p className="flex ">
                    <div style={{ minWidth:"10%"}}> <img className="px-2 py-2 h-10  w-10 rounded-full" src={breakfast.img_url} alt="" /></div>
                    <p className='text-xs px-2 pt-3'> {breakfast.name}</p>
                </p>
            </div>

        </div>
    )
}

export default Breakfast