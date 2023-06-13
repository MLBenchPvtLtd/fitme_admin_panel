import React, { useState, useEffect } from "react";
import Select from "react-select";
import "firebase/database";
import { db } from '../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import img from '../assets/img/upload.png'
const Hotels = [
    { value: 1, label: "Coral Beach Maldives" },
    { value: 2, label: "Ilaa Beach Maldives" },
    { value: 3, label: "Finolhu" },
    { value: 4, label: "Arena" },
    { value: 5, label: "Kaani Beach Hotel" },
];

const Userrecpchild = ({ selected_recipe, selected_user_id, selected_recipe_key, img_url, handlecancel, handleSubmit, handleImageChange }) => {

    const [selectedOptions, setSelectedOptions] = useState(null);
    const [printdetails, setPrintdetails] = useState(selected_recipe);

    const setHandle = (e) => {
        setSelectedOptions(Array.isArray(e) ? e.map((hotel) => hotel.label) : []);
    };
    useEffect(() => {
    }, []);

    const handleIngredientsChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
        setPrintdetails((prevRecipe) => ({
          ...prevRecipe,
          ingredients: selectedOptions,
        }));
      };
    const handleChange = (e) => {
        const value = e.target.value;
        setPrintdetails({
            ...printdetails,
            [e.target.name]: value
        });
        console.log(printdetails)
    };

  
    const update_recipe = () => {
        console.log(`/Users/s48rdKPmfuUcQLBxHpnP91U6MG02/recipes/${selected_recipe_key}`)
        const recipeDocRef = doc(db, `/Users/s48rdKPmfuUcQLBxHpnP91U6MG02/recipes/${selected_recipe_key}`);
        const updatedDetails = {
            ...printdetails,
            img_url: img_url
        };
        updateDoc(recipeDocRef, updatedDetails);
        console.log(updatedDetails, "details");
    };
    return (
        <>
            <h1 className="my-5 font-semibold text-3xl" >Edit Recipie</h1>
            <div className="grid grid-cols-1  lg:grid-cols-2 auto-rows-max  ">
                <div className=" ...">



                    <div className="mt-5 pb-1">
                        <label className="font-medium text-lg " htmlFor=""> Name of Recipie</label>
                    </div>
                    <input type="name" id="password" placeholder="Enter name of recipie" required name="name" value={printdetails.name} onChange={handleChange} className=" px-3 py-2  mt-1 mb-2 border-2 w-11/12 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" />

                    <h3 className="mt-6  mb-4 font-medium text-lg "> Ingredients of Recipie</h3>
                    <div className="flex w-11/12 p5-1 mb-2 flex-wrap items-center lg:justify-between justify-center">
                        <div className=" w-full py-2 ">
                        <Select name="ingredients" className="py-2" options={Hotels} onChange={handleIngredientsChange} value={printdetails.ingredients} isMulti />
                        </div>

                    </div>

                    <div className="mt-4 pb-1 ">
                        <label className=" font-medium text-lg" htmlFor=""> Difficulty</label>

                    </div>
                    <select name="make_difficulity" placeholder="Select" value={printdetails.make_difficulity} onChange={handleChange} id="countries" className="w-11/12 mb-2 px-3 py-2 mt-1 mb-3 border-2 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400">
                        <option selected></option>
                        <option value="Easy"> Easy </option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>

                    </select>

                    <div className="mt-4 pb-1 ">
                        <label className="font-medium text-lg" htmlFor=""> Time Required</label>

                    </div>
                    <input name="makeTime" value={printdetails.makeTime} onChange={handleChange} type="text" className=" w-11/12 mb-2 px-3 py-2 mt-1 mb-3 border-2 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" />


                    <div className="mt-4 pb-1 ">
                        <label className="font-medium text-lg" htmlFor=""> Category</label>

                    </div>
                    <input name="category" type="text" value={printdetails.category} onChange={handleChange} className=" w-11/12 mb-2 px-3 py-2 mt-1 mb-3 border-2 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" />



                </div>

                {/* colmen2 */}
                <div className=" content-center">
                    <h3 className="mt-6 font-medium text-2xl "> Food Nutrients</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="mt-2 pb-1 ">
                                <label className="font-medium text-lg" htmlFor="">Calories</label>
                            </div>
                            <input name="calories" value={printdetails.calories} onChange={handleChange} type="number" className=" px-3 py-1 my-1 border-2 w-11/12 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" />
                        </div>

                        <div>
                            <div className="mt-2 pb-1 ">
                                <label className="font-medium text-lg" htmlFor=""> Protiens</label>
                            </div>
                            <input name="protenis" value={printdetails.protenis} onChange={handleChange} type="number" className=" px-3 py-1 my-1 border-2 w-11/12 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" />

                        </div>

                        <div>
                            <div className="mt-2 pb-1 ">
                                <label className="font-medium text-lg" htmlFor=""> Fats</label>
                            </div>
                            <input name="fat" value={printdetails.fat} onChange={handleChange} type="text" className=" px-3 py-1 my-1 border-2 w-11/12 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" />

                        </div>
                        <div>


                            <div className="mt-2 pb-1 ">
                                <label className="font-medium text-lg" htmlFor=""> Carbohydrates</label>
                            </div>
                            <input name="carbohydrates" value={printdetails.carbohydrates} onChange={handleChange} type="text" className=" px-3 py-1 my-1 border-2 w-11/12 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" />

                        </div>
                    </div>

                    {/* <h3 className="mt-6 font-medium text-2xl"> Food prefrences</h3>
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

 */}

                    <div className="mt-4 pb-1 ">
                        <label className="font-medium text-lg" htmlFor=""> Description</label>

                    </div>
                    <textarea name="details" value={printdetails.details} onChange={handleChange} id="message" rows="4" className="w-11/12 px-3 py-1 my-1 border-2 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="Write your thoughts here..."></textarea>



                    <div className="py-2">
                        <div className="extraOutline p-4 bg-white w-max bg-whtie m-auto rounded-lg">
                            <div className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg text-center" >
                                <img style={{ width: "50px", marginLeft: "46%" }} src={img} alt="" />
                                <div className="input _field flex flex-col w-max mx-auto text-center">
                                    <label>

                                        <input className="text-sm cursor-pointer w-36 hidden" type="file" multiple onChange={(e) => handleImageChange(e)} />
                                        <button style={{ background: "#00A59F" }} className="text  text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 w-full hover:bg-indigo-500" onClick={handleSubmit}>Upload</button>
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

                {/* <button onClick={() => { handlecancel(1) }} className="text-white py-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Cancel
                </button> */}
                <button onClick={() => { handlecancel(1) }} className="text-white py-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Cancel
                </button>
                <button onClick={update_recipe} style={{ background: "#00A59F" }} className="focus:outline-none py-2 text-white  hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    Update
                </button>

            </div>


            {/* edit recipie */}
          
        </>
    )
}

export default Userrecpchild