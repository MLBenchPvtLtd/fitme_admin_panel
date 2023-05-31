import React from 'react'
import recipeimg from '../../assets/img/recipieimg.png'
import { collection, getDocs,where,onSnapshot,deleteDoc,doc } from 'firebase/firestore'
const recipiescomp = ({recipe,recipie_key,kiey,handleDelete,handel_recipe_selection}) => {

  return (
    <div className="my-5" style={{ background: "white" }} >
      <div className="py-5 px-5">

        <div className="flex justify-between">
          <div className="grid grid-1 xl:grid-cols-3 gap-4">
            <div><img style={{width:"100%", minWidth:"150px",maxWidth: "136px",maxHeight:"140px", }} src={recipe.img_url} alt="" /></div>
            <div className="pl-5 xl:col-span-2">
              <h2 className="font-semibold text-base rounded-lg">{recipe.name}</h2>
              <p className="font-normal text-xs my-1" style={{ color: "#747474" }}>Beef/mutton mignon,</p>
              <div className="flex pb-3">
                <p className="pr-3 text-xs font-semibold" >category <span style={{ color: "#747474" }}>{recipe.category}</span></p>
                <p className="pr-3 text-xs font-semibold" >Difficulty <span style={{ color: "#747474" }}>{recipe.make_difficulity} </span></p>
                <p className="pr-3 text-xs font-semibold" >Time Required <span style={{ color: "#747474" }}>{recipe.makeTime}</span></p>
              </div>
              <div className="flex my-2">
                <p className="pr-3 text-xs" style={{ color: "#747474" }}>Calories <span style={{ color: "black" }}>{recipe.calories}g</span></p>
                <p className="pr-3 text-xs" style={{ color: "#747474" }}>Fats <span style={{ color: "black" }}>{recipe.fat}g</span></p>
                <p className="pr-3 text-xs" style={{ color: "#747474" }}>Protein <span style={{ color: "black" }}>{recipe.protenis}g</span></p>
                <p className="pr-3 text-xs" style={{ color: "#747474" }}>Carbohydrates <span style={{ color: "black" }}>{recipe.carbohydrates}g</span></p>
              </div>
            </div>
          </div>
          <div className='flex '>
            <div><button className="mx-3 text-sm" style={{ color: "#00A7A1" }} onClick={() =>  handel_recipe_selection(recipe,kiey,recipie_key) }>Edit</button></div>
            <div><button className="mx-2 text-sm" style={{ color: "#ED6366" }} onClick={() => handleDelete(recipie_key)}>Delete</button></div>
          </div>
        </div>

<div>
  <h2 className="font-semibold text-xl">About Recipie</h2>
  <p className="text-xs font-normal" style={{color: "#9B9B9B"}}>{recipe.details} </p>
</div>
      </div>
    </div>
  )
}

export default recipiescomp