import { id_ID } from 'faker/lib/locales';
import React, { useState } from 'react'
import RecipesListController from './RecipesListController';
import Recipies from './Recipies'
import Recipieslist from './Recipieslist'

const RecipesController = () => {

  const [selected_user_id, set_selected_user_id] = useState('');
  const [page_index, set_page_index] = useState(1);
// function defination work of the function 
  const handel_user_selection = (id) => {
    set_page_index(2)
    set_selected_user_id(id);
  }
  const handleback = (index) => {
    set_selected_user_id('')
    set_page_index(1)
    console.log(index)
  }
  return (
    <>
      {(selected_user_id === '' && page_index === 1) && <Recipies handel_user_selection={handel_user_selection} />}
      {(selected_user_id !== '' && page_index === 2) && <RecipesListController selected_user_id={selected_user_id} handleback={handleback} />}
    </>
  )
}

export default RecipesController