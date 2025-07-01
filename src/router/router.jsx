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
import { UserProvider } from "../context/UserContext.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", Component: Home }],
  },
  {
    path: "/admin",
    element: (
        <AdminLayout />
    ),
    children: [
      {
        index: true,
        element: (
            <Admin />
        ),
      },
    ],
  },
  {
    path: "/user",
    element: (
        <UserLayout />
    ),
    children: [
      {
        index: true,
        element: (
            <User />
        ),
      },
    ],
  },
  {
    path: "/register",
    element: <RegistorLayout />,
    children: [
      { path: "signup", Component: RegisterForm },
      { path: "login", element: <LoginForm /> },
    ],
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);
