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

  let fruites_name_array = ["apple", "Watermelon", "Orange", "Pear", "Strawberry", "Grape", "Plum", "Mango", "Blueberry", "Papaya", "Apricot", "Mandarin", "Banana", "Grapefruit", "Lemon", "Lime", "Pineapple", "Jackfruit", "Melon", "Coconut", "Avocado", "Peach", "Kiwi", "Blackcurrant", "Blackberry", "Cherry", "Fig", "Lychee", "Nectarine", "Passionfruit", "Quince", "Raspberry", "Tangerine", "Pomegranate", "Mulberry", "Starfruit", "Guava", "Pomelo", "Cranberry", "Rock Melon", "Dragon Fruit", "Rambutan"]
  let vegetables_name_array = ["Cucumber", "Onion", "Red Onion", "Garlic", "Carrot", "Red Cabbage", "White Cabbage", "Radish", "Eggplant", "Mushroom", "Artichoke", "Corn", "Broccoli", "Cauliflower", "Celery", "Red Chili", "Green Chili", "Sweet Potato", "Asparagus", "Pumpkin", "Fennel", "Spring Onion", "Turnip", "Lettuce", "Zucchini", "Brussels Sprout", "Tomato", "Potato", "Pea", "Spinach", "Beetroot", "Capsicum", "Leek", "Ginger", "Squash", "Coriander", "Kale", "Taro"] 
  let meats_name_array = ["Beef", "Chicken", "Lamb", "Veal", "Fish", "Prawns", "Pork", "Bacon", "Ham", "Kangaroo", "Duck", "Turkey", "Mussels", "Oysters", "Scallops", "Clams", "Tofu", "Mutton", "Venison"]
  const sumLength = fruites_name_array.length + vegetables_name_array.length + meats_name_array.length;

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>

      <h1 className="my-5 font-semibold text-3xl" >Ingredients</h1>
      <h2 className="mb-4 font-medium text-xl ml-3" style={{ color: "#737373" }}> Total Ingredients: {sumLength}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        {fruites_name_array.map((ingredient, index) => (
          <p className="my-5 text-center mx-5 rounded-lg" style={{ backgroundColor: "white" }}>  <p className=' py-3 font-medium text-base' >{ingredient}</p></p>
        ))}
          {vegetables_name_array.map((ingredient, index) => (
          <p className="my-5 text-center mx-5 rounded-lg" style={{ backgroundColor: "white" }}>  <p className=' py-3 font-medium text-base' >{ingredient}</p></p>
        ))}
          {meats_name_array.map((ingredient, index) => (
          <p className="my-5 text-center mx-5 rounded-lg" style={{ backgroundColor: "white" }}>  <p className=' py-3 font-medium text-base' >{ingredient}</p></p>
        ))}
      </div>

    </div>

  )
}

export default Ingredients