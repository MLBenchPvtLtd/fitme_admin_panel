import React, { useState, useEffect } from "react";
import Select from "react-select";
import "firebase/database";
import { db } from '../firebase'

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { storage } from "../firebase";
import Recipieimage from "./Recipieimage";



const RecipeDetail = ({ selected_recipe, selected_user_id, selected_recipe_key, recipie_key, handlecancel }) => {
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
    //   const handleSubmit = () => {
    //     console.log(image)
    //     const imageRef = ref(storage, "image"+image.name);
    //     uploadBytes(imageRef, image)
    //       .then(() => {
    //         getDownloadURL(imageRef)
    //           .then((url) => {
    //             setUrl(url);
    //             console.log(url)
    //           })
    //           .catch((error) => {
    //             console.log(error.message, "error getting the image url");
    //           });
    //         setImage(null);
    //       })
    //       .catch((error) => {
    //         console.log(error.message);
    //       });
    //   };
    

    const [loading, setLoading] = useState(false);
  
    const handleSubmit = () => {
      setLoading(true);
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
                  setLoading(false);
                  showAlert('Image uploaded successfully!');
                })
                .catch((error) => {
                  console.log(error.message, 'Error saving image URL to Firestore');
                  setLoading(false);
                  showAlert('Error saving image URL to Firestore');
                });
            })
            .catch((error) => {
              console.log(error.message, "error getting the image URL");
              setLoading(false);
              showAlert('Error getting the image URL');
            });
          setImage(null);
        })
        .catch((error) => {
          console.log(error.message);
          setLoading(false);
          showAlert('Error uploading the image');
        });
    };
  
    const showAlert = (message) => {
      alert(message);
      // You can also use a custom alert component to display the message in a more styled way
    };
  return (
    <>
      <Recipieimage img_url={img_url} loading={loading} selected_user_id={selected_user_id} handlecancel={handlecancel} selected_recipe={selected_recipe} selected_recipe_key={selected_recipe_key} handleImageChange={handleImageChange} handleSubmit={handleSubmit} />
    </>

  )
}

export default RecipeDetail