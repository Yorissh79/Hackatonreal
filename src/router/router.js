import { createBrowserRouter } from "react-router";
import Layout from "../components/layout/Layout.jsx";
import Home from "../pages/home/Home.jsx";
import RegisterForm from "../pages/register/Register.jsx";
import LoginForm from "../pages/login/Login.jsx";
import Admin from "../pages/admin/Admin.jsx";
import adminLayout from "../components/adminlayout/AdminLayout.jsx";
import User from "../pages/user/User.jsx";
import UserLayout from "../components/userlayout/UserLayout.jsx";
import RegistorLayout from "../components/registerlayout/RegistorLayout.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        Component: Home,
      }
    ],
  },
  {
    path: "/admin",
    Component: adminLayout,
    children: [
      {
        path: "/admin",
        Component: Admin,
      },
    ],
  },
  {
    path: "/user",
    Component: UserLayout,
    children: [
      {
        path: "/user",
        Component: User,
      },
    ],
  },
  {
    path: "/register",
    Component: RegistorLayout,
    children: [
      {
        path: "/register/signup",
        Component: RegisterForm,
      },
      {
        path: "/register/login",
        Component: LoginForm,
      },
    ],
  }
]);
