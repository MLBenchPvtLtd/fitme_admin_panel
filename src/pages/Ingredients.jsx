import React, { useState, useEffect } from 'react';
import img from '../assets/img/peanut.png'
import { db } from '../firebase'
import "firebase/database";
import { collection, query, onSnapshot, getDocs } from 'firebase/firestore';
const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientscount, setIngredientscount] = useState([]);
  const userCollectionRef = collection(db, 'Users', 's48rdKPmfuUcQLBxHpnP91U6MG02', 'recipes')

  const fetchUser = async () => {
    const querySnapshot = await getDocs(userCollectionRef);
    const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log(data, "dataa");
    setIngredients(data);
    const dataLength = querySnapshot.size;
    setIngredientscount(dataLength)
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>

      <h1 className="my-5 font-semibold text-3xl" >Ingredients</h1>
      <h2 className="mb-4 font-medium text-xl ml-3" style={{ color: "#737373" }}> Total Ingredients: {ingredientscount}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        {ingredients.map((ingredient, index) => (
          <p className="my-5 text-center mx-5 rounded-lg" style={{ backgroundColor: "white" }}>  <p className=' py-3 font-medium text-base' >{ingredient.details}</p></p>
        ))}
      </div>

    </div>

  )
}

export default Ingredients