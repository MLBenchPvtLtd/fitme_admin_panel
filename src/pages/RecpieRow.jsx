import React, { useState,useEffect} from 'react'
import "firebase/database";

import RecipeDetail from './RecipeDetail';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  remove,
  Button,
  Pagination,
} from '@windmill/react-ui'
import { db } from '../firebase'
// img
import u from '../../src/assets/img/user.png'
import { EditIcon, TrashIcon } from '../icons'
import "firebase/database";
import { onValue, ref,  set, query, update, } from 'firebase/database';

const RecpieRow = ({ recipe, kiey, handel_recipe_selection,selected_recipe,selected_user_id,recipie_key,handleDelete }) => {


  return (
    <>


      <div className="border w-12/12 rounded-lg ...  my-5">
        <div className="px-5 py-5">

          <Table>
            <TableHeader>

            </TableHeader>
            <TableBody>

              <TableRow >
                <TableCell>
                  <div className="flex items-center text-sm">
                    {/* <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User avatar" /> */}

                    <img className='h-10  w-10 mr-2' src={recipe.image_url} alt="" />
                    <div>
                      <p className="font-semibold">{recipe.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 w-64 truncate ">{recipe.details}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{recipe.type}</span>
                </TableCell>
                <TableCell>
                  <Badge > {recipe.updated_at} </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-4 " >


                    {/* you just need to pass this id to new RecipiesList */}


                    <Button layout="link" size="icon" aria-label="Edit" onClick={() => { handel_recipe_selection(recipe,kiey,recipie_key) }}>
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete">
                      <TrashIcon className="w-5 h-5" aria-hidden="true" onClick={() => handleDelete(recipie_key)} />
                    </Button>

                  
                  </div>
                </TableCell>
              </TableRow>

            </TableBody>


            {/* recipisee */}


          </Table>
          <div className="py-5">

            <div className="grid grid-cols-1  lg:grid-cols-4 auto-rows-max  ">


              <div className="col-span-3 ...">
                <div className="px-5">
                <h1 className="px-5 py-2 font-bold"> User Name : {recipe.userName}</h1>
                  <h1 className="px-5 py-3 font-bold"> Difficulty : {recipe.make_difficulity}</h1>

                  <p className="font-normal"> <span className="font-bold"> Description :</span>
                  {recipe.details}
                    </p>
                </div>
              </div>

              {/* colmen2 */}
              <div className=" content-center">
                <h1 className="font-bold text-2xl mb-5 mt-4"> Food Nutrients</h1>
                <div className=" mb-3 font-semibold flex w-full ">  <p className="w-9/12 ">Calories</p> <p>{recipe.calories}%</p> </div>
                <div className=" mb-3 font-semibold flex w-full ">  <p className="w-9/12 ">Protenis</p> <p>{recipe.protenis}%</p> </div>
                <div className=" mb-3 font-semibold flex w-full ">  <p className="w-9/12 ">Fat</p> <p>{recipe.fat}%</p> </div>
                <div className=" mb-3 font-semibold flex w-full ">  <p className="w-9/12 ">Carbohydrates</p> <p>{recipe.carbohydrates}%</p> </div>
              </div>


            </div>

          </div>


        </div>
      </div>




    </>
  )
}

export default RecpieRow