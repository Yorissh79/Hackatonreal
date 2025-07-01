import {createBrowserRouter} from "react-router";
import Layout from "../components/layout/Layout.jsx";
import Home from "../pages/home/Home.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            {
                path: '/',
                Component: Home
            }
        ]
    }
])