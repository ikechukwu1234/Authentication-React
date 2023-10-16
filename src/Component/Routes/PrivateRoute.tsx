import {Navigate} from "react-router-dom"
import DashBoardLayout from "../Layouts/DashBoardLayout"
import Dashboard from "../Pages/Dashboard"

export const PrivateRoute = () => {
    return {
        element: <DashBoardLayout />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "*",
                element: <Navigate to='/dashboard' replace={true} />,
            },
        ],
    };
}