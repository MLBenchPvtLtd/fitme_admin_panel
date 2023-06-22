import React, { useState, useEffect } from 'react'
import Recipiescomp from '../components/recipies/recipiescomp'
import "firebase/database";
import { db } from '../../src/firebase'
import { onValue, ref, orderByKey, query, remove } from 'firebase/database';
import "firebase/database";
import { collection, getDocs, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import RecpieRow from './RecpieRow';
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
  Button
} from '@windmill/react-ui'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// ...
const Fitmerecipies = ({ handel_recipe_selection }) => {
  const [showrecipies, setShowrecipies] = useState([]);
  const [text, setText] = useState();
  const [recipie_key, setRecipie_key] = useState('');
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])


  const fetchUser = async () => {
    const withdrawRef = query(
      collection(db, "/Users/wpVk9j4I16REWmlCJkviVM0EjtX2/recipes")
    );

    onSnapshot(withdrawRef, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      console.log(data, "dataa")
      if (data.length > 0) {
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
  // pagination
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

  // Handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (

    <div>
     
      <div className='pb-5'>
    {currentRecipes.length > 0 ? (
      currentRecipes.map((recipe, index) => (
        <div key={currentRecipeKeys[index]}>
       <Recipiescomp
          recipe={recipe}
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

  )
}

export default Fitmerecipies