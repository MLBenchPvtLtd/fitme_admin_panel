import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
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
import { EditIcon, TrashIcon } from '../icons'
import { BsFillEyeFill } from "@react-icons/all-files/bs/BsFillEyeFill";
import "firebase/database";
import { collection, getDocs } from 'firebase/firestore'
const Firestorecrud = () => {
    const [users, setUsers] = useState([])
    const userCollectionRef = collection(db, "Users")
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
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


    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(userCollectionRef)
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            console.log(data, "data")
        };
        getUsers()
    }, []);

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
                                        <img className='h-10  w-10 mr-2' src={user.image_url} alt="" />
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
                                        <BsFillEyeFill className="w-5 h-5 mx-3" aria-hidden="true" />
                                    </Button>
                                    <Button layout="link" size="icon" aria-label="Edit"  >
                                        <EditIcon className="w-5 h-5 mx-3" aria-hidden="true" />
                                    </Button>
                                    <Button layout="link" size="icon" aria-label="Delete" >
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

export default Firestorecrud