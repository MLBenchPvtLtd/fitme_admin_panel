import { lazy } from 'react'
import RecipesListController from '../pages/RecipesListController'
import UsersController from '../pages/UsersController'
import UserEdit from '../pages/UserEdit'
import UserdetailController from '../pages/UserdetailController'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
const users = lazy(() => import('../pages/Users'))
const Recipies = lazy(() => import('../pages/Recipies'))
const Addrecipies = lazy(() => import('../pages/Addrecipies'))

const Ingredients = lazy(() => import('../pages/Ingredients'))
const Prefrences = lazy(() => import('../pages/Prefrences'))
const Recipieslist = lazy(() => import('../pages/Recipieslist'))
const Userdetail = lazy(() => import('../pages/Userdetail'))
const Charts = lazy(() => import('../pages/Charts'))
const Buttons = lazy(() => import('../pages/Buttons'))
const Modals = lazy(() => import('../pages/Modals'))
const Tables = lazy(() => import('../pages/Tables'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))


/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/users',
    component: UsersController,
  },
  {
    path: '/users',
    component: UserdetailController,
  },
  {
    path: '/Recipies',
    component: RecipesListController,
  },
  {
    path: '/recipieslist',
    component: Recipieslist,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/buttons',
    component: Buttons,
  },
  {
    path: '/modals',
    component: Modals,
  },
  {
    path: '/tables',
    component: Tables,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
  {
    path: '/Addrecipies',
    component: Addrecipies,
  },
  {
    path: '/UserEdit',
    component: UserEdit,
  },
  {
    path: '/Userdetail',
    component:Userdetail,
  },
  {
    path: '/Ingredients',
    component:Ingredients,
  },
  {
    path: '/Prefrences',
    component:Prefrences,
  },
]

export default routes
