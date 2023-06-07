
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { db } from '../firebase'
import { collection, getDocs, doc, setDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';
import img from '../assets/img/upload.png'
import { useHistory } from 'react-router-dom';
const Hotels = [
    { value: 1, label: "Coral Beach Maldives" },
    { value: 2, label: "Ilaa Beach Maldives" },
    { value: 3, label: "Finolhu" },
    { value: 4, label: "Arena" },
    { value: 5, label: "Kaani Beach Hotel" },
];

const Imageurl = ({ handleImageChange, handleChange, newrecipe, selected_user_id, img_url, handleSubmit, handlecancel }) => {
    const [selectedOptions, setSelectedOptions] = useState(null);

    const setHandle = (e) => {
        setSelectedOptions(Array.isArray(e) ? e.map((hotel) => hotel.label) : []);
    };


    const history = useHistory();

    const add_recipe = async (e) => {
      e.preventDefault();
      const uuid = uuidv4();
    
      if (img_url !== null && newrecipe !== "") {
        newrecipe.img_url = img_url;
        const recipeDocRef = doc(db, 'Users/s48rdKPmfuUcQLBxHpnP91U6MG02/recipes', uuid);
        try {
          await setDoc(recipeDocRef, newrecipe);
          console.log('Recipe added successfully');
          console.log(img_url);
    
          // Navigate to the Fitmerecipe component
          history.push('/app/recipies');
        } catch (error) {
          console.error('Error adding recipe:', error);
        }
      } else {
        alert('Please select an image and fill in all input fields');
      }
    };
    return (
        <>
            <h1 className="my-5 font-semibold text-3xl" >Add Recipie</h1>
            <div className="grid grid-cols-1  lg:grid-cols-2 auto-rows-max  ">
                <div className=" ...">



                    <div className="mt-5 pb-1">
                        <label className="font-medium text-lg " htmlFor=""> Name of Recipie</label>
                    </div>
                    <input  type="name" id="password"  placeholder="Enter name of recipie" required name="name" value={newrecipe.name} onChange={handleChange} className=" px-3 py-2  mt-1 mb-2 border-2 w-11/12 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400"  />

                    <h3 className="mt-6  mb-4 font-medium text-lg "> Ingredients of Recipie</h3>
                    <div className="flex w-11/12 p5-1 mb-2 flex-wrap items-center lg:justify-between justify-center">
                        <div className=" w-full py-2 ">
                            <Select name="ingredients" className="py-2" options={Hotels} isMulti />
                        </div>

                    </div>

                    <div className="mt-4 pb-1 ">
                        <label className=" font-medium text-lg" htmlFor=""> Difficulty</label>

                    </div>
                    <select name="make_difficulity" placeholder="Select" value={newrecipe.make_difficulity} onChange={handleChange} id="countries" className="w-11/12 mb-2 px-3 py-2 mt-1 mb-3 border-2 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400">
                        <option selected></option>
                        <option value="US"> Easy </option>
                        <option value="CA">Medium</option>
                        <option value="FR">Hard</option>

                    </select>

                    <div className="mt-4 pb-1 ">
                        <label className="font-medium text-lg" htmlFor="">Time Required in Minutes</label>

                    </div>
                    <input  name="makeTime" value={newrecipe.makeTime} onChange={handleChange} type="number" min="0" className=" w-11/12 mb-2 px-3 py-2 mt-1 mb-3 border-2 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" />


                    <div className="mt-4 pb-1 ">
                        <label className="font-medium text-lg" htmlFor=""> Category</label>

                    </div>
                    <input  name="category" type="text"  value={newrecipe.category} onChange={handleChange}   className=" w-11/12 mb-2 px-3 py-2 mt-1 mb-3 border-2 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" />



                </div>

                {/* colmen2 */}
                <div className=" content-center">
                    <h3 className="mt-6 font-medium text-2xl "> Food Nutrients</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="mt-2 pb-1 ">
                                <label className="font-medium text-lg" htmlFor="">Calories</label>
                            </div>
                            <input  name="calories" min="0" value={newrecipe.calories} onChange={handleChange} type="number" className=" px-3 py-1 my-1 border-2 w-11/12 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" />
                        </div>

                        <div>
                            <div className="mt-2 pb-1 ">
                                <label className="font-medium text-lg" htmlFor=""> Protiens</label>
                            </div>
                            <input  name="protenis" min="0" value={newrecipe.protenis} onChange={handleChange} type="number" className=" px-3 py-1 my-1 border-2 w-11/12 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" />

                        </div>

                        <div>
                            <div className="mt-2 pb-1 ">
                                <label className="font-medium text-lg" htmlFor=""> Fats</label>
                            </div>
                            <input  name="fat" min="0" value={newrecipe.fat} onChange={handleChange} type="number" className=" px-3 py-1 my-1 border-2 w-11/12 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" />

                        </div>
                        <div>


                            <div className="mt-2 pb-1 ">
                                <label className="font-medium text-lg" htmlFor=""> Carbohydrates</label>
                            </div>
                            <input  name="carbohydrates" min="0" value={newrecipe.carbohydrates} onChange={handleChange} type="number" className=" px-3 py-1 my-1 border-2 w-11/12 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" />

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
                    <textarea name="details" value={newrecipe.details} onChange={handleChange} id="message" rows="4" className="w-11/12 px-3 py-1 my-1 border-2 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="Write your thoughts here..."></textarea>



                    <div className="py-2">
                        <div className="extraOutline p-4 bg-white w-max bg-whtie m-auto rounded-lg">
                            <div className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg text-center" >
                                <img style={{ width: "50px", marginLeft: "46%" }} src={img} alt="" />
                                <div className="input _field flex flex-col w-max mx-auto text-center">
                                    <label>

                                        <input  className="text-sm cursor-pointer w-36 hidden" type="file" multiple onChange={(e) => handleImageChange(e)} />
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
                <button type="submit" onClick={add_recipe} style={{ background: "#00A59F" }} className="focus:outline-none py-2 text-white  hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 ">
                    Done
                </button>
            </div>

            {/* addrecipe */}



        </>
    )
}

export default Imageurl