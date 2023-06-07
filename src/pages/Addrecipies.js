import React, { useState, useEffect } from "react";

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

import { storage } from "../firebase";
import Imageurl from "./Imageurl";
import { db } from '../firebase'
const Addrecipies = ({ selected_user_id,handlecancel }) => {

  const [image, setImage] = useState(null);
  const [img_url, setUrl] = useState(null);
  const [newrecipe, setNewrecipe] = useState('');
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


  //   console.log(image)
  //   const imageRef = ref(storage, "image"+image.name);
  //   uploadBytes(imageRef, image)
  //     .then(() => {
  //       getDownloadURL(imageRef)
  //         .then((url) => {
  //           setUrl(url);
  //           console.log(url)
  //         })
  //         .catch((error) => {
  //           console.log(error.message, "error getting the image url");
  //         });
  //       setImage(null);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };

  const handleSubmit = () => {
    if (image) {
      console.log(image, 'image uploaded');
      const storageRef = ref(storage, 'images/' + image.name);
  
      uploadBytes(storageRef, image)
        .then(() => {
          getDownloadURL(storageRef)
            .then((url) => {
              setUrl(url);
              console.log(url);
              setImage(null);
              alert('Image is uploaded');
            })
            .catch((error) => {
              console.log(error.message, 'error getting the image URL');
              alert('An error occurred while getting the image URL');
            });
        })
        .catch((error) => {
          console.log(error.message);
          alert('An error occurred while uploading the image');
        });
    } else {
      alert('Image is not selected');
    }
  };

  return (
    <>

      <Imageurl img_url={img_url} handlecancel={handlecancel} selected_user_id={selected_user_id} handleImageChange={handleImageChange} handleSubmit={handleSubmit} handleChange={handleChange} newrecipe={newrecipe} />
    </>
  )
}

export default Addrecipies

