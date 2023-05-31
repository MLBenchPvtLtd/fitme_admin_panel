import React, { useState,useEffect } from 'react'
import RecipeDetail from './RecipeDetail';
import Addrecipies from './Addrecipies'
import Fitmerecipies from '../pages/Fitmerecipies';

const RecipesListController = ({ selected_user_id, handleback, }) => {
    const [selected_recipe, set_selected_recipe] = useState('');
    const [selected_recipe_key, set_selected_recipe_key] = useState('');
    const [page_index, set_page_index] = useState(1);
    // useEffect(() => {
    //     console.log(kiey,"keyid")
    //   }, []);
  
    const handel_recipe_selection = (recipe,kiey,recipie_key) => {
        set_selected_recipe(recipe);
        set_selected_recipe_key(recipie_key)
        set_page_index(2)
    }
    const handle_add_recipe = (index,recipe,recipie_key) => {
          
        set_selected_recipe(recipe);
        set_selected_recipe_key(recipie_key)
        set_page_index(index)
  
      }
    const handlecancel = (index) => {
        set_selected_recipe('')
        set_page_index(1)
      }

    return (

        <>
            {(selected_recipe === ''  && page_index === 1) && <Fitmerecipies selected_user_id={selected_user_id}  handle_add_recipe={ handle_add_recipe} handel_recipe_selection={handel_recipe_selection} handleback={handleback} />}
            {(selected_recipe !== ''  && page_index === 2) && <RecipeDetail selected_recipe_key={selected_recipe_key}  selected_recipe={selected_recipe} handlecancel={handlecancel} selected_user_id={selected_user_id} />}
            {/* {(selected_recipe !== ''  && page_index === 3) && <Addrecipies selected_recipe_key={selected_recipe_key}  selected_recipe={selected_recipe} handlecancel={handlecancel} selected_user_id={selected_user_id} />} */}
        </>

    )
}

export default RecipesListController