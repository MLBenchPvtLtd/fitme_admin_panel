import React from 'react'
import routes from '../../routes/sidebar'
import { NavLink, Route } from 'react-router-dom'
import * as Icons from '../../icons'
import SidebarSubmenu from './SidebarSubmenu'
import { Button } from '@windmill/react-ui'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useHistory } from 'react-router-dom';

function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

function SidebarContent() {
  const history = useHistory();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Logout successful
        history.push('/login'); // Redirect to the login page or any other desired page
      })
      .catch((error) => {
        console.log('Logout error:', error);
        // Handle any logout errors
      });
  };
  return (
    <div className="py-4 text-gray-500 ">
      <a className="ml-6 text-2xl font-bold  " href="#">
         <span className="text-teal-400">Diet</span> Planner
      </a>
      <ul className="mt-6 pt-6">
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className="relative px-6 py-3" key={route.name}>
              <NavLink
                exact
                to={route.path}
                className=" inline-flex items-center w-full text-sm font-semibold transition-colors duration-150  "
                activeClassName="text-teal-400"
              >
                <Route path={route.path} exact={route.exact}>
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                </Route>
                <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
                <span className="ml-4">{route.name}</span>
              </NavLink>
            </li>
          )
        )}
      </ul>
     
    </div>
  )
}

export default SidebarContent
