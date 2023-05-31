import React, { useState,useEffect } from 'react'
import Users from './Users'
import Userdetail from './Userdetail'
import UserdetailController from './UserdetailController'
import UserEdit from './UserEdit';
import { onValue, ref, orderByKey, query,remove } from 'firebase/database';
import { db } from '../firebase'
import RecipeDetail from './RecipeDetail'
const UsersController = ({}) => {
  const [selected_user_id_selection, set_selected_user_id_selection] = useState('');
  const [selected_user_object_selection, set_selected_user_object_selection] = useState('');
  const [selected_recipe, set_selected_recipe] = useState('');
  const [selected_recipe_key, set_selected_recipe_key] = useState('');
  const [page_index, set_page_index] = useState(1);
  // function defination work of the function 
  const handel_users_selection = (id,userid,index) => {
    //   set_page_index(2)
    set_page_index(index)
    set_selected_user_object_selection(id);
    set_selected_user_id_selection(userid);
  }
  const handleDelete = (id) => {
    remove(ref(db, `/Users/${id}`),);
}
  const handleback = (index) => {
    set_selected_user_id_selection('')
    set_page_index(1)
    console.log(index)
  }
  useEffect(() => {
 
  }, []);

  
  // set_selected_user_id_("hello prop")
  return (
    <>

      {(selected_user_id_selection === ''&& page_index === 1) && <Users handel_users_selection={handel_users_selection} handleDelete={handleDelete} selected_user_object_selection={selected_user_object_selection}  selected_user_id_selection={selected_user_id_selection} />}

      {(selected_user_id_selection !== '' && page_index === 3) && <UserdetailController handleback={handleback} selected_user_id_selection={selected_user_id_selection} handlecancel={handleback} selected_user_object_selection={selected_user_object_selection} />}
  
    </>
  )
}

export default UsersController