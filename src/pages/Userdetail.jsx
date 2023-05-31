import React, { useState, useEffect } from 'react'
// img
import {
    doughnutOptions,
    lineOptions,
    doughnutLegends,
    lineLegends,
} from '../utils/demo/chartsData'
import noprofileimg from '../assets/img/noprofile.png'
import imgbreakfast from '../assets/img/breakfast.png'
import imgp from '../assets/img/profile.png'
import { db } from '../firebase'
import "firebase/database";
import { collection, query, onSnapshot, getDocs } from 'firebase/firestore';
import ChartCard from '../components/Chart/ChartCard';
import { Doughnut } from 'react-chartjs-2';
import ChartLegend from '../components/Chart/ChartLegend';
import Recipiescomp from '../components/recipies/recipiescomp';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
const Userdetail = ({ selected_user_id_selection, selected_user_object_selection, handleback,handel_recipe_selection }) => {
    const [selected_user_object_edit, set_selected_user_object_edit] = useState(selected_user_object_selection);
    const [chart_data, set_chart_data] = useState()
    const [showrecipies, setShowrecipies] = useState([]);
    const [recipie_key, setRecipie_key] = useState('');
    const [text, setText] = useState();
    const userCollectionRef = collection(db,'Users', 's48rdKPmfuUcQLBxHpnP91U6MG02', 'recipes')
    // update user
    // const update_user = () => {
    //     update(ref(db, `/Users/${selected_user_id_selection}`), selected_user_object_edit);
    // }
    const fetchUser = async () => {
        const querySnapshot = await getDocs(userCollectionRef);
        const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log(data,"dataa");
        setShowrecipies(data);
      };
   
    useEffect(() => {
        fetchUser();
        console.log(handel_recipe_selection,"recip")
    }, []);

    return (
        <>

        
            <div className=" py-5 items-end  w-11/12">
                <button onClick={() => { handleback(1) }} className="text-black py-2">
                < BsFillArrowLeftCircleFill size={30}  />
                </button>
                {/* <button onClick={update_user} className="focus:outline-none py-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    Update
                </button> */}
            </div>
            <div className="grid grid-cols-1  xl:grid-cols-7 gap-4">
                {/* 1st col */}
                <div className=" col-span-4 ">
                    {/* profile */}
                    <div className="grid  grid-cols-1  xl:grid-cols-3">
                        {/* left */}
                        <div className="text-center" >
                            <div className="object-center text-center">
                               
                          
                                {(selected_user_object_selection.image_url !== '') &&  <img class="w-200 h-200 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 " src={selected_user_object_selection.image_url}  alt="Bordered avatar " style={{ marginLeft: "20%", width: "60%" }} />}
                        {(selected_user_object_selection.image_url === '') && <img class="w-200 h-200 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 " style={{ marginLeft: "20%", width: "60%" }} src={noprofileimg} alt="" />}
                            </div>
                            <h2 className="font-bold">{selected_user_object_selection.user_name}</h2>
                            <p className="text-xs">{selected_user_object_selection.firebase_id}</p>
                        </div>
                        {/* right */}
                        <div className='col-span-2 ' style={{ background: "white", borderRadius: "10px" }}>
                            <div className="py-5 px-5  ">
                                <h1 className="font-bold text-xl">Basic Info</h1>
                                <div className='flex justify-between my-3'>
                                    <h2 className="font-semibold" style={{ color: "#b0b0b0 " }}>Email Address</h2>  <p className="text-sm font-medium">{selected_user_object_selection.user_email}</p>
                                </div>
                                <div className='flex justify-between my-3'>
                                    <h2 className="font-semibold" style={{ color: "#b0b0b0 " }}>Phone Nmber</h2>  <p className="text-sm font-medium">{selected_user_object_selection.phone}</p>
                                </div>
                                <div className='flex justify-between my-3'>
                                    <h2 className="font-semibold" style={{ color: "#b0b0b0 " }}>Age</h2>  <p className="text-sm font-medium">{selected_user_object_selection.age}</p>
                                </div>
                                <div className='flex justify-between my-3'>
                                    <h2 className="font-semibold" style={{ color: "#b0b0b0 " }}>Preference</h2>  <p><p className="text-sm font-medium">veg</p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* recpies */}
                    <h1 className='font-bold my-5'>My Recipies</h1>
                    <div className='pb-5'>
                    {showrecipies.map((recipe, index) => (
                <div>
                    <Recipiescomp recipe={recipe} kiey={index} recipie_key={recipie_key[index]} handel_recipe_selection={handel_recipe_selection} />
                </div>
            ))}

                    </div>
                   
                </div>
                {/* 2nd col */}
                <div className=" col-span-3 ">

                    {/* graph */}
                    <div className="rounded-lg" style={{ background: "white" }}>
                        <div className="" style={{ width: "80%", marginLeft: "10%" }}>
                            <ChartCard title="">
                                {/* <Doughnut {...doughnutOptions} /> */}
                                <ChartLegend legends={doughnutLegends} />
                            </ChartCard>
                            <div className="flex justify-between my-1">
                                <p className="font-medium">All Calories Left</p>
                                <p className="text-base"><span className='font-medium'>595/</span> <span className='#8E8E8E'>1455</span></p>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2.5 mb-5 dark:bg-gray-700">
                                <div class=" h-2.5 rounded-full" style={{ width: "45%", background: "#00A7A1" }}>.</div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg mb-4" style={{ backgroundColor: "white" }}>
                        <div className="py-5 px-5 ">
                            <div className="flex justify-between"> <h2 className="mb-3">Breakfast</h2> <p className="text-xs mt-1" style={{ color: "#D8808C" }}>Total kcal</p></div>
                            <div className="grid grid-cols-2">
                                <div className="text-center rounded-lg " style={{ backgroundColor: "#FBE3E6", alignItems: "center" }}>
                                    <p className="flex ">
                                        <div> <img className="px-2 py-2" src={imgbreakfast} alt="" /></div>
                                        <p className='text-xs px-2 pt-3'> Slice+Egg Breakfast</p>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* lunch */}
                    <div className="rounded-lg mb-4" style={{ backgroundColor: "white" }}>
                        <div className="py-5 px-5 ">
                            <div className="flex justify-between"> <h2 className="mb-3">Lunch</h2> <p className="text-xs mt-1" style={{ color: "#6EC1C1" }}>Total kcal</p></div>
                            <div className="grid grid-cols-2">
                                <div className="text-center rounded-lg " style={{ backgroundColor: "#CFEEEE", alignItems: "center" }}>
                                    <p className="flex ">
                                        <div> <img className="px-2 py-2" src={imgbreakfast} alt="" /></div>
                                        <p className='text-xs px-2 pt-3'> Slice+Egg Breakfast</p>
                                    </p>
                                </div>
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
            </div>
        </>
    )
}

export default Userdetail

