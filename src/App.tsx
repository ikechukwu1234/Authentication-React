import React, {useContext} from 'react'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import { PublicRoute } from './Component/Routes/PublicRoutes'
import { PrivateRoute } from './Component/Routes/PrivateRoute'
import { GlobalContext } from './Component/Services/GlobalContext'


const App:React.FC= () => {
  const {isAuthenticated} = useContext(GlobalContext);

  const router = createBrowserRouter([
    isAuthenticated ? PrivateRoute(): {},
    ...PublicRoute(),
  ]);

  return  <RouterProvider router = {router} />
}

export default App
