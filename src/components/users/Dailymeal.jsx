import React, { useState, useEffect } from 'react'
import imgbreakfast from '../../assets/img/breakfast.png'
import 'firebase/database';
import { dbase } from '../../firebase'
import { getDatabase, ref, query, get, child } from 'firebase/database';
const Dailymeal = () => {

    const [breakfastData, setBreakfastData] = useState(null);
    const [lunchData, setLunchData] = useState(null);
 
    useEffect(() => {
        getCurrentDateMeals();
    }, []);

    const getCurrentDateMeals = async () => {
        const currentDate =  ["05-12-2023", "04-12-2023", "12-12-2022", "12-18-2022", "12-26-2022", "12-27-2022"];
        const breakfastPath = `//meal_planner/0eg0luUa0gdViAxx3NvkPYKSoVZ2/Breakfast/05-14-2023/-NJnMKWqckaeBKCvq_2u`;
        const lunchPath = `meal_planner/0eg0luUa0gdViAxx3NvkPYKSoVZ2/Lunch/${currentDate}`;
      
        const db = getDatabase();
      
        // Fetch breakfast data
        const breakfastRef = query(ref(db, breakfastPath));
        const breakfastSnapshot = await get(breakfastRef);
        const breakfastData = breakfastSnapshot.exists() ? breakfastSnapshot.val() : null;
        console.log(breakfastData, "breakfastData");
        setBreakfastData(breakfastData);
      
        // Fetch lunch data
        const lunchRef = query(ref(db, lunchPath));
        const lunchSnapshot = await get(lunchRef);
        const lunchData = lunchSnapshot.exists() ? lunchSnapshot.val() : null;
        console.log(lunchData, "lunchData");
        setLunchData(lunchData);
      };
    return (
        <div>

            <div className="rounded-lg mb-4" style={{ backgroundColor: "white" }}>
                <div className="py-5 px-5 ">
                    <div className="flex justify-between"> <h2 className="mb-3">Breakfast</h2> <p className="text-xs mt-1" style={{ color: "#D8808C" }}>Total kcal</p></div>
                    <div className="grid grid-cols-2">
                        {breakfastData && (
                            <div className="text-center rounded-lg " style={{ backgroundColor: "#FBE3E6", alignItems: "center" }}>
                                <p className="flex ">
                                    <div> <img className="px-2 py-2 h-10  w-10 rounded-full" src={breakfastData.img_url} alt="" /></div>
                                    <p className='text-xs px-2 pt-3'> {breakfastData.name}</p>
                                </p>
                            </div>
                        )}



                    </div>
                </div>
            </div>
            {/* lunch */}
            <div className="rounded-lg mb-4" style={{ backgroundColor: "white" }}>
                <div className="py-5 px-5 ">
                    <div className="flex justify-between"> <h2 className="mb-3">Lunch</h2> <p className="text-xs mt-1" style={{ color: "#6EC1C1" }}>Total kcal</p></div>
                    <div className="grid grid-cols-2">
                    {lunchData && (
                            <div className="text-center rounded-lg " style={{ backgroundColor: "#CFEEEE", alignItems: "center" }}>
                                <p className="flex ">
                                    <div> <img className="px-2 py-2 h-10  w-10 rounded-full" src={lunchData.img_url} alt="" /></div>
                                    <p className='text-xs px-2 pt-3'> {lunchData.name}</p>
                                </p>
                            </div>
                        )}
                   
                    </div>
                </div>
            </div>
            {/* dinner */}
            <div className="rounded-lg mb-4" style={{ backgroundColor: "white" }}>
                <div className="py-5 px-5 ">
                    <div className="flex justify-between"> <h2 className="mb-3">Dinner</h2> <p className="text-xs mt-1 " style={{ color: "#BBAD92" }}>Total kcal</p></div>
                    <div className="grid grid-cols-2">
                        <div className="text-center rounded-lg " style={{ backgroundColor: "#E9E1D2", alignItems: "center" }}>
                            <p className="flex ">
                                <div> <img className="px-2 py-2" src={imgbreakfast} alt="" /></div>
                                <p className='text-xs pt-3 px-2'> Slice+Egg Breakfast</p>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* snack */}
            <div className="rounded-lg mb-4" style={{ backgroundColor: "white" }}>
                <div className="py-5 px-5 ">
                    <div className="flex justify-between "> <h2 className="mb-3">Snack</h2> <p className="text-xs mt-1" style={{ color: "#939CAD" }}>Total kcal</p></div>
                    <div className="grid grid-cols-2">
                        <div className="text-center rounded-lg " style={{ backgroundColor: "#CFD5E2", alignItems: "center" }}>
                            <p className="flex ">
                                <div> <img className="px-2 py-2" src={imgbreakfast} alt="" /></div>
                                <p className='text-xs px-2 pt-3'> Slice+Egg Breakfast</p>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dailymeal