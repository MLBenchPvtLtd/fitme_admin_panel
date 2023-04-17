import React, { useState, useEffect } from "react";
import "firebase/database";
import { db } from '../firebase'
import Userimage from "./Userimage";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
const UserEdit = ({ selected_user_id_selection, selected_user_object_selection, handleback }) => {
    const Hotels = [
        { value: 1, label: "Coral Beach Maldives" },
        { value: 2, label: "Ilaa Beach Maldives" },
        { value: 3, label: "Finolhu" },
        { value: 4, label: "Arena" },
        { value: 5, label: "Kaani Beach Hotel" },
    ];

    const [selected_user_object_edit, set_selected_user_object_edit] = useState(selected_user_object_selection);
    const [selectedOptions, setSelectedOptions] = useState(null);
    const [image, setImage] = useState(null);
    const [image_url, setUrl] = useState(null);
    const setHandle = (e) => {
        setSelectedOptions(Array.isArray(e) ? e.map((hotel) => hotel.label) : []);
    };

    const handleChangeuser = (e) => {

        const value = e.target.value;
        set_selected_user_object_edit({
            ...selected_user_object_edit,
            [e.target.name]: value
        });
        console.log(selected_user_object_edit)
    };
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
         <Userimage image_url={image_url} handleback={handleback} selected_user_id_selection={selected_user_id_selection}  selected_user_object_selection={selected_user_object_selection} handleImageChange={handleImageChange} handleSubmit={handleSubmit}  handleChangeuser={handleChangeuser} />
 
          



        </>
    )
}

export default UserEdit