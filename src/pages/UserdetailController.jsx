// import React, { useState, useEffect } from 'react'
// import Users from './Users'
// import Test from './Test'
// import Userdetail from './Userdetail';

// const UserdetailController = () => {
//     const [selected_user_id_selection, set_selected_user_id_selection] = useState('');
//     const [selected_user_object_selection, set_selected_user_object_selection] = useState('');
//     const [page_index, set_page_index] = useState(1);
//     // function defination work of the function 
//     const handel_users_selection_detail = (id, userid) => {
//         //   set_page_index(2)
//         set_page_index(2)
//         set_selected_user_object_selection(id);
//         set_selected_user_id_selection(userid);
//         console.log(id, "user id")
//     }


//     const handlecancel = (index) => {
//         set_selected_user_id_selection('')
//         set_page_index(1)
//         console.log(index)
//     }

//     // set_selected_user_id_("hello prop")
//     return (

//         <>

//             {(selected_user_id_selection === '' && page_index === 1) && <Users handel_users_selection_detail={handel_users_selection_detail} selected_user_object_selection={selected_user_object_selection} selected_user_id_selection={selected_user_id_selection} />}
//             {(selected_user_id_selection !== '' && page_index === 2) && <Userdetail selected_user_id_selection={selected_user_id_selection} handlecancel={handlecancel} selected_user_object_selection={selected_user_object_selection} />}

//         </>
//     )
// }

// export default UserdetailController