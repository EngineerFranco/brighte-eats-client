import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Register from "../pages/Register";
import Home from "../pages/Home";
import LeadDashboard from "../pages/LeadDashboard";
import Edit from "../pages/Edit";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/dashboard/register",
                element: <Register/>
            },
            {
                path: "/about",
                element: <About/>
            },
            {
                path: "/dashboard/lead",
                element: <LeadDashboard/>
            },
            {
                path: "/dashboard/edit/:id",
                element: <Edit/>
            }

        ]
    }
])


export default router;