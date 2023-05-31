import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'

import ImageLight from '../assets/img/Login.png'
import ImageDark from '../assets/img/Login.png'
import { GithubIcon, TwitterIcon } from '../icons'
import { Label, Input, Button } from '@windmill/react-ui'

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';


function Login() {

  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        history.push("/app")
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        alert("invalid email and password")
      });

  }
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
         
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
         
            <div className="w-full">
            <h1 className='text-6xl font-bold' style={{marginBottom:"10%",color:"#009D97",fontFamily:"Nunito"}}>FitMe</h1>
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <form onSubmit={onLogin}>
                <Label>
                  <span class>Email</span>
                  <Input className="mt-1" id="email-address"
                    name="email"
                    type="email"
                    required
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)} />
                </Label>

                <Label className="mt-4 laafcolor">
                  <span>Password</span>
                  <Input className="mt-1" id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)} />
                </Label>
                <p className="mt-4 text-right">
                <Link
                  className="text-sm font-medium   hover:underline"
                  style={{color:"#00A7A1"}}
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
                <Button type="submit" className="mt-4 w-full laafcolor" style={{backgroundColor: "#00A7A1"}} >
                  Log in
                </Button>
              </form>
        
              
           
              
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
