import React, { useState, useEffect } from "react";
import { collection, getDocs, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import Swal from 'sweetalert2'
import axios from 'axios';
import recipeimg from '../../assets/img/recipieimg.png'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui'
const Recipiescomp = ({ recipe, recipie_key, kiey, handleDelete, handel_recipe_selection }) => {

  const [isModalOpen, setIsModalOpen] = useState(false)

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }


  return (
    <div className="my-5" style={{ background: "white" }} >
      <div className="py-5 px-5">

        <div className="flex justify-between">
          <div className="grid grid-1 xl:grid-cols-3 gap-4">
            <div>

              {(recipe.image_url !== '') && <img style={{ width: "100%", minWidth: "150px", maxWidth: "136px", maxHeight: "140px", }} src={recipe.img_url} alt="" />}
              {(recipe.image_url === '') && <img className='h-10  w-10 mr-2 rounded-full' src={recipeimg} alt="" />}
            </div>
            <div className="pl-5 xl:col-span-2">
              <h2 className="font-semibold text-base rounded-lg">{recipe.name}</h2>
              {recipe.ingredients && (
                <ul className="flex">
                  {recipe.ingredients.map((ingredient, index) => (
                    <p className="font-normal text-xs my-1" key={index} style={{ color: "#747474" }}>{ingredient.label},</p>
                  ))}
                </ul>
              )}

              <div className="flex pb-3">
                <p className="pr-3 text-xs font-semibold" >category <br /> <span style={{ color: "#747474" }}>{recipe.category}</span></p>
                <p className="pr-3 text-xs font-semibold" >Difficulty <br /> <span style={{ color: "#747474" }}>{recipe.make_difficulity} </span></p>
                <p className="pr-3 text-xs font-semibold" >Time Required <br /> <span style={{ color: "#747474" }}>{recipe.makeTime}</span></p>
              </div>
              <div className="flex my-2">
                <p className="pr-3 text-xs" style={{ color: "#747474" }}>Calories <br /> <span style={{ color: "black" }}>{recipe.calories}g</span></p>
                <p className="pr-3 text-xs" style={{ color: "#747474" }}>Fats <br /> <span style={{ color: "black" }}>{recipe.fat}g</span></p>
                <p className="pr-3 text-xs" style={{ color: "#747474" }}>Protein <br /> <span style={{ color: "black" }}>{recipe.protenis}g</span></p>
                <p className="pr-3 text-xs" style={{ color: "#747474" }}>Carbohydrates <br /> <span style={{ color: "black" }}>{recipe.carbohydrates}g</span></p>
              </div>
            </div>
          </div>
          <div className='flex '>


            <div><button className="mx-3 text-sm" style={{ color: "#00A7A1" }} onClick={() => handel_recipe_selection(recipe, kiey, recipie_key)}>Edit</button></div>

            <div>
              <button className="mx-2 text-sm" style={{ color: "#ED6366" }} onClick={openModal}  >Delete</button>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <ModalHeader>Delete Recipe</ModalHeader>
              <ModalBody>
                are you sure you want to delete
              </ModalBody>
              <ModalFooter>

                <div className="hidden sm:block">
                  <Button layout="outline" onClick={closeModal}>
                    Cancel
                  </Button>
                </div>
                <div className="hidden sm:block">
                  <button className="mx-2 text-sm" style={{ color: "#ED6366" }} onClick={() => handleDelete(recipie_key)}>Delete</button>
                </div>
                <div className="block w-full sm:hidden">
                  <Button block size="large" layout="outline" onClick={closeModal}>
                    Cancel
                  </Button>
                </div>
                <div className="block w-full sm:hidden">
                  <button className="mx-2 text-sm" style={{ color: "#ED6366" }} onClick={() => handleDelete(recipie_key)}>Delete</button>
                </div>
              </ModalFooter>
            </Modal>

          </div>
        </div>

        <div>
          <h2 className="font-semibold text-xl">About Recipie</h2>
          <p className="text-xs font-normal" style={{ color: "#9B9B9B" }}>{recipe.details} </p>
        </div>
      </div>
    </div>
  )
}

export default Recipiescomp