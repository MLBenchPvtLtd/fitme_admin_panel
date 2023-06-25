import React, { useState, useEffect } from 'react'
import imgbreakfast from '../../assets/img/breakfast.png'
import 'firebase/database';
import Breakfast from '../../components/Dailymeal/Breakfast'
import Lunch from '../../components/Dailymeal/Lunch'
import Dinner from '../../components/Dailymeal/Dinner'
import Snacks from '../../components/Dailymeal/Snacks'
import { dbase } from '../../firebase'
import { getDatabase, ref, query, get, child } from 'firebase/database';

const Dailymeal = ({ selected_user_id_selection }) => {

    const [breakfastData, setBreakfastData] = useState([]);
    const [lunchData, setLunchData] = useState([]);
    const [dinnerData, setDinnerData] = useState([]);
    const [snacksData, setSnacksData] = useState([]);


    const getCurrentDateMeals = async () => {
        const currentDate = new Date();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 and padding with '0' if necessary
        const day = String(currentDate.getDate()).padStart(2, '0'); // Padding with '0' if necessary
        const year = currentDate.getFullYear();
        const formattedDate = `${month}-${day}-${year}`;

        console.log(formattedDate); // Log the current date as a string in the format "06-24-2023"

        const breakfastPath = `/meal_planner/${selected_user_id_selection}/breakfast/${formattedDate}/`;
        const lunchPath = `/meal_planner/${selected_user_id_selection}/lunch/${formattedDate}/`;
        const dinnerPath = `/meal_planner/${selected_user_id_selection}/dinner/${formattedDate}/`;
        const snacksPath = `/meal_planner/${selected_user_id_selection}/snack-Other/${formattedDate}/`;

        const db = getDatabase();

        try {
            // Fetch breakfast data
            const breakfastRef = query(ref(db, breakfastPath));
            const breakfastSnapshot = await get(breakfastRef);

            if (breakfastSnapshot.exists()) {
                const breakfastData = breakfastSnapshot.val();
                setBreakfastData(breakfastData);
                console.log(breakfastData, "breakfastData");
            } else {
                setBreakfastData([]);
            }

            // Fetch lunch data
            const lunchRef = query(ref(db, lunchPath));
            const lunchSnapshot = await get(lunchRef);

            if (lunchSnapshot.exists()) {
                const lunchData = lunchSnapshot.val();
                setLunchData(lunchData);
                console.log(lunchData, "lunchData");
            } else {
                setLunchData([]);
            }

            // Fetch dinner data
            const dinnerRef = query(ref(db, dinnerPath));
            const dinnerSnapshot = await get(dinnerRef);

            if (dinnerSnapshot.exists()) {
                const dinnerData = dinnerSnapshot.val();
                setDinnerData(dinnerData);
                console.log(dinnerData, "dinnerData");
            } else {
                setDinnerData([]);
            }

            // Fetch snacks data
            const snacksRef = query(ref(db, snacksPath));
            const snacksSnapshot = await get(snacksRef);

            if (snacksSnapshot.exists()) {
                const snacksData = snacksSnapshot.val();
                setSnacksData(snacksData);
                console.log(snacksData, "snacksData");
            } else {
                setSnacksData([]);
            }
        } catch (error) {
            console.error("Error fetching meals:", error);
        }
    };
    useEffect(() => {
        getCurrentDateMeals();

    }, []);
    return (
        <div>
            <div className="rounded-lg mb-4" style={{ backgroundColor: "white" }}>
                <div className="py-5 px-5 ">
                    <div className="flex justify-between"> <h2 className="mb-3">Breakfast</h2> <p className="text-xs mt-1" style={{ color: "#D8808C" }}>Total kcal</p></div>
                    <div className="flex flex-wrap  gap-4">
                        {Object.keys(breakfastData).length > 0 ? (
                            Object.keys(breakfastData).map((key) => (
                                <div key={key} className="flex-auto" style={{ maxWidth: "250px" }}>
                                    <Breakfast breakfast={breakfastData[key]} />
                                </div>
                            ))
                        ) : (
                            <div>No meal</div>
                        )}
                    </div>
                </div>
            </div>
            {/* lunch */}
            <div className="rounded-lg mb-4" style={{ backgroundColor: "white" }}>
                <div className="py-5 px-5 ">
                    <div className="flex justify-between"> <h2 className="mb-3">Lunch</h2> <p className="text-xs mt-1" style={{ color: "#6EC1C1" }}>Total kcal</p></div>
                    <div className="flex flex-wrap  gap-4">
                        {Object.keys(lunchData).length > 0 ? (
                            Object.keys(lunchData).map((key) => (
                                <div key={key} className="flex-auto" style={{ maxWidth: "250px" }}>
                                    <Lunch lunchData={lunchData[key]} />
                                </div>
                            ))
                        ) : (
                            <div>No meal</div>
                        )}
                    </div>
                </div>
            </div>
            {/* dinner */}
            <div className="rounded-lg mb-4" style={{ backgroundColor: "white" }}>
                <div className="py-5 px-5 ">
                    <div className="flex justify-between"> <h2 className="mb-3">Dinner</h2> <p className="text-xs mt-1 " style={{ color: "#BBAD92" }}>Total kcal</p></div>
                    <div className="flex flex-wrap  gap-4">
                        {Object.keys(dinnerData).length > 0 ? (
                            Object.keys(dinnerData).map((key) => (
                                <div key={key} className="flex-auto" style={{ maxWidth: "250px" }}>
                                    <Dinner dinnerData={dinnerData[key]} />
                                </div>
                            ))
                        ) : (
                            <div>No meal</div>
                        )}
                    </div>
                    
                </div>
            </div>
            {/* snack */}
            <div className="rounded-lg mb-4" style={{ backgroundColor: "white" }}>
                <div className="py-5 px-5 ">
                    <div className="flex justify-between "> <h2 className="mb-3">Snack</h2> <p className="text-xs mt-1" style={{ color: "#939CAD" }}>Total kcal</p></div>
                    <div className="flex flex-wrap  gap-4">
                    {Object.keys(snacksData).length > 0 ? (
                            Object.keys(snacksData).map((key) => (
                                <div key={key} className="flex-auto" style={{ maxWidth: "250px" }}>
                                    <Snacks snacksData={snacksData[key]} />
                                </div>
                            ))
                        ) : (
                            <div>No meal</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dailymeal