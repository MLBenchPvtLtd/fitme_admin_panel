import React, { useState, useEffect } from "react";
import Select from "react-select";
import "firebase/database";
import { db } from '../firebase'
import { onValue, ref, remove, set, query, update } from 'firebase/database';
const UserEdit = ({ selected_user_id_selection, selected_user_object_selection,handleback }) => {
    const Hotels = [
        { value: 1, label: "Coral Beach Maldives" },
        { value: 2, label: "Ilaa Beach Maldives" },
        { value: 3, label: "Finolhu" },
        { value: 4, label: "Arena" },
        { value: 5, label: "Kaani Beach Hotel" },
    ];

    const [selected_user_object_edit, set_selected_user_object_edit] = useState(selected_user_object_selection);
    const [selectedOptions, setSelectedOptions] = useState(null);
    const setHandle = (e) => {
        setSelectedOptions(Array.isArray(e) ? e.map((hotel) => hotel.label) : []);
    };

    const handleChangeuser = (e) => {

        const value = e.target.value;
        set_selected_user_object_edit({
            ...selected_user_object_edit,
            [e.target.name]: value
        });
        console.log(selected_user_object_edit)
    };
    useEffect(() => {

    }, []);

    // update user
    const update_user = () => {
        update(ref(db, `/Users/${selected_user_id_selection}`), selected_user_object_edit);
        console.log(selected_user_id_selection, "detaill");
    }


    return (
        <>
          <div>
         
          </div>
            <div class="grid grid-cols-1  lg:grid-cols-2 auto-rows-max  ">
                <div class=" ...">
                    <div className="mt-5  ">
                        <label className="font-bold text-lg" for=""> Name</label>
                    </div>
                    <input name="user_name"
                        onChange={handleChangeuser}
                        value={selected_user_object_edit.user_name}
                        type="text" className=" px-3 py-1  my-1 border-2 w-11/12 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" />
                    <div className="mt-4  ">
                        <label className="font-bold text-lg" for=""> Email</label>
                    </div>
                    <input
                        name="user_email"
                        onChange={handleChangeuser}
                        value={selected_user_object_edit.user_email}
                        type="text" className=" px-3 py-1 my-1 border-2 w-11/12 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" />

                    <div className="mt-4  ">
                        <label className="font-bold text-lg" for=""> Phone</label>
                    </div>
                    <input name="phone"
                        value={selected_user_object_edit.phone}
                        onChange={handleChangeuser}
                        type="text" className=" px-3 py-1 my-1 border-2 w-11/12 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" />


                    <div className="mt-4  ">
                        <label className="font-bold text-lg" for=""> Age</label>

                    </div>
                    <input
                        name="age"
                        value={selected_user_object_edit.age}
                        onChange={handleChangeuser}
                        type="text" className=" px-3 py-1 my-1 border-2 w-11/12 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" />


                    <h3 className="mt-6 font-bold text-2xl"> Food prefrences</h3>
                    <div className="mt-2  ">
                        <label className="text-sm" for=""> chooese prefrences</label>

                    </div>
                    <select id="countries" class="w-11/12 px-3 py-1 my-1 border-2 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400">
                        <option selected>{selected_user_object_edit.user_name}</option>
                        <option value="US">Meat</option>
                        <option value="CA">Fastfood</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                    </select>


                    <div class="py-3 w-11/12">
                        <div class="extraOutline  bg-white w-max bg-whtie m-auto rounded-lg ">
                            <div class="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg" >
                                <svg class="text-indigo-500 w-24 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                <div class="input_field flex flex-col w-max mx-auto text-center">
                                    <label>
                                        <input class="text-sm cursor-pointer w-36 hidden" type="file" multiple />
                                        <div class="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">Select</div>
                                    </label>

                                    <div class="title text-indigo-500 uppercase">or drop files here</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" py-5 items-end justify-end text-right w-11/12">
                 
                        <button onClick={() => { handleback(1) }} class="text-white py-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Cancel
                        </button>
                        <button onClick={update_user} class="focus:outline-none py-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                            Update
                        </button>
                    </div>
                </div>

                {/* colmen2
                <div class=" content-center">

                    <h3 className="mt-6  mb-4 font-bold text-lg "> Breakfast</h3>
                    <div className="flex w-11/12 p5-1  flex-wrap items-center lg:justify-between justify-center">
                        <div className=" w-full	 ">
                            <Select className="" options={Hotels} onChange={setHandle} isMulti />
                        </div>
                    </div>
                    <h3 className="mt-6  mb-4 font-bold text-lg "> Lunch</h3>
                    <div className="flex w-11/12 p5-1  flex-wrap items-center lg:justify-between justify-center">
                        <div className=" w-full	 ">
                            <Select className="" options={Hotels} onChange={setHandle} isMulti />
                        </div>
                    </div>
                    <h3 className="mt-6  mb-4 font-bold text-lg "> Dinner</h3>
                    <div className="flex w-11/12 p5-1  flex-wrap items-center lg:justify-between justify-center">
                        <div className=" w-full	 ">
                            <Select className="" options={Hotels} onChange={setHandle} isMulti />
                        </div>
                    </div>
                    <h3 className="mt-6  mb-4 font-bold text-lg "> Snacks</h3>
                    <div className="flex w-11/12 p5-1  flex-wrap items-center lg:justify-between justify-center">
                        <div className=" w-full	 ">
                            <Select className="" options={Hotels} onChange={setHandle} isMulti />
                        </div>
                    </div>


                </div> */}
            </div>



        </>
    )
}

export default UserEdit