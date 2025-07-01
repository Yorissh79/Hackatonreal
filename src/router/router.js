import { createBrowserRouter } from "react-router";
import Layout from "../components/layout/Layout.jsx";
import Home from "../pages/home/Home.jsx";
import RegisterForm from "../pages/register/Register.jsx";
import LoginForm from "../pages/login/Login.jsx";
import Admin from "../pages/admin/Admin.jsx";
import adminLayout from "../components/adminlayout/AdminLayout.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/register",
        Component: RegisterForm,
      },
      {
        path: "/login",
        Component: LoginForm,
      },
    ],
  },
  {
    path: "/admin",
    Component: adminLayout,
    children: [
      {
        path: "/",
        Component: Admin,
      }
    ]
  }
]);
