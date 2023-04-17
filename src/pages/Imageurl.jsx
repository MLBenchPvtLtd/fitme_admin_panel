
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { db } from '../firebase'
import { onValue, remove, set, ref, query, orderByKey } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
const Hotels = [
    { value: 1, label: "Coral Beach Maldives" },
    { value: 2, label: "Ilaa Beach Maldives" },
    { value: 3, label: "Finolhu" },
    { value: 4, label: "Arena" },
    { value: 5, label: "Kaani Beach Hotel" },
];

const Imageurl = ({ handleImageChange, handleChange, newrecipe, selected_user_id, image_url, handleSubmit, handlecancel }) => {
    const [selectedOptions, setSelectedOptions] = useState(null);

    const setHandle = (e) => {
        setSelectedOptions(Array.isArray(e) ? e.map((hotel) => hotel.label) : []);
    };



    const add_recipe = (e) => {
        e.preventDefault()
        const uuid = uuidv4();

        if (image_url !== null && newrecipe !== "") {
            newrecipe.image_url = image_url;
            set(ref(db, `/recipes/${selected_user_id}/${uuid}`), newrecipe);
            console.log(image_url)
        }
        else {
            alert("Please select a Image and fill input fields")
        }
    }


    return (
        <>

            <div className="grid grid-cols-1  lg:grid-cols-2 auto-rows-max  ">
                <div className=" ...">



                    <div className="mt-5  ">
                        <label className="font-bold text-lg" htmlFor=""> Name</label>
                    </div>
                    <input type="name" id="password" required name="name" value={newrecipe.name} onChange={handleChange} className=" px-3 py-1  my-1 border-2 w-11/12 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" />

                    <h3 className="mt-6 font-bold text-2xl "> Food Nutrients</h3>

                    <div className="mt-4  ">
                        <label className="font-bold text-lg" htmlFor=""> Calories</label>

                    </div>
                    <input name="calories" value={newrecipe.calories} onChange={handleChange} type="number" className=" px-3 py-1 my-1 border-2 w-11/12 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" />

                    <div className="mt-4  ">
                        <label className="font-bold text-lg" htmlFor=""> Protiens</label>

                    </div>
                    <input name="protenis" value={newrecipe.protenis} onChange={handleChange} type="number" className=" px-3 py-1 my-1 border-2 w-11/12 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" />


                    <div className="mt-4  ">
                        <label className="font-bold text-lg" htmlFor=""> Fats</label>

                    </div>
                    <input name="fat" value={newrecipe.fat} onChange={handleChange} type="text" className=" px-3 py-1 my-1 border-2 w-11/12 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" />


                    <div className="mt-4  ">
                        <label className="font-bold text-lg" htmlFor=""> Carbohydrates</label>

                    </div>
                    <input name="carbohydrates" value={newrecipe.carbohydrates} onChange={handleChange} type="text" className=" px-3 py-1 my-1 border-2 w-11/12 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" />

                    <h3 className="mt-6  mb-4 font-bold text-lg "> Ingredients</h3>
                    <div className="flex w-11/12 p5-1  flex-wrap items-center lg:justify-between justify-center">
                        <div className=" w-full	 ">
                            <Select name="ingredients" value={newrecipe.ingredients} onChange={handleChange} className="" options={Hotels} isMulti />
                        </div>

                    </div>


                </div>

                {/* colmen2 */}
                <div className=" content-center">

                    <h3 className="mt-6 font-bold text-2xl"> Food prefrences</h3>
                    <div className="mt-2  ">
                        <label className="text-sm" htmlFor=""> chooese prefrences</label>

                    </div>
                    <select name="prefrences" value={newrecipe.prefrences} onChange={handleChange} id="countries" className="w-11/12 px-3 py-1 my-1 border-2 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400">
                        <option selected></option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                    </select>




                    <div className="mt-4 ">
                        <label className=" font-bold text-lg" htmlFor=""> Difficulty</label>

                    </div>
                    <select name="make_difficulity" value={newrecipe.make_difficulity} onChange={handleChange} id="countries" className="w-11/12 px-3 py-1 my-1 border-2 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400">
                        <option selected></option>
                        <option value="US"> Easy </option>
                        <option value="CA">Medium</option>
                        <option value="FR">Hard</option>

                    </select>


                    <div className="mt-4  ">
                        <label className="font-bold text-lg" htmlFor=""> Time Required</label>

                    </div>
                    <input name="makeTime" value={newrecipe.makeTime} onChange={handleChange} type="text" className=" w-11/12 px-3 py-1 my-1 border-2 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" />


                    <div className="mt-4  ">
                        <label className="font-bold text-lg" htmlFor=""> Description</label>

                    </div>
                    <textarea name="details" value={newrecipe.details} onChange={handleChange} id="message" rows="4" className="w-11/12 px-3 py-1 my-1 border-2 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="Write your thoughts here..."></textarea>



                    <div className="py-2">
                        <div className="extraOutline p-4 bg-white w-max bg-whtie m-auto rounded-lg">
                            <div className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg" >
                                <svg className="text-indigo-500 w-24 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                <div className="input_field flex flex-col w-max mx-auto text-center">
                                    <label>

                                        <input className="text-sm cursor-pointer w-36 hidden" type="file" multiple onChange={(e) => handleImageChange(e)} />
                                        <button className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 w-full hover:bg-indigo-500" onClick={handleSubmit}>Upload</button>
                                        <div className=" border rounded font-semibold cursor-pointer p-1 my-2 px-1" >Select</div>
                                    </label>

                                    {/* <div className="title text-indigo-500 uppercase">or drop files here</div> */}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>



            <div className=" py-5 items-end justify-end text-right w-11/12">

                <button onClick={() => { handlecancel(1) }} className="text-white py-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Cancel
                </button>
                <button type="submit" onClick={add_recipe} className="focus:outline-none py-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    Update
                </button>
            </div>

            {/* addrecipe */}



        </>
    )
}

export default Imageurl