import React, { useState} from "react";
import Select from "react-select";

const Hotels = [
  { value: 1, label: "Coral Beach Maldives" },
  { value: 2, label: "Ilaa Beach Maldives" },
  { value: 3, label: "Finolhu" },
  { value: 4, label: "Arena" },
  { value: 5, label: "Kaani Beach Hotel" },
];


const Addrecipies = () => {

  const [selectedOptions, setSelectedOptions] = useState(null);


  const setHandle = (e) => {
    setSelectedOptions(Array.isArray(e) ? e.map((hotel) => hotel.label) : []);
  };



  return (
    <>

      <div class="grid grid-cols-1  lg:grid-cols-2 auto-rows-max  ">

        <div class=" ...">
          <div className="mt-5  ">
            <label className="font-bold text-lg" for=""> Name</label>
            <h3>
          
    </h3>
          </div>
          <input type="text" className=" px-3 py-1  my-1 border-2 w-11/12 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" name="" />

          <h3 className="mt-6 font-bold text-2xl "> Food Nutrients</h3>

          <div className="mt-4  ">
            <label className="font-bold text-lg" for=""> Calories</label>

          </div>
          <input type="text" className=" px-3 py-1 my-1 border-2 w-11/12 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" name="" />

          <div className="mt-4  ">
            <label className="font-bold text-lg" for=""> Protiens</label>

          </div>
          <input type="text" className=" px-3 py-1 my-1 border-2 w-11/12 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" name="" />


          <div className="mt-4  ">
            <label className="font-bold text-lg" for=""> Fats</label>

          </div>
          <input type="text" className=" px-3 py-1 my-1 border-2 w-11/12 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" name="" />


          <div className="mt-4  ">
            <label className="font-bold text-lg" for=""> Carbohydrates</label>

          </div>
          <input type="text" className=" px-3 py-1 my-1 border-2 w-11/12 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" name="" />

          <h3 className="mt-6  mb-4 font-bold text-lg "> Ingredients</h3>


        

          <div className="flex w-11/12 p5-1  flex-wrap items-center lg:justify-between justify-center">
            <div className=" w-full	 ">
              <Select className="" options={Hotels} onChange={setHandle} isMulti />
            </div>

          </div>


        </div>

        {/* colmen2 */}
        <div class=" content-center">

          <h3 className="mt-6 font-bold text-2xl"> Food prefrences</h3>
          <div className="mt-2  ">
            <label className="text-sm" for=""> chooese prefrences</label>

          </div>
          <select id="countries" class="w-11/12 px-3 py-1 my-1 border-2 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400">
            <option selected></option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>




          <div className="mt-4 ">
            <label className=" font-bold text-lg" for=""> Difficulty</label>

          </div>
          <select id="countries" class="w-11/12 px-3 py-1 my-1 border-2 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400">
            <option selected></option>
            <option value="US"> Easy </option>
            <option value="CA">Medium</option>
            <option value="FR">Hard</option>
          
          </select>


          <div className="mt-4  ">
            <label className="font-bold text-lg" for=""> Time Required</label>

          </div>
          <input type="text" className=" w-11/12 px-3 py-1 my-1 border-2 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="" name="" />


          <div className="mt-4  ">
            <label className="font-bold text-lg" for=""> Description</label>

          </div>
          <textarea id="message" rows="4" class="w-11/12 px-3 py-1 my-1 border-2 rounded focus:outline-none placeholder:text-blue-300 border-neutral-400" placeholder="Write your thoughts here..."></textarea>



          <div class="py-2">
            <div class="extraOutline p-4 bg-white w-max bg-whtie m-auto rounded-lg">
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

        </div>
      </div>




      {/* addrecipe */}



    </>
  )
}

export default Addrecipies