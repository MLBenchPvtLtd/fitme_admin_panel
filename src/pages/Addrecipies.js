import React, { useState, useEffect } from "react";

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

import { storage } from "../firebase";
import Imageurl from "./Imageurl";
import { db } from '../firebase'
const Hotels = [
  { value: 1, label: "Cucumber" },
  { value: 2, label: "Onion" },
];
const Addrecipies = ({ selected_user_id,handlecancel }) => {

  const [image, setImage] = useState(null);
  const [img_url, setUrl] = useState(null);
  const [newrecipe, setNewrecipe] = useState('');
  const [selectedOptions, setSelectedOptions] = useState(null);
  const setHandle = (e) => {
    setSelectedOptions(Array.isArray(e) ? e.map((hotel) => hotel.label) : []);
};
  const handleImageChange = (e) => {
    console.log(e)
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
     
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
    if (image) {
      setLoading(true); // Start the loading state
      const storageRef = ref(storage, 'images/' + image.name);
      uploadBytes(storageRef, image)
        .then(() => {
          getDownloadURL(storageRef)
            .then((url) => {
              setUrl(url);
              console.log(url);
              setImage(null);
              setLoading(false); // Stop the loading state
              alert('Image is uploaded');
            })
            .catch((error) => {
              console.log(error.message, 'error getting the image URL');
              setLoading(false); // Stop the loading state
              alert('An error occurred while getting the image URL');
            });
        })
        .catch((error) => {
          console.log(error.message);
          setLoading(false); // Stop the loading state
          alert('An error occurred while uploading the image');
        });
    } else {
      alert('Image is not selected');
    }
  };

  return (
    <>

      <Imageurl img_url={img_url} loading={loading } handlecancel={handlecancel} Hotels={Hotels} handleIngredientsChange={handleIngredientsChange} selected_user_id={selected_user_id} handleImageChange={handleImageChange} handleSubmit={handleSubmit} handleChange={handleChange} newrecipe={newrecipe} />
    </>
  )
}

export default Addrecipies

