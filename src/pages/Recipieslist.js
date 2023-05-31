// import id from 'faker/lib/locales/id_ID';
import React, { useState, useEffect } from 'react'
import "firebase/database";
import RecipeDetail from './RecipeDetail';
import { IoIosArrowDropleft } from "react-icons/io";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  // TableRow,
  TableFooter,
  TableContainer,
  // Badge,
  // Avatar,

  // Button,
  // Pagination,
} from '@windmill/react-ui'
import "firebase/database";
import { db } from '../../src/firebase'
import { onValue, ref, orderByKey, query, remove } from 'firebase/database';
import "firebase/database";
import { collection, getDocs,where,onSnapshot,deleteDoc,doc } from 'firebase/firestore'
import RecpieRow from './RecpieRow';
const Recipieslist = ({ selected_user_id, handel_recipe_selection, handleback, handle_add_recipe }) => {

  const [showrecipies, setShowrecipies] = useState([]);
  const [text, setText] = useState();
  const [recipie_key, setRecipie_key] = useState('');

  // const fetchUser = () => {
  //   var withdrawRef = query(ref(db, `/recipes/${selected_user_id}`), orderByKey());
  //   onValue(withdrawRef, snapshot => {
  //     const data = snapshot.val();

  //     if (data !== null) {
  //       setShowrecipies([])
  //       Object.values(data).map(user => {
  //         setShowrecipies(oldArray => [...oldArray, user])

  //       })
  //       Object.keys(data).map(recpieid => {
  //         setRecipie_key(oldArray => [...oldArray, recpieid])
  //       })
  //     }
  //     else {

  //       setText("No recipie availabe")
  //     }
  //   });
  // }
  const fetchUser = async () => {
    const withdrawRef = query(
      collection(db, "/Users/s48rdKPmfuUcQLBxHpnP91U6MG02/recipes")
    );
  
    onSnapshot(withdrawRef, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
  console.log(data,"dataa")
      if (data.length > 0) {
        console.log(data,"datas")
        setShowrecipies(data);
        setRecipie_key(querySnapshot.docs.map((doc) => doc.id));
      } else {
        setText('No recipe available');
      }
    });
    
  }
  // recipie
  useEffect(() => {
    fetchUser();

  }, []);

  // const handleDelete = (id) => {
  //   remove(ref(db, `/recipes/${selected_user_id}/${id}`),);
  // }
  const handleDelete = (id) => {
    const recipeDocRef = doc(db, "/Users/s48rdKPmfuUcQLBxHpnP91U6MG02/recipes", id);
    deleteDoc(recipeDocRef);
   
  };
  return (

    <>
      <div className="justify-between flex bb">
        <div>
          <button onClick={() => { handleback(1) }} className="bg-slate-950  mb-5 mt-2 text-black font-bold py-4 px-4 rounded-full  dark:focus:ring-red-900">
            <IoIosArrowDropleft size='2rem'/>
          </button>
        </div>
        <div>
          <button onClick={() => handle_add_recipe(3)} className="bg-blue-700 hover:bg-blue-800 mb-5 mt-5 text-white font-bold py-2 px-4 rounded-full  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            Add Recipe
          </button>
        </div>
      </div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <TableCell>RECIPIES</TableCell>
            <TableCell>Preferences</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Edit/Delete</TableCell>
          </TableHeader>

        </Table>
        <TableFooter>
          <h1>{text}</h1>
          {/* <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable2}
            label="Table navigation"
          /> */}
        </TableFooter>
      </TableContainer>
      <div>
        {showrecipies.map((recipe, index) => (
          <div>
            <RecpieRow recipe={recipe} kiey={index} recipie_key={recipie_key[index]} handleDelete={handleDelete} selected_user_id={selected_user_id} handel_recipe_selection={handel_recipe_selection} />
          </div>
        ))}
      </div>

    </>

  )
}

export default Recipieslist