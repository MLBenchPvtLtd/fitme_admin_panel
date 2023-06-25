import React, { useState, useEffect } from "react";
import Select from "react-select";
import "firebase/database";
import { db } from '../firebase'

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { storage } from "../firebase";
import Userrecpeditcomp from "../components/users/Userrecpeditcomp";



const Userrecipedit = ({ selected_recipe, selected_user_id_selection, selected_recipe_key, recipie_key, handlecancel }) => {
  const [image, setImage] = useState(null);
  const [img_url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(selected_user_id_selection, "selected_user_id")
  }, []);

  const handleSubmit = () => {
    if (!image && !img_url) {
      showAlert('Please select an image');
      return;
    }

    setLoading(true);
    console.log(image);
    const storageRef = ref(storage, 'images/' + (image ? image.name : ''));

    // Check if the new image has the same name as the existing image
    if (img_url && image && img_url.includes(image.name)) {
      // Save the download URL to Firestore without uploading the image
      const recipeDocRef = doc(db, `/Users/${selected_user_id_selection}/recipes/${selected_recipe_key}`);
      setDoc(recipeDocRef, { img_url: img_url }, { merge: true })
        .then(() => {
          console.log('Image URL updated in Firestore');
          setLoading(false);
          showAlert('Image updated successfully!');
        })
        .catch((error) => {
          console.log(error.message, 'Error updating image URL in Firestore');
          setLoading(false);
          showAlert('Error updating image URL in Firestore');
        });
      setImage(null);
    } else {
      // Upload the new image
      if (image) {
        uploadBytes(storageRef, image)
          .then(() => {
            getDownloadURL(storageRef)
              .then((url) => {
                setUrl(url);
                console.log(url);

                // Save the download URL to Firestore
                const recipeDocRef = doc(db, `/Users/${selected_user_id_selection}/recipes/${selected_recipe_key}`);
                setDoc(recipeDocRef, { img_url: url }, { merge: true })
                  .then(() => {
                    console.log('Image uploaded successfully!');
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
                console.log(error.message, 'Error getting the image URL');
                setLoading(false);
                showAlert('Error getting the image URL');
              });
            setImage(null);
          })
          .catch((error) => {
            console.log(error.message, 'Error uploading the image');
            setLoading(false);
            showAlert('Error uploading the image');
          });
      } else {
        // Image is not selected, proceed with the existing image URL
        const recipeDocRef = doc(db, `/Users/${selected_user_id_selection}/recipes/${selected_recipe_key}`);
        setDoc(recipeDocRef, { img_url: img_url }, { merge: true })
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
      }
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const newImage = e.target.files[0];
      setImage(newImage);
    }
  };


  const showAlert = (message) => {
    alert(message);
    // You can also use a custom alert component to display the message in a more styled way
  };
  return (
    <>
      <Userrecpeditcomp img_url={img_url} loading={loading} selected_user_id={selected_user_id_selection} handlecancel={handlecancel} recipie_key={recipie_key} selected_recipe={selected_recipe} selected_recipe_key={selected_recipe_key} handleImageChange={handleImageChange} handleSubmit={handleSubmit} />
    </>

  )
}
export default Userrecipedit