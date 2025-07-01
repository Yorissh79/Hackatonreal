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

// Root component that wraps everything with UserProvider
const RootWrapper = ({ children }) => (
    <UserProvider>
      {children}
    </UserProvider>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootWrapper><Layout /></RootWrapper>,
    children: [
      {
        path: "/",
        Component: Home,
      }
    ],
  },
  {
    path: "/admin",
    element: (
        <RootWrapper>
          <ProtectedRoute allowedRoles={['admin']} />
        </RootWrapper>
    ),
    children: [
      {
        path: "/admin",
        Component: AdminLayout,
        children: [
          {
            index: true, // This makes it the default route for /admin
            Component: Admin,
          },
        ],
      },
    ],
  },
  {
    path: "/user",
    element: (
        <RootWrapper>
          <ProtectedRoute allowedRoles={['user']} />
        </RootWrapper>
    ),
    children: [
      {
        path: "/user",
        Component: UserLayout,
        children: [
          {
            index: true, // This makes it the default route for /user
            Component: User,
          },
        ],
      },
    ],
  },
  {
    path: "/register",
    element: <RootWrapper><RegistorLayout /></RootWrapper>,
    children: [
      {
        path: "signup", // relative path, so it becomes /register/signup
        Component: RegisterForm,
      },
      {
        path: "login", // relative path, so it becomes /register/login
        element: <RootWrapper><LoginForm /></RootWrapper>,
      },
    ],
  },
  {
    path: "/login",
    element: <RootWrapper><LoginForm /></RootWrapper>
  },
  {
    path: "*",
    element: <RootWrapper><NotFound /></RootWrapper>,
  }
]);