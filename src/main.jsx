import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './layout/Root.jsx'
import './index.css'
import { Provider } from "react-redux"
import store from "./store/store"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AllBooks from "./features/Books/AllBooks.jsx"
import FeaturedBook from "./features/Books/FeaturedBook.jsx"
import AuthForm from "./features/Auth/AuthForm.jsx"
import Account from "./features/Account/Account.jsx"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <AllBooks />,
      },
      {
        path: '/books',
        element: <AllBooks />,
      },
      {
        path: '/books/:id',
        element: <FeaturedBook />,
      },
      {
        path: '/login',
        element: <AuthForm />,
      },
      {
        path: '/register',
        element: <AuthForm />,
      },
      {
        path: '/account',
        element: <Account />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store }>
      <RouterProvider router={ router } />
    </Provider>
  </React.StrictMode>,
)
