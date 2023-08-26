import React from 'react';
import ReactDOM from 'react-dom/client';
import News from './News';
import reportWebVitals from './reportWebVitals';
import AddNew from './AddNew';
import App from './App';
import Login from './Login'
import {createBrowserRouter,createRoutesFromElements, Link, Outlet, Route, RouterProvider } from 'react-router-dom'
import SignUp from './SignUp';
import AdminPage from './AdminPage';
import "./index.css"
import * as serviceWorker from './serviceWorker';


import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <News/>,
//   },
//   {
//     path: '/Add',
//     element: <AddNew /> ,
//   },
//   {
//     path: '/Login',
//     element: <Login/> ,
//   },
//   {
//     path: '/SignUp',
//     element: <SignUp/> ,
//   },
//   {
//     path: '/Admin',
//     element: <AdminPage/> ,
//   }
// ]);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
serviceWorker.unregister();
