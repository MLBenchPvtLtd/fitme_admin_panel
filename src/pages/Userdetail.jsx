import React, { useState, useEffect } from 'react'
// img
import u from '../../src/assets/img/user.png'
import pichart from '../../src/assets/img/pichart.png'
import red from '../../src/assets/img/red.png'
import { EditIcon, TrashIcon } from '../icons'
import {
    // TableBody,
    // TableContainer,
    // Table,
    // TableHeader,
    // TableCell,
    // TableRow,
    // TableFooter,
    // Avatar,
    // Badge,
    // Pagination,
    Button
} from '@windmill/react-ui'
import { BsFillEyeFill } from "@react-icons/all-files/bs/BsFillEyeFill";
import {
    doughnutOptions,
    lineOptions,
    doughnutLegends,
    lineLegends,
} from '../utils/demo/chartsData'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import "firebase/database";
import { db } from '../firebase'
import { onValue, ref, remove, set, query, update } from 'firebase/database';

const Userdetail = ({ selected_user_id_selection, selected_user_object_selection, handlecancel }) => {
    const [selected_user_object_edit, set_selected_user_object_edit] = useState(selected_user_object_selection);

    useEffect(() => {
        console.log(selected_user_object_edit,)
    }, []);
    // update user
    const update_user = () => {
        update(ref(db, `/Users/${selected_user_id_selection}`), selected_user_object_edit);
        console.log(selected_user_id_selection, "detaill");
    }

    return (
        <>
            <div className=" py-5 items-end justify-end text-right w-11/12">

                <button onClick={() => { handlecancel(1) }} className="text-white py-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Cancel
                </button>
                <button onClick={update_user} className="focus:outline-none py-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    Update
                </button>
            </div>
            <div className="py-5 px-5 ">
                {/* user name */}
                <div className="flex justify-between">
                    <div className="flex items-center text-sm">
                        {/* <Avatar className="hidden mr-3 md:block" src={user.name} alt="User image" /> */}
                        <img className='h-10  w-10 mr-2' src={u} alt="" />
                        <div>
                            <p className="font-semibold">{selected_user_object_edit.user_name}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{selected_user_object_edit.user_name}</p>
                        </div>
                    </div>
                </div>
                {/* row 1 */}
                <div className="grid gap-5 grid-cols-1  lg:grid-cols-3 auto-rows-max ">
                    {/* col 1 */}
                    <div className="col-span-2">
                        <div className="flex justify-between mt-3 mb-5 ">
                            <h1 className="font-bold text-2xl">Daily Plan</h1>
                            <h1 className="font-bold text-2xl">29/03/2023</h1>
                        </div>
                        {/* inner row */}
                        <div className="grid gap-4 grid-cols-1 my-3 lg:grid-cols-2 auto-rows-max">
                            <div className="breakfast border-2 rounded-lg">
                                <h1 className="font-bold text-1xl pt-2 pb-5 pl-2">Breakfast</h1>
                                <div className="flex justify-between px-2 pb-4">
                                    <p>Peanuts</p> <p>Sweetners</p> <p>Sweetners</p> <p>Legumes</p>
                                </div>
                            </div>
                            <div className="breakfast border-2 rounded-lg">
                                <h1 className="font-bold text-1xl pt-2 pb-5 pl-2">Breakfast</h1>
                                <div className="flex justify-between px-2 pb-4">
                                    <p>Peanuts</p> <p>Sweetners</p> <p>Sweetners</p> <p>Legumes</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-4 grid-cols-1 my-4 lg:grid-cols-2 auto-rows-max">
                            <div className="breakfast border-2 rounded-lg">
                                <h1 className="font-bold text-1xl pt-2 pb-5 pl-2">Breakfast</h1>
                                <div className="flex justify-between px-2 pb-4">
                                    <p>Peanuts</p> <p>Sweetners</p> <p>Sweetners</p> <p>Legumes</p>
                                </div>
                            </div>
                            <div className="breakfast border-2  rounded-lg">
                                <h1 className="font-bold text-1xl pt-2 pb-5 pl-2">Breakfast</h1>
                                <div className="flex justify-between px-2 pb-4">
                                    <p>Peanuts</p> <p>Sweetners</p> <p>Sweetners</p> <p>Legumes</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* col2 */}
                    <div className="">
                        <div className="mt-3  ">
                            <label className="font-medium text-base" htmlFor=""> Phone</label>

                        </div>

                        <p>{selected_user_object_edit.phone}</p>
                        <div className="mt-4  ">
                            <label className="font-medium text-base" htmlFor=""> Age</label>
                        </div>
                        <p>{selected_user_object_edit.age}</p>
                        <h3 className="mt-6 font-medium text-2xl"> Food prefrences</h3>
                        <div className="mt-2  ">
                        </div>
                        {/* <p>{selected_user_object_edit.user_name}</p> */}

                    </div>
                </div>

                {/* row 2 */}
                <div className="grid gap-5 grid-cols-1 my-5 lg:grid-cols-3 auto-rows-max ">
                    {/* col 1 */}
                    <div className="col-span-2">

                        <ChartCard title="">
                            <Doughnut {...doughnutOptions} />
                            <ChartLegend legends={doughnutLegends} />
                        </ChartCard>

                    </div>

                    {/* col2 */}
                    <div className="">

                    </div>
                </div>

            </div>
        </>
    )
}

export default Userdetail