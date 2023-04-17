import React, { useState, useEffect } from "react";

import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import Imageurl from "./Imageurl";
const Addrecipies = ({ selected_user_id,handlecancel }) => {

  const [image, setImage] = useState(null);
  const [image_url, setUrl] = useState(null);
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

  const handleSubmit = () => {
    console.log(image)
    const imageRef = ref(storage, "image"+image.name);
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
            console.log(url)
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


  return (
    <>

      <Imageurl image_url={image_url} handlecancel={handlecancel} selected_user_id={selected_user_id} handleImageChange={handleImageChange} handleSubmit={handleSubmit} handleChange={handleChange} newrecipe={newrecipe} />
    </>
  )
}

export default Addrecipies

