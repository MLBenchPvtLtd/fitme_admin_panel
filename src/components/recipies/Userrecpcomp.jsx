import React, { useState } from 'react';
import recipeimg from '../../assets/img/recipieimg.png'
import { collection, getDocs, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import Swal from 'sweetalert2'
import axios from 'axios';
import { db } from '../../firebase'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui'
const Userrecpcomp = ({ recipe, recipie_key, kiey,selected_user_id_selection, handel_recipe_selection }) => {
  const userCollectionRef = collection(db, 'Users', selected_user_id_selection, 'recipes')
    const handleDelete = async  (id) => {
        const recipeDocRef = doc(userCollectionRef, id);

        try {
            await deleteDoc(recipeDocRef);
            console.log(id, 'idd');
            alert('Recipe deleted successfully');
        } catch (error) {
            console.error('Error deleting recipe:', error);
            alert('An error occurred while deleting the recipe');
        }
    };

const [isModalOpen, setIsModalOpen] = useState(false)

function openModal() {
  setIsModalOpen(true)
}

function closeModal() {
  setIsModalOpen(false)
}

//   const delete_id = id;
//   console.log(delete_id);

//   Swal.fire({
//     title: 'Are you sure?',
//     text: "You won't be able to recover this data!",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Yes, delete it!',
//   }).then((result) => {
//     if (result.isConfirmed) {
//       axios
//         .post(`/app/recipies/${delete_id}`, {
//           _token: '{{ csrf_token() }}',
//           id: delete_id,
          
//         })
//         .then((response) => {
//           Swal.fire('Deleted!', 'recipie has been deleted.', 'success').then((result) => {
//             window.location.href = '/app/recipies';
//           });
//         })
//         .catch((error) => {
//           console.error('Error deleting video:', error);
//         });
//     }
//   });
// };
  return (
    <div className="my-5" style={{ background: "white" }} >
      <div className="py-5 px-5">

        <div className="flex justify-between">
          <div className="grid grid-1 xl:grid-cols-3 gap-4">
            <div><img style={{ width: "100%", minWidth: "150px", maxWidth: "136px", maxHeight: "140px", }} src={recipe.img_url} alt="" /></div>
            <div className="pl-5 xl:col-span-2">
              <h2 className="font-semibold text-base rounded-lg">{recipe.name}</h2>
              <p className="font-normal text-xs my-1" style={{ color: "#747474" }}>Beef/mutton mignon,</p>
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

export default Userrecpcomp