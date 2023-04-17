import React, { useState, useEffect } from 'react'
import CTA from '../components/CTA'
import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import response from '../utils/demo/tableData'
// img
import ingredients from '../../src/assets/img/Total ingredients.png'
import Totalrecipies from '../../src/assets/img/Total recipies.png'
import Totalnutrients from '../../src/assets/img/Total nutrients.png'
import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../utils/demo/chartsData'
import "firebase/database";
import { db } from '../firebase'
import { onValue, orderByKey, query, remove, set, ref, get, } from 'firebase/database';
import { storage } from "../firebase";

function Dashboard() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [userCount, setUserCount] = useState(0);
  const [recipies_count, setRecipies] = useState(0);
  const [shopping_count, set_shopping_count] = useState(0);
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
  // testing
  const fetchUser = () => {
    const usersRef = ref(db, '/Users/');
    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data !== null) {
          setUserCount(Object.values(data).length);
        }
      }
    });
    const recipesRef = ref(db, '/recipes/');
    onValue(recipesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data !== null) {
          setRecipies(Object.values(data).length);
        }
      }
    });
    const shoppingRef = ref(db, '/shopping_list/');
    onValue(shoppingRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data !== null) {
          set_shopping_count(Object.values(data).length);
        }
      }
    });
   
  }
  useEffect(() => {
    fetchUser();
    console.log(userCount, "count")
  }, []);

  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 mt-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total users" value={userCount}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total recipies" value={recipies_count}>
          <img className="mr-3" src={Totalrecipies} alt="" />
        </InfoCard>
        
        <InfoCard title="Total shoppinglists" value={shopping_count}>
          <img className="mr-3" src={Totalrecipies} alt="" />
        </InfoCard>

        <InfoCard title="Total Admin Recipies" value="35">
          <img className="mr-3" src={Totalnutrients} alt="" />
        </InfoCard>
      </div>

      {/* <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User image" />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">$ {user.amount}</span>
                </TableCell>
                <TableCell>
                  <Badge type={user.status}>{user.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
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
      </TableContainer> */}
      <PageTitle>Charts</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Revenue">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Traffic">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div>
      {/* testing */}

    </>
  )
}

export default Dashboard
