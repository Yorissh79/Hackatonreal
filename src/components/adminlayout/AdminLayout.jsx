import React from 'react'
import AdminHeader from "../adminheader/AdminHeader.jsx";
import {Outlet} from "react-router";
import AdminFooter from "../adminfooter/AdminFooter.jsx";

const AdminLayout = () => {
    return (
        <>
            <AdminHeader/>
            <Outlet/>
            <AdminFooter/>
        </>
    )
}
export default AdminLayout
