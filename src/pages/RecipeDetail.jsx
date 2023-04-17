import React, { useState, useEffect } from "react";
import Select from "react-select";
import "firebase/database";
import { db } from '../firebase'
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import Recipieimage from "./Recipieimage";



const RecipeDetail = ({ selected_recipe, selected_user_id, selected_recipe_key, recipie_key, handlecancel }) => {
  const [image, setImage] = useState(null);
    const [image_url, setUrl] = useState(null);

    useEffect(() => {

    }, []);

    // update user
    // const update_user = () => {
    //     update(ref(db, `/Users/${selected_user_id_selection}`), selected_user_object_edit);
    //     console.log(selected_user_id_selection, "detaill");
    // }

    const handleImageChange = (e) => {
        console.log(e)
        if (e.target.files[0]) {
          setImage(e.target.files[0]);
         
        }
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
      

      <Recipieimage image_url={image_url} selected_user_id={selected_user_id} handlecancel={handlecancel} selected_recipe={selected_recipe} selected_recipe_key={selected_recipe_key} handleImageChange={handleImageChange} handleSubmit={handleSubmit} />
 
          

      {/* <button onClick={update_recipe}> update</button> */}
      {/* <h1>{printdetails}</h1> */}
    </>

  )
}

export default RecipeDetail