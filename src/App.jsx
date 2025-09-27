import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import FeedpagePage from './appPages/feedpage';
import AccountPage from './appPages/account';
import NotFoundPage from './appPages/404page';
import AppLayout from './appPages/appLayout';

import LoginPage from './authPages/login';
import RegisterPage from './authPages/register';
import AuthLayout from './authPages/authLayout';
import PostDetails from './appPages/postDetails';
import InsightsPage from './appPages/stats';
import ChangePassword from './appPages/changePass'


import ProtectedRoute from './protectedRoutes/ProtectedRoute'
import ProtectedAuthRoute from './protectedRoutes/ProtectedAuthRoute';
import { useEffect } from 'react';
import AccountLayout from './appPages/accountLayout';

const router = createBrowserRouter([
  {
    path: "/", element:<AuthLayout/>, children:[
      {
        path:"login",element:<ProtectedAuthRoute><LoginPage/></ProtectedAuthRoute>
      },
      {
        path:"register",element:<ProtectedAuthRoute><RegisterPage/></ProtectedAuthRoute>
      },
    ]
  },
  {
    path: "/", element:<AppLayout/>, children:[
      {
        index:true, element:<ProtectedRoute><FeedpagePage/></ProtectedRoute>
      },
      {
        path:"post/:id",element:<ProtectedRoute><PostDetails/></ProtectedRoute>
      },
      {
        path:"*",element:<NotFoundPage/>
      }
    ]
  },
  {
    path: "/", element:<AccountLayout/>, children:[
      {
        path:"account",element:<ProtectedRoute><AccountPage/></ProtectedRoute>
      },
      {
        path:"user/stats",element:<ProtectedRoute><InsightsPage/></ProtectedRoute>
      },
      {
        path:"user/password",element:<ProtectedRoute><ChangePassword/></ProtectedRoute>
      },
      {
        path:"*",element:<NotFoundPage/>
      }
    ]
  }

])


function App() {
  
  useEffect(()=>{
    if(!("mode" in localStorage)){
      if(window.matchMedia("(prefers-color-scheme:dark)").matches){
          document.documentElement.classList.add("dark");
          localStorage.setItem("mode","dark");
        }
      }
    else{
      if(localStorage.getItem("mode")){
        if(localStorage.getItem("mode")=="dark"){
           document.documentElement.classList.add("dark")}
        }
        else{
          document.documentElement.classList.remove("dark")}
        }
      },[])
    
    

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App