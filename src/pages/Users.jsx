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
import noprofileimg from '../assets/img/noprofile.png'
import { db } from '../firebase'
import "firebase/database";
import { collection, query, onSnapshot, getDocs } from 'firebase/firestore';

const Users = ({ handel_users_selection, handleDelete }) => {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, "Users")

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
  const fetchUser = async () => {
    const querySnapshot = await getDocs(userCollectionRef);
    const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setUsers(data);

  }

  useEffect(() => {
    fetchUser();
  }, []);

  // const handle_id = (id) => {
  // console.log(handel_users_id,"prop")
  // }
 
  return (
    <>
      <div className=" ">
        <PageTitle>Users</PageTitle>
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableCell>User</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Detail</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {users.map((user, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      {/* <Avatar className="hidden mr-3 md:block" src={user.name} alt="User image" /> */}
                      {(user.image_url  !== '' ) &&      <img className='h-10  w-10 mr-2 rounded-full' src={user.image_url} alt="" />}
                      {(user.image_url  === '' ) &&      <img className='h-10  w-10 mr-2 rounded-full' src={noprofileimg} alt="" />}
                   
                      <div>
                        <p className="text-lg font-semibold">{user.user_name}</p>
                        <p className="text-sm font-normal text-gray-600 dark:text-gray-400">{user.user_email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-base font-medium">{user.user_email}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className="text-base font-medium">{user.phone}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-base font-medium"> {user.age}</span>
                  </TableCell>


                  <TableCell>
                    <button className="btn font-medium text-sm rounded" onClick={() => handel_users_selection(user, user.firebase_id, 3)} style={{ width: "100.57px", height: "30.5px", color: "#7D7D7D", border: "1px solid #7D7D7D" }}> View Detail</button>

                    {/* <Button layout="link"  size="icon" aria-label="Edit" onClick={() => handel_users_selection(user, user.firebase_id,2)} >
                    <EditIcon className="w-5 h-5 mx-3" aria-hidden="true" />
                  </Button>
                  <Button layout="link" size="icon" aria-label="Delete" onClick={() =>  handleDelete(user.firebase_id)}>
                    <TrashIcon className="w-5 h-5 mx-3" aria-hidden="true" />
                  </Button> */}
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

      </div>

    </>
  )
}

export default Users



