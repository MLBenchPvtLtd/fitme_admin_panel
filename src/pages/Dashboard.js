import React, { useState, useEffect } from 'react'
import CTA from '../components/CTA'
import InfoCard from '../components/Cards/InfoCard'
import InfoCard2 from '../components/Cards/InfoCard2'
import InfoCard3 from '../components/Cards/InfoCard3'
import InfoCard4 from '../components/Cards/InfoCard4'
import ChartCard from '../components/Chart/ChartCard'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import response from '../utils/demo/tableData'
// chart
// img
import steak from '../assets/img/steak.png'
import ingredients from '../../src/assets/img/ingredient.png'
import Totalrecipies from '../../src/assets/img/Total recipies.png'
import Totusers from '../../src/assets/img/totalusers.png'
import Totalnutrients from '../../src/assets/img/nutrients.png'
import { Bar } from 'react-chartjs-2'
import {
  barLegends,
} from '../utils/demo/chartsData'
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
} from '@windmill/react-ui'
import { collection, query, where, getDoc, doc, getDocs, orderBy } from 'firebase/firestore';

import { db } from '../firebase'
import "firebase/database";
import noprofileimg from '../assets/img/noprofile.png'

function Dashboard() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [userCount, setUserCount] = useState(0);
  const [recipies_count, set_recipies_count] = useState(0);
  const [adminrecipies_count, set_admin_recipies_count] = useState(0);
  const [users, setUsers] = useState([])
  const [recipes, set_recipes] = useState([])
  const userCollectionRef = collection(db, "Users")
  const recipeCollectionRef = collection(db, "recipes")
  const adminrecipeCollectionRef = collection(db, "/Users/wpVk9j4I16REWmlCJkviVM0EjtX2/recipes")
  const [recipesByMonth, setRecipesByMonth] = useState("");
  const [userByMonth, setUserByMonth] = useState("");
  const [recipesMonthName, setRecipesMonthName] = useState("");

  // pagination setup
  const resultsPerPage = 10
  const totalResults = users.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    if (users.length > 0) {
      setData(users.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    }
  }, [users, page])
  // testing

  const getUsers = async () => {
    const querySnapshot = await getDocs(userCollectionRef);
    const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setUsers(data);
    const dataLength = querySnapshot.size;
    setUserCount(dataLength)

  };
  const getRecipes = async () => {
    const querySnapshot = await getDocs(recipeCollectionRef);
    const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log(data)
    set_recipes(data);
    const dataLength = querySnapshot.size;
    set_recipies_count(dataLength)
  };
  const getRecipesadmin = async () => {
    const querySnapshot = await getDocs(adminrecipeCollectionRef);
    const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const dataLength = querySnapshot.size;
    set_admin_recipies_count(dataLength)
  };
  // sort array

  const fetchRecipesByMonth = async () => {

    try {
      const recipesRef = collection(db, 'recipes');
      const q = query(recipesRef, orderBy('created_at', 'asc'));
      const querySnapshot = await getDocs(q);
      const fetchedRecipes = [];

      querySnapshot.forEach((doc) => {
        const recipe = doc.data();
        fetchedRecipes.push(recipe);
      });

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const monthsToRetrieve = [];
      const monthNames = [];

      // Generate an array of the current month and previous five months
      for (let i = 0; i < 6; i++) {
        const month = currentMonth - i;
        const monthString = String(month).padStart(2, '0');
        const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(currentDate.getFullYear(), month - 1));
        monthsToRetrieve.unshift(monthString);
        monthNames.unshift(monthName);
      }

      // Create an object to store the counts for the selected months
      const recipesCountByMonth = {};

      // Initialize the counts for the selected months to 0
      monthsToRetrieve.forEach((month) => {
        recipesCountByMonth[month] = 0;
      });

      // Count the recipes by month
      fetchedRecipes.forEach((recipe) => {
        const createdDate = new Date(recipe.created_at * 1000);
        const month = String(createdDate.getMonth() + 1).padStart(2, '0');

        // Increment the count if the month is in the selected months
        if (monthsToRetrieve.includes(month)) {
          recipesCountByMonth[month]++;
        }
      });

      // Get the counts of objects created in each month as an array
      const recipesCountArray = monthsToRetrieve.map((month) => recipesCountByMonth[month]);

      setRecipesByMonth(
        recipesCountArray

      );
      console.log(recipesCountArray, "recipies array")
      setRecipesMonthName(monthNames.slice(0, recipesCountArray.length))
      console.log(monthNames.slice(0, recipesCountArray.length), "name")
    } catch (error) {
      console.log('Error fetching recipes:', error);
    }
  };

  const fetchUsersByMonth = async () => {
    try {
      const recipesRef = collection(db, 'Users');
      const q = query(recipesRef, orderBy('created_at', 'asc'));
      const querySnapshot = await getDocs(q);
      const fetchedRecipes = [];

      querySnapshot.forEach((doc) => {
        const recipe = doc.data();
        fetchedRecipes.push(recipe);
      });

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const monthsToRetrieve = [];
      const monthNames = [];

      // Generate an array of the current month and previous five months
      for (let i = 0; i < 6; i++) {
        const month = currentMonth - i;
        const monthString = String(month).padStart(2, '0');
        const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(currentDate.getFullYear(), month - 1));
        monthsToRetrieve.unshift(monthString);
        monthNames.unshift(monthName);
      }

      // Create an object to store the counts for the selected months
      const recipesCountByMonth = {};

      // Initialize the counts for the selected months to 0
      monthsToRetrieve.forEach((month) => {
        recipesCountByMonth[month] = 0;
      });

      // Count the recipes by month
      fetchedRecipes.forEach((recipe) => {
        const createdDate = new Date(recipe.created_at * 1000);
        const month = String(createdDate.getMonth() + 1).padStart(2, '0');

        // Increment the count if the month is in the selected months
        if (monthsToRetrieve.includes(month)) {
          recipesCountByMonth[month]++;
        }
      });

      // Get the counts of objects created in each month as an array
      const recipesCountArray = monthsToRetrieve.map((month) => recipesCountByMonth[month]);

      setUserByMonth(
        recipesCountArray
      );
      // Perform data fetching only if the component is still mounted

      console.log(recipesCountArray, "users")
    } catch (error) {
      console.log('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    getUsers();
    getRecipes();
    getRecipesadmin();
    fetchRecipesByMonth();
    fetchUsersByMonth();

  }, []);

  const option = {
    responsive: true,
    plugins: {
      legend: { position: "chartArea" },
      title: {
        display: true,
        text: "Modular Bar Chart",
      },
    },
  };

  const dataa = {
    labels: recipesMonthName,
    datasets: [
      {
        label: "Users",
        data: userByMonth,
        backgroundColor: "#7e3af2",
      },
      {
        label: 'Recipies',
        data: recipesByMonth,
        backgroundColor: '#0694a2'
      },

    ],

  };

  return (
    <>
    
      <PageTitle>Welcome Back </PageTitle>
      <p style={{ color: "#8E8E9B" }}>We’re glad you’re here, let’s get started.</p>

      <div className="App">

      </div>

      <div className="grid lg:grid-cols-5 xl:grid-cols-4 md:grid-cols-5 grid-cols-1 gap-4 px-0">

        <div className=" md:col-span-3 lg:col-span-3 xl:col-span-3">
          {/* <!-- Cards --> */}
          <div className="grid gap-6 mb-8 mt-8 md:grid-cols-2 xl:grid-cols-4">

            <InfoCard title="Total recipies" style={{ background: "#F8D6DA" }} value={recipies_count}>
              <img className="mr-3" src={Totalrecipies} alt="" />
            </InfoCard>

            <InfoCard2 title="Total users" value={userCount}>
              <img className="mr-3" src={Totusers} alt="" />
            </InfoCard2>

            <InfoCard3 title="Total Ingredients" value={recipies_count * 4}>
              <h1>{recipes.created_at}</h1>
              <img className="mr-3" src={ingredients} alt="" />
            </InfoCard3>

            <InfoCard4 title=" Admin Recipies" value={adminrecipies_count}>
              <img className="mr-3" src={Totalnutrients} alt="" />
            </InfoCard4>
          </div>

          <div className="my-5 ">
            {/* {recipesByMonth !== null && (
              <ChartCard className="max-h-32" title="Bars">
                <Bar style={{ maxHeight: "200px" }} options={option} data={dataa}   />
                <ChartLegend style={{ maxHeight: "200px" }} legends={barLegends} />
              </ChartCard>
            )}
         */}
            {userByMonth !== "" && recipesMonthName !== "" && recipesByMonth !== "" && (
              <ChartCard className="max-h-32" title="Bars">
                <Bar style={{ maxHeight: "100px" }} options={option} data={dataa} />
                <ChartLegend style={{ maxHeight: "100px" }} legends={barLegends} />
              </ChartCard>

            )}
          </div>


          <TableContainer>
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>User</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Email</TableCell>
                </tr>
              </TableHeader>

              <TableBody>
                {data.map((user, i) => (
                  <TableRow key={i} className="">
                    <TableCell className="">
                      <div className="flex items-center text-sm">
                        {/* <Avatar className="hidden mr-3 md:block" src={user.name} alt="User image" /> */}

                        {(user.image_url !== '') && <img className='h-10  w-10 rounded-full mr-2' src={user.image_url} alt="" />}
                        {(user.image_url === '') && <img className='h-10  w-10 mr-2 rounded-full' src={noprofileimg} alt="" />}
                        <div>
                          <p className="font-semibold">{user.user_name}</p>
                          <p className="text-xs text-gray-600 ">{user.user_email}</p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge>{user.phone}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{user.age}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{user.user_email}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>


            </Table>
            {data.length > 0 ? (
              <TableFooter>
                <Pagination
                  totalResults={totalResults}
                  resultsPerPage={resultsPerPage}
                  label="Table navigation"
                  onChange={onPageChange}
                />
              </TableFooter>
            ) : (
              <p></p>
            )}

          </TableContainer>


        </div>
        {/* col 2 */}
        <div className=" lg:col-span-2 md:col-span-2 xl:col-span-1">
          <h1 className="text-2xl my-5 pt-2 font-medium" style={{}}>Nutrients</h1>
          <h2 className="calories mb-3 px-5 py-5 font-semibold text-xl rounded-md w-full" style={{ background: "gainsboro" }}> Calories</h2>
          <h2 className="calories mb-3 px-5 py-5 font-semibold text-xl rounded-md w-full" style={{ background: "gainsboro" }}> Protenis</h2>
          <h2 className="calories mb-3 px-5 py-5 font-semibold text-xl rounded-md w-full" style={{ background: "gainsboro" }}> Fat</h2>
          <h2 className="calories mb-3 px-5 py-5 font-semibold text-xl rounded-md w-full" style={{ background: "gainsboro" }}> Carbohydrates</h2>

          <h1 className="text-2xl my-5 pt-2 font-medium" style={{}}>FitMe Recipies</h1>


          <div className=" grid xl:grid-cols-2  grid-cols-1">
            <div className="div text-center rounded-lg mb-5" style={{ width: "95%", background: "gainsboro" }}>
              <div className="px-3 py-3">
                <div className=" mb-2">  <img style={{ marginLeft: "40%" }} src={steak} alt="" /></div>
                <h3 className='font-bold text-base'>Steak mignon </h3>
                <p className="my-3 font-normal text-xs" style={{ color: "#A2A2A2" }}>Beef/Mutton Mignon, Black Pepper, Olive Oil, Butter, Rosemary</p>
                <div className="flex justify-between"> <p className='text-sm' style={{ color: "#A2A2A2" }}>30min</p> <p className='text-sm' style={{ color: "#A2A2A2" }}>Meat</p></div>

              </div>
            </div>
            {/* 2nd */}

            <div className="div text-center rounded-lg mb-5" style={{ width: "95%", background: "gainsboro" }}>
              <div className="px-3 py-3">
                <div className=" mb-2">  <img style={{ marginLeft: "40%" }} src={steak} alt="" /></div>
                <h3 className='font-bold text-base'>Steak mignon </h3>
                <p className="my-3 font-normal text-xs" style={{ color: "#A2A2A2" }}>Beef/Mutton Mignon, Black Pepper, Olive Oil, Butter, Rosemary</p>
                <div className="flex justify-between"> <p className='text-sm' style={{ color: "#A2A2A2" }}>30min</p> <p className='text-sm' style={{ color: "#A2A2A2" }}>Meat</p></div>

              </div>
            </div>

          </div>


        </div>
      </div>

    </>
  )
}

export default Dashboard
