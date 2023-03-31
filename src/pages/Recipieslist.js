// import id from 'faker/lib/locales/id_ID';
import React, { useState, useEffect } from 'react'
import "firebase/database";
import RecipeDetail from './RecipeDetail';
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
import { onValue, ref, orderByKey, query,remove } from 'firebase/database';
import RecpieRow from './RecpieRow';
const Recipieslist = ({ selected_user_id, handel_recipe_selection, handleback }) => {

  const [showrecipies, setShowrecipies] = useState([]);
  const [text, setText] = useState();
  const [recipie_key, setRecipie_key] = useState('');

  const fetchUser = () => {
    var withdrawRef = query(ref(db, `/recipes/${selected_user_id}`), orderByKey());
    onValue(withdrawRef, snapshot => {
      const data = snapshot.val();

      if (data !== null) {
        setShowrecipies([])
        Object.values(data).map(user => {
          setShowrecipies(oldArray => [...oldArray, user])

        })
        Object.keys(data).map(recpieid => {
          setRecipie_key(oldArray => [...oldArray, recpieid])
        })  
      }
      else {

        setText("No recipie availabe")
      }
    });
  }
  // recipie
  useEffect(() => {
    fetchUser();

  }, []);

const handleDelete = (id) => {
    remove(ref(db, `/recipes/${selected_user_id}/${id}`),);
}
  return (

    <>
      <div>
        <button onClick={() => { handleback(1) }} class="bg-red-700 hover:bg-red-800 mb-5 mt-5 text-white font-bold py-2 px-4 rounded-full  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
          Back
        </button>
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