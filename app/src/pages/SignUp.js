import React, {useState} from "react";

import { LockClosedIcon } from '@heroicons/react/solid'

import { useNavigate } from 'react-router-dom';

function SignUp() {
  let navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    name: '',
    password: '',
    password2: '',
    contact: ''
  })

  const emailInputChange = (val) => {
    setData({
      ...data,
      email: val
    })
  }

  const nameInputChange = (val) => {
    setData({
      ...data,
      name: val
    })
  }

  const passwordInputChange = (val) => {
    setData({
      ...data,
      password: val
    })
  }

  const password2InputChange = (val) => {
    setData({
      ...data,
      password2: val
    })
  }

  const contactInputChange = (val) => {
    setData({
      ...data,
      contact: val
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const handleSignUp = async(email, password, password2, name, contact) => {
    console.log(data.password)
    console.log(data.password2)
    if(password !== password2) {
      window.alert("Passwords don't match")
      return
    }

    try {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, password: password, name: name, contact: contact })
      }
  
    let response = await fetch(
      `http://172.105.73.209:5000/user/signUp`, requestOptions
      );
    
    let json = await response.json();

  
    navigate("/", { replace: true });
    return json;
  } catch (error) {
    console.error(error);
  }
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Full name"
                  onChange={e => nameInputChange(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={e => emailInputChange(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="contact" className="sr-only">
                  Contact
                </label>
                <input
                  id="contact"
                  name="contact"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Contact"
                  onChange={e => contactInputChange(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={e => passwordInputChange(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm password"
                  onChange={e => password2InputChange(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button onClick={() => {handleSignUp(data.email, data.password, data.password2, data.name, data.contact)}}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;