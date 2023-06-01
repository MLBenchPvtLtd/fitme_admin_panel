import React, { useState, useEffect } from "react";
import Select from "react-select";
import "firebase/database";
import { db } from '../firebase'

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { storage } from "../firebase";
import Recipieimage from "./Recipieimage";



const Userrecipedit = ({ selected_recipe, selected_user_id, selected_recipe_key, recipie_key, handlecancel }) => {
  const [image, setImage] = useState(null);
    const [img_url, setUrl] = useState(null);

    useEffect(() => {
      console.log(selected_recipe,"recp")
    }, []);

    const handleImageChange = (e) => {
        console.log(e)
        if (e.target.files[0]) {
          setImage(e.target.files[0]);
         
        }
      };
 const checkkeyy = () => {
    console.log(selected_recipe_key);
 }

const handleSubmit = () => {
  console.log(image);
  const storageRef = ref(storage, "images/" + image.name);

  uploadBytes(storageRef, image)
    .then(() => {
      getDownloadURL(storageRef)
        .then((url) => {
          setUrl(url);
          console.log(url);

          // Save the download URL to Firestore
          const recipeDocRef = doc(db,  `/Users/s48rdKPmfuUcQLBxHpnP91U6MG02/recipes/${selected_recipe_key}`);
          setDoc(recipeDocRef, { img_url: url }, { merge: true })
            .then(() => {
              console.log('Image URL saved to Firestore');
            })
            .catch((error) => {
              console.log(error.message, 'Error saving image URL to Firestore');
            });
        })
        .catch((error) => {
          console.log(error.message, "error getting the image URL");
        });
      setImage(null);
    })
    .catch((error) => {
      console.log(error.message);
    });
};
  return (
    <>
    <button style={{color:"black"}} onClick={checkkeyy}>checkkeyy</button>
      <Recipieimage img_url={img_url} selected_user_id={selected_user_id} handlecancel={handlecancel} recipie_key={recipie_key} selected_recipe={selected_recipe} selected_recipe_key={selected_recipe_key} handleImageChange={handleImageChange} handleSubmit={handleSubmit} />
    </>

  )
}
export default Userrecipedit