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
import DetailPage from "../pages/Detail/DetailPage.jsx";


const RootWrapper = ({ children }) => (
  <UserProvider>{children}</UserProvider>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootWrapper><Layout /></RootWrapper>,
    children: [
      { path: "/", Component: Home },
    ],
  },
  {
    path: "/admin",
    element: (
      <RootWrapper>
        <AdminLayout />
      </RootWrapper>
    ),
    children: [
      {
        index: true,
        element: <Admin />,
      },
    ],
  },
    {
    path: "/detail/:id",
    element: (
      <RootWrapper>
        <DetailPage />
      </RootWrapper>
    ),
    children: [
      {
        index: true,
        element: <Admin />,
      },
    ],
  },
  {
    path: "/user",
    element: (
      <RootWrapper>
        <UserLayout />
      </RootWrapper>
    ),
    children: [
      {
        index: true,
        element: <User />,
      },
    ],
  },
  {
    path: "/register",
    element: <RootWrapper><RegistorLayout /></RootWrapper>,
    children: [
      { path: "signup", Component: RegisterForm },
      { path: "login", element: <LoginForm /> },
    ],
  },
  {
    path: "/login",
    element: <RootWrapper><LoginForm /></RootWrapper>,
  },
  {
    path: "*",
    element: <RootWrapper><NotFound /></RootWrapper>,
  }
]);
