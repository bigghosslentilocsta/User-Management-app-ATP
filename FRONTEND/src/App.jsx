import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './components/RootLayout'
import Home from './components/Home'
import AddUser from './components/AddUser'
import UserList from './components/UserList'
import User from './components/User'

function App() {
  const routerObj=createBrowserRouter([{
    path:"/",
    element:<RootLayout/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"Home",
        element:<Home/>
      },
      {
        path:"AddUser",
        element:<AddUser/>
      },
      {
        path:"UserList",
        element:<UserList/>
      }
    ]
  }
])

    return <RouterProvider router={routerObj} />
  
}

export default App