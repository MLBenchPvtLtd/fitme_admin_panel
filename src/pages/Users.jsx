import React, { useState, useEffect } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import response from '../utils/demo/tableData'
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  // Avatar,
  Badge,
  Pagination,
  Button
} from '@windmill/react-ui'

import { Link } from 'react-router-dom'
import "firebase/database";
import { db } from '../firebase'
import { onValue, ref, orderByKey, query,remove } from 'firebase/database';
// img
import u from '../../src/assets/img/user.png'
import { EditIcon, TrashIcon } from '../icons'
import { BsFillEyeFill } from "@react-icons/all-files/bs/BsFillEyeFill";

const Users = ({ handel_users_selection,handleDelete }) => {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [users, setUsers] = useState([]);

  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length
  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }
  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  }, [page])

  // fetching data from firebase
  const fetchUser = () => {
    var withdrawRef = query(ref(db, `/Users/`), orderByKey());
    onValue(withdrawRef, snapshot => {
      const data = snapshot.val();
      if (data !== null) {
        setUsers([])
        Object.values(data).map(user => {
          setUsers(oldArray => [...oldArray, user])
        })
      }
    });
  }

  useEffect(() => {

    fetchUser();
  }, []);

  // const handle_id = (id) => {
  // console.log(handel_users_id,"prop")
  // }

  return (
    <>
      <PageTitle>Users</PageTitle>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {users.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    {/* <Avatar className="hidden mr-3 md:block" src={user.name} alt="User image" /> */}
                    <img className='h-10  w-10 mr-2' src={u} alt="" />
                    <div>
                      <p className="font-semibold">{user.user_name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.user_email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm"> {user.age}</span>
                </TableCell>
                <TableCell>
                  <Badge >{user.phone}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.user_email}</span>
                </TableCell>

                <TableCell>
                
                    <Button layout="link" size="icon" aria-label="eye">
                      <BsFillEyeFill className="w-5 h-5 mx-3" aria-hidden="true" onClick={() => handel_users_selection(user, user.firebase_id,3)} />
                    </Button>
               
                  <Button layout="link" size="icon" aria-label="Edit" onClick={() => handel_users_selection(user, user.firebase_id,2)} >
                    <EditIcon className="w-5 h-5 mx-3" aria-hidden="true" />
                  </Button>
                  <Button layout="link" size="icon" aria-label="Delete" onClick={() =>  handleDelete(user.firebase_id)}>
                    <TrashIcon className="w-5 h-5 mx-3" aria-hidden="true" />
                  </Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>


    </>
  )
}

export default Users



