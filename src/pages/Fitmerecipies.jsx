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
const Fitmerecipies = ({ handel_recipe_selection }) => {
    const [showrecipies, setShowrecipies] = useState([]);
    const [text, setText] = useState();
    const [recipie_key, setRecipie_key] = useState('');
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])


    // pagination setup
    const resultsPerPage = 3
    const totalResults = showrecipies.length
    // pagination change control
    function onPageChange(p) {
        setPage(p)
    }
    // on page change, load new sliced data
    // here you would make another server request for new data
    useEffect(() => {
        if (showrecipies.length > 0) {
            setData(showrecipies.slice((page - 1) * resultsPerPage, page * resultsPerPage));
        }
    }, [showrecipies, page])


    const fetchUser = async () => {
        const withdrawRef = query(
            collection(db, "/Users/s48rdKPmfuUcQLBxHpnP91U6MG02/recipes")
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
    const handleDelete = async (id) => {
        const recipeDocRef = doc(db, 'Users/s48rdKPmfuUcQLBxHpnP91U6MG02/recipes', id);
      
        try {
          await deleteDoc(recipeDocRef);
          console.log(id, 'idd');
          alert('Recipe deleted successfully');
          window.location.reload(); // Refresh the page
        } catch (error) {
          console.error('Error deleting recipe:', error);
          alert('An error occurred while deleting the recipe');
        }
      };
    // recipie
    useEffect(() => {
        fetchUser();

    }, []);
    return (
        <div>
            <h1 className="text-3xl font-semibold py-5"> By FitMe</h1>
            {data.length > 0 ? (
                data.map((recipe, index) => (
                    <div key={index}>
                        <Recipiescomp recipe={recipe} kiey={index} recipie_key={recipie_key[index]} handleDelete={handleDelete} handel_recipe_selection={handel_recipe_selection} />
                    </div>
                ))
            ) : (
                <p>No recipe found.</p>
            )}
            {data.length > 0 ? (
                <TableFooter>
                    <Pagination
                        totalResults={totalResults}
                        resultsPerPage={resultsPerPage}
                        label="Table navigation"
                        onChange={onPageChange}
                    />
                </TableFooter>
            ) : (
                <p></p>
            )}

        </div>
    )
}

export default Fitmerecipies