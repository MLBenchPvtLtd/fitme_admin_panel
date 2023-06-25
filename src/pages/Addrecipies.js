import React, { useState, useEffect } from "react";

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

import { storage } from "../firebase";
import Imageurl from "./Imageurl";
import { db } from '../firebase'
const Hotels = [
  { value: 1, label: "Cucumber" },
  { value: 2, label: "Onion" },
  { value: 3, label: "Red Onion" },
  { value: 4, label: "Garlic" },
  { value: 5, label: "Carrot" },
  { value: 6, label: "Red Cabbage" },
  { value: 7, label: "White Cabbage" },
  { value: 8, label: "Radish" },
  { value: 9, label: "Eggplant" },
  { value: 10, label: "Mushroom" },
  { value: 11, label: "Artichoke" },
  { value: 12, label: "Corn" },
  { value: 13, label: "Broccoli" },
  { value: 14, label: "Cauliflower" },
  { value: 15, label: "Celery" },
  { value: 16, label: "Red Chili" },
  { value: 17, label: "Green Chili" },
  { value: 18, label: "Sweet Potato" },
  { value: 19, label: "Asparagus" },
  { value: 20, label: "Pumpkin" },
  { value: 21, label: "Fennel" },
  { value: 22, label: "Spring Onion" },
  { value: 23, label: "Turnip" },
  { value: 24, label: "Lettuce" },
  { value: 25, label: "Zucchini" },
  { value: 26, label: "Brussels Sprout" },
  { value: 27, label: "Tomato" },
  { value: 28, label: "Potato" },
  { value: 29, label: "Pea" },
  { value: 30, label: "Spinach" },
  { value: 31, label: "Beetroot" },
  { value: 32, label: "Capsicum" },
  { value: 33, label: "Leek" },
  { value: 34, label: "Ginger" },
  { value: 35, label: "Squash" },
  { value: 36, label: "Coriander" },
  { value: 37, label: "Kale" },
  { value: 38, label: "Taro" },
  { value: 39, label: "Apple" },
  { value: 40, label: "Watermelon" },
  { value: 41, label: "Orange" },
  { value: 42, label: "Pear" },
  { value: 43, label: "Strawberry" },
  { value: 44, label: "Grape" },
  { value: 45, label: "Plum" },
  { value: 46, label: "Mango" },
  { value: 47, label: "Blueberry" },
  { value: 48, label: "Papaya" },
  { value: 49, label: "Apricot" },
  { value: 50, label: "Mandarin" },
  { value: 51, label: "Banana" },
  { value: 52, label: "Grapefruit" },
  { value: 53, label: "Lemon" },
  { value: 54, label: "Lime" },
  { value: 55, label: "Pineapple" },
  { value: 56, label: "Jackfruit" },
  { value: 57, label: "Melon" },
  { value: 58, label: "Coconut" },
  { value: 59, label: "Avocado" },
  { value: 60, label: "Peach" },
  { value: 61, label: "Kiwi" },
  { value: 62, label: "Blackcurrant" },
  { value: 63, label: "Blackberry" },
  { value: 64, label: "Cherry" },
  { value: 65, label: "Fig" },
  { value: 66, label: "Lychee" },
  { value: 67, label: "Nectarine" },
  { value: 68, label: "Passionfruit" },
  { value: 69, label: "Quince" },
  { value: 70, label: "Raspberry" },
  { value: 71, label: "Tangerine" },
  { value: 72, label: "Pomegranate" },
  { value: 73, label: "Mulberry" },
  { value: 74, label: "Starfruit" },
  { value: 75, label: "Guava" },
  { value: 76, label: "Pomelo" },
  { value: 77, label: "Cranberry" },
  { value: 78, label: "Rock Melon" },
  { value: 79, label: "Dragon Fruit" },
  { value: 80, label: "Rambutan" },
  { value: 81, label: "Beef" },
  { value: 82, label: "Chicken" },
  { value: 83, label: "Lamb" },
  { value: 84, label: "Veal" },
  { value: 85, label: "Fish" },
  { value: 86, label: "Prawns" },
  { value: 87, label: "Pork" },
  { value: 88, label: "Bacon" },
  { value: 89, label: "Ham" },
  { value: 90, label: "Kangaroo" },
  { value: 91, label: "Duck" },
  { value: 92, label: "Turkey" },
  { value: 93, label: "Mussels" },
  { value: 94, label: "Oysters" },
  { value: 95, label: "Scallops" },
  { value: 96, label: "Clams" },
  { value: 97, label: "Tofu" },
  { value: 98, label: "Mutton" },
  { value: 99, label: "Venison" }
];
const Addrecipies = ({ selected_user_id,handlecancel }) => {

  const [image, setImage] = useState(null);
  const [img_url, setUrl] = useState(null);
  const [newrecipe, setNewrecipe] = useState('');
  const [selectedOptions, setSelectedOptions] = useState(null);
  const setHandle = (e) => {
    setSelectedOptions(Array.isArray(e) ? e.map((hotel) => hotel.label) : []);
};
const [selectedImage, setSelectedImage] = useState(null);
const [previousImageUrl, setPreviousImageUrl] = useState(null);

const handleImageChange = (e) => {
  if (e.target.files[0]) {
    const newSelectedImage = e.target.files[0];
    if (newSelectedImage === selectedImage) {
      setSelectedImage(null);
    } else {
      setSelectedImage(newSelectedImage);
    }
  }
};



  const handleChange = (e) => {
    const value = e.target.value;
    setNewrecipe({
      ...newrecipe,
      [e.target.name]: value
    });
  };
const handleIngredientsChange = (selectedOptions) => {
  setSelectedOptions(selectedOptions);
  setNewrecipe((prevRecipe) => ({
    ...prevRecipe,
    ingredients: selectedOptions,
  }));
};

  const [loading, setLoading] = useState(false);
const handleSubmit = () => {
  if (!selectedImage) {
    alert('Image is not selected');
    return;
  }

  if (selectedImage === previousImageUrl) {
    alert('Same image is already selected');
    return;
  }

  setLoading(true);
  const storageRef = ref(storage, 'images/' + selectedImage.name);
  uploadBytes(storageRef, selectedImage)
    .then(() => {
      getDownloadURL(storageRef)
        .then((url) => {
          setUrl(url);
          console.log(url);
          setPreviousImageUrl(url); // Update the previous image URL
          setLoading(false);
          alert('Image is uploaded');
        })
        .catch((error) => {
          console.log(error.message, 'error getting the image URL');
          setLoading(false);
          alert('An error occurred while getting the image URL');
        });
    })
    .catch((error) => {
      console.log(error.message);
      setLoading(false);
      alert('An error occurred while uploading the image');
    });
};

  return (
    <>

      <Imageurl img_url={img_url} loading={loading } handlecancel={handlecancel} Hotels={Hotels} handleIngredientsChange={handleIngredientsChange} selected_user_id={selected_user_id} handleImageChange={handleImageChange} handleSubmit={handleSubmit} handleChange={handleChange} newrecipe={newrecipe} />
    </>
  )
}

export default Addrecipies

