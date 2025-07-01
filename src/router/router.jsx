// router.jsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";
import Home from "../pages/home/Home.jsx";
import RegisterForm from "../pages/register/Register.jsx";
import LoginForm from "../pages/login/Login.jsx";
import Admin from "../pages/admin/Admin.jsx";
import AdminLayout from "../components/adminlayout/AdminLayout.jsx";
import User from "../pages/user/User.jsx";
import UserLayout from "../components/userlayout/UserLayout.jsx";
import RegistorLayout from "../components/registerlayout/RegistorLayout.jsx";
import ProtectedRoute from "../components/protectedroute/ProtectedRoute.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";

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
    element: <ProtectedRoute allowedRoles={['Admin']} />, // Protect admin routes
    children: [
      {
        path: "/admin",
        Component: AdminLayout, // AdminLayout now wraps the Admin component
        children: [
          {
            path: "/admin", // This path will be relative to the parent, so it's still "/admin"
            Component: Admin,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={['User']} />, // Protect user routes
    children: [
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
  },
  // A dedicated login route is better than nesting it under register
  {
    path: "/login",
    Component: LoginForm
  },
  {
    path: "*",
    Component: NotFound,
  }
]);