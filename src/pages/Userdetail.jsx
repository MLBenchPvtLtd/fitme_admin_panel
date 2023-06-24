import React, { useState, useEffect } from 'react'
// img
import { PieChart, Pie, Cell } from 'recharts';
import {
    doughnutOptions,
    lineOptions,
    doughnutLegends,
    lineLegends,
} from '../utils/demo/chartsData'
import noprofileimg from '../assets/img/noprofile.png'
import { db } from '../firebase'
import "firebase/database";
import { collection, query, onSnapshot, getDocs, deleteDoc, doc } from 'firebase/firestore';
import ChartCard from '../components/Chart/ChartCard';
import { Doughnut } from 'react-chartjs-2';
import ChartLegend from '../components/Chart/ChartLegend';
import Recipiescomp from '../components/recipies/recipiescomp';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import Userrecpcomp from '../components/recipies/Userrecpcomp'
import Dailymeal from '../components/users/Dailymeal'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { CanvasJSChart } from 'canvasjs-react-charts'
import {
    TableBody,
    TableContainer,
    Table,
    TableHeader,
    TableCell,
    TableRow,
    TableFooter,
    // Avatar,
    Badge,
    Pagination,
} from '@windmill/react-ui'
const Userdetail = ({ selected_user_object_selection, handleback, handel_recipe_selection, selected_user_id_selection, selected_recipe, selected_recipe_key }) => {
    const [selected_user_object_edit, set_selected_user_object_edit] = useState(selected_user_object_selection);
    const [chart_data, set_chart_data] = useState()
    const [showrecipies, setShowrecipies] = useState([]);
    const [recipie_key, setRecipie_key] = useState('');
    const [text, setText] = useState();
    const [usergraph, setUsergraph] = useState();
    const [firstData, setFirstData] = useState(null);
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const userCollectionRef = collection(db, 'Users', selected_user_id_selection, 'recipes')
    const usergraphCollectionRef = collection(db, 'Users', selected_user_id_selection, 'goals')


    const resultsPerPage = 3;
    const totalResults = showrecipies.length;
    const [currentPage, setCurrentPage] = useState(1);
    // Calculate the indexes for the current page
    const indexOfLastRecipe = currentPage * resultsPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - resultsPerPage;
    const currentRecipes = showrecipies.slice(indexOfFirstRecipe, indexOfLastRecipe);
    const currentRecipeKeys = recipie_key.slice(indexOfFirstRecipe, indexOfLastRecipe);

    // Pagination change control
    function onPageChange(p) {
        setCurrentPage(p);
    }

    // On page change, load new sliced data
    // Here you would make another server request for new data
    useEffect(() => {
        if (showrecipies.length > 0) {
            const newData = showrecipies.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);
            setData(newData);
        }
    }, [showrecipies, currentPage]);


    const fetchUser = async () => {
        const withdrawRef = query(
            collection(db, `/Users/${selected_user_id_selection}/recipes`)
        );

        onSnapshot(withdrawRef, (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => doc.data());
            if (data.length > 0) {
                setShowrecipies(data);
                setRecipie_key(querySnapshot.docs.map((doc) => doc.id));
            } else {
                setText('No recipe available');
            }
        });

    }
    const [fatsValue, setFatsValue] = useState('');

    const fetchUsergraph = async () => {
        const querySnapshot = await getDocs(usergraphCollectionRef);
        const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setUsergraph(data);
        if (data.length > 0) {
            const firstData = data[0];
            // Store the value of 'fats' in the 'fatsValue' state variable
            setFatsValue(firstData);
        }
    };


    useEffect(() => {
        fetchUser();
        fetchUsergraph();

    }, []);

    const sum = fatsValue.fats + fatsValue.protein + fatsValue.carbohydrates + fatsValue.calories;
    const graphtotal = sum.toString().slice(0, 5);

    const options = {
        animationEnabled: true,
        title: {
            text: ""
        },
        subtitles: [{
            text: "100%",
            verticalAlign: "center",
            fontSize: 24,
            dockInsidePlotArea: true
        }],
        data: [{
            type: "doughnut",
            showInLegend: true,
            indexLabel: "{name}: {y}",
            yValueFormatString: "#0.##'%'",
            dataPoints: [
                { name: "Fat", y: fatsValue.fats, color: "#FD1736" }, // Customize the color here
                { name: "Protein", y: fatsValue.protein, color: "#FEC539" }, // Customize the color here
                { name: "Carbohydrates", y: fatsValue.carbohydrates, color: "#32C459" }, // Customize the color here
                { name: "Calories", y: fatsValue.calories, color: "#4E47C9" } // Customize the color here

            ]
        }]
    };

    const options2 = {
        animationEnabled: true,
        title: {
            text: ""
        },
        subtitles: [{
            text: "100%",
            verticalAlign: "center",
            fontSize: 24,
            dockInsidePlotArea: true
        }],
        data: [{
            type: "doughnut",
            showInLegend: true,
            indexLabel: "{name}: {y}",
            yValueFormatString: "#0.##'%'",
            dataPoints: [
                { name: "Fat", y: 0.0001, color: "#FD1736" }, // Customize the color here
                { name: "Protein", y: 0.0001, color: "#FEC539" }, // Customize the color here
                { name: "Carbohydrates", y: 0.0001, color: "#32C459" }, // Customize the color here
                { name: "Calories", y: 0.0001, color: "#4E47C9" } // Customize the color here

            ]
        }]
    };

    return (
        <>

            <div className=" py-5 items-end  w-11/12">
                <button onClick={() => { handleback(1) }} className="text-black py-2">
                    < BsFillArrowLeftCircleFill size={30} />
                </button>

            </div>
            <div className="grid grid-cols-1  xl:grid-cols-7 gap-4">
                {/* 1st col */}
                <div className=" col-span-4 ">
                    {/* profile */}
                    <div className="grid  grid-cols-1  xl:grid-cols-3">
                        {/* left */}
                        <div className="text-center" >
                            <div className="object-center text-center">
                                {(selected_user_object_selection.image_url !== '') && <img class="w-200 h-200 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 " src={selected_user_object_selection.image_url} alt="Bordered avatar " style={{ marginLeft: "20%", width: "60%" }} />}
                                {(selected_user_object_selection.image_url === '') && <img class="w-200 h-200 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 " style={{ marginLeft: "20%", width: "60%" }} src={noprofileimg} alt="" />}
                            </div>
                            <h2 className="font-bold">{selected_user_object_selection.user_name}</h2>
                            <div className="overflow-hidden w-11/12" style={{ marginLeft: "5%" }}> <p className="text-xs">{selected_user_object_selection.firebase_id}</p></div>
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
                        {currentRecipes.length > 0 ? (
                            currentRecipes.map((recipe, index) => (
                                <div key={currentRecipeKeys[index]}>
                                    <Userrecpcomp
                                        recipe={recipe}
                                        selected_user_id_selection={selected_user_id_selection}
                                        selected_recipe_key={selected_recipe_key}
                                        kiey={index}
                                        recipie_key={currentRecipeKeys[index]}
                                        handel_recipe_selection={handel_recipe_selection}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>No recipe found.</p>
                        )}

                        {currentRecipes.length > 0 ? (
                            <TableFooter>
                                <Pagination
                                    totalResults={totalResults}
                                    resultsPerPage={resultsPerPage}
                                    label="Table navigation"
                                    onChange={onPageChange}
                                />
                            </TableFooter>
                        ) : null}
                    </div>

                </div>
                {/* 2nd col */}
                <div className=" col-span-3 ">

                    {/* graph */}
                    <div className="rounded-lg" style={{ background: "white" }}>
                        <div className="" style={{ width: "80%", marginLeft: "10%" }}>
                            <div className="">

                                <div style={{ width: '100%', }}>

                                    {(fatsValue !== "") && <CanvasJSChart options={options} />}
                                    {(fatsValue === "") && <CanvasJSChart options={options2} />}
                                </div>
                            </div>
                            <div className="flex justify-between my-1">
                                <p className="font-medium">All Calories Left</p>
                                <p className="text-base"><span className='font-medium'>595/</span> <span className='#8E8E8E'>1455</span></p>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2.5 mb-5 ">
                                <div class=" h-2.5 rounded-full" style={{ width: "45%", background: "#00A7A1" }}>.</div>
                            </div>
                        </div>
                    </div>
                    {/* daily meal */}
                    <Dailymeal selected_user_id_selection={selected_user_id_selection} />
                </div>
            </div>
        </>
    )
}

export default Userdetail

