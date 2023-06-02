import React, { useState, useEffect } from 'react'
import Users from './Users'
import Userrecipedit from './Userrecipedit'
import Userdetail from './Userdetail';

const UserdetailController = ({selected_user_object_selection,handleback,selected_user_id_selection}) => {
 

    const [selected_recipe, set_selected_recipe] = useState('');
    const [selected_recipe_key, set_selected_recipe_key] = useState('');
    const [page_index, set_page_index] = useState(1);
    // function defination work of the function 
   
   
    useEffect(() => {
        console.log(handel_recipe_selection,"handel_recipe_selection")
      }, []);
      const handlecancel = (index) => {
        set_selected_recipe('')
        set_page_index(1)
      }
      const handel_recipe_selection = (recipe,kiey,recipie_key) => {
        set_selected_recipe(recipe);
        set_selected_recipe_key(recipie_key)
        console.log(recipie_key,"key")
        set_page_index(2)
    }
    // set_selected_user_id_("hello prop")
    return (

        <>
      {(selected_recipe === '' && page_index === 1) && <Userdetail handleback={handleback} selected_recipe={selected_recipe} selected_recipe_key={selected_recipe_key} selected_user_object_selection={selected_user_object_selection} handel_recipe_selection={handel_recipe_selection} selected_user_id_selection={selected_user_id_selection}  />}
         {(selected_recipe !== ''  && page_index === 2) && <Userrecipedit handlecancel={handlecancel} selected_recipe={selected_recipe} selected_recipe_key={selected_recipe_key} handel_recipe_selection={handel_recipe_selection}  selected_user_id_selection={selected_user_id_selection} />}
            
        </>
    )
}

export default UserdetailController