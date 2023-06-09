/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
 
 
 
 
 

  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    path: '/app/Users',
    icon: 'FormsIcon',
    name: 'All Users',
  },
  {
    path: '/app/recipies',
    icon: 'CardsIcon',
    name: 'FitMe Receipe',
  },
  {
    path: '/app/addrecipies',
    icon: 'EditIcon',
    name: 'Add FitMe Recipies',
  },
  {
    path: '/app/ingredients',
    icon: 'FormsIcon',
    name: 'Ingredients',
  },
  {
    path: '/app/prefrences',
    icon: 'MenuIcon',
    name: 'Preferences',
  }
 
 
  
  // {
  //   icon: 'PagesIcon',
  //   name: 'Pages',
  //   routes: [
  //     // submenu
  //     {
  //       path: '/login',
  //       name: 'Login',
  //     },
  //     {
  //       path: '/create-account',
  //       name: 'Create account',
  //     },
  //     {
  //       path: '/forgot-password',
  //       name: 'Forgot password',
  //     },
  //     {
  //       path: '/app/404',
  //       name: '404',
  //     },
  //     {
  //       path: '/app/blank',
  //       name: 'Blank',
  //     },
  //   ],
  // },
]

export default routes
