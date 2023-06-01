import React, { useState, useEffect } from 'react'
import Recipiescomp from '../components/recipies/recipiescomp'
import "firebase/database";
import { db } from '../../src/firebase'
import { onValue, ref, orderByKey, query, remove } from 'firebase/database';
import "firebase/database";
import { collection, getDocs, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import RecpieRow from './RecpieRow';
const Fitmerecipies = ({handel_recipe_selection}) => {
    const [showrecipies, setShowrecipies] = useState([]);
    const [text, setText] = useState();
    const [recipie_key, setRecipie_key] = useState('');
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
    const handleDelete = (id) => {
        const recipeDocRef = doc(db, "/Users/s48rdKPmfuUcQLBxHpnP91U6MG02/recipes", id);
        deleteDoc(recipeDocRef);
console.log(id,"idd")
    };
    // recipie
    useEffect(() => {
        fetchUser();

    }, []);
    return (
        <div>
            <h1 className="text-3xl font-semibold py-5"> By FitMe</h1>
            {showrecipies.map((recipe, index) => (
                <div>
                    <Recipiescomp recipe={recipe} kiey={index} recipie_key={recipie_key[index]} handleDelete={handleDelete} handel_recipe_selection={handel_recipe_selection} />
                </div>
            ))}

        </div>
    )
}

export default Fitmerecipies