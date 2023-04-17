import React, { useState, useEffect } from 'react'
import SectionTitle from '../components/Typography/SectionTitle'
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  // Avatar,
  // remove,
  // Button,
  Pagination,
} from '@windmill/react-ui'
import "firebase/database";
import { db } from '../../src/firebase'
import { onValue, ref, orderByKey, query } from 'firebase/database';
// img
import response from '../utils/demo/tableData'

// make a copy of the data, for the second table
const response2 = response.concat([])

function Recipies({ handel_user_selection }) {
  /**
   * DISCLAIMER: This code could be badly improved, but for the sake of the example
   * and readability, all the logic for both table are here.
   * You would be better served by dividing each table in its own
   * component, like Table(?) and TableWithActions(?) hiding the
   * presentation details away from the page view.
   */
  const [users, setUsers] = useState([]);
  // setup pages control for every table
  const [pageTable1, setPageTable1] = useState(1)
  const [pageTable2, setPageTable2] = useState(1)
  // setup data for every table
  const [dataTable1, setDataTable1] = useState([])
  const [dataTable2, setDataTable2] = useState([])
  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length
  // pagination change control
  function onPageChangeTable1(p) {
    setPageTable1(p)
  }
  // pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p)
  }
  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable1(response.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
  }, [pageTable1])

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable2(response2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
  }, [pageTable2])

  // feyching dataa from fire base
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
  // recipie
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {/* 
      <Recipieslist name={'Ammar'} />
      <div>
        <Button primary onClick={() => parentToChild(1, "Ammar")}>Click Parent</Button>
      </div> */}
      <SectionTitle>Table with actions</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Users</TableCell>
              <TableCell>Phone no</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Email address</TableCell>
             
            </tr>
          </TableHeader>
          <TableBody>
            {users.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    {/* <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User avatar" /> */}

                    <img className='h-10  w-10 mr-2' src={user.image_url} alt="" />
                    <div>
                      <p className="font-semibold ">{user.user_name}a</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.user_email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium">$ {user.phone}</span>
                </TableCell>
                <TableCell>
                  <Badge type={user.status} className="font-medium">{user.age}</Badge>
                </TableCell>
                <TableCell>
                  {/* <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span> */}
                  <span className="text-sm font-medium">{user.user_email}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4" >


                    {/* you just need to pass this id to new RecipiesList */}


                    <button type="" layout="link" size="icon" aria-label="Edit" className="font-semibold text-xs" onClick={() => handel_user_selection(user.firebase_id)}>
                    View Recipes  </button>

                   
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>


          {/* recipisee */}


        </Table>
        <TableFooter>









          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable2}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>


      {/* show single recipe  */}




    </ >
  )
}

export default Recipies
