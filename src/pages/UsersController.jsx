import React, { useState,useEffect } from 'react'
import Users from './Users'
import Userdetail from './Userdetail'
import UserEdit from './UserEdit';
import { onValue, ref, orderByKey, query,remove } from 'firebase/database';
import { db } from '../firebase'
const UsersController = () => {
  const [selected_user_id_selection, set_selected_user_id_selection] = useState('');
  const [selected_user_object_selection, set_selected_user_object_selection] = useState('');
  const [page_index, set_page_index] = useState(1);
  // function defination work of the function 
  const handel_users_selection = (id,userid,index) => {
    //   set_page_index(2)
    set_page_index(index)
    set_selected_user_object_selection(id);
    set_selected_user_id_selection(userid);
    console.log(id, "user id")
  }
  const handleDelete = (id) => {
    remove(ref(db, `/Users/${id}`),);
    console.log(id,"delete")
}
  const handleback = (index) => {
    set_selected_user_id_selection('')
    set_page_index(1)
    console.log(index)
  }

  // set_selected_user_id_("hello prop")
  return (
    <>
      {(selected_user_id_selection === ''&& page_index === 1) && <Users handel_users_selection={handel_users_selection} handleDelete={handleDelete} selected_user_object_selection={selected_user_object_selection}  selected_user_id_selection={selected_user_id_selection} />}
      {(selected_user_id_selection !== '' && page_index === 2) && <UserEdit selected_user_id_selection={selected_user_id_selection} handleback={handleback} selected_user_object_selection={selected_user_object_selection} />}
      {(selected_user_id_selection !== '' && page_index === 3) && <Userdetail selected_user_id_selection={selected_user_id_selection} handlecancel={handleback} selected_user_object_selection={selected_user_object_selection} />}

    </>
  )
}

export default UsersController