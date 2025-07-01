import React from "react";
import { Outlet } from "react-router";
import UserHeader from "../userheader/UserHeader";

const UserLayout = () => {
  return (
    <>
      <UserHeader />
      <Outlet />
    </>
  );
};
export default UserLayout;
