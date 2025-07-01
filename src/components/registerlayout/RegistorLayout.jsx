import React from 'react'
import RegisterHeader from "../registorheader/RegisterHeader.jsx";
import RegisterFooter from "../registerfooter/RegisterFooter.jsx";
import {Outlet} from "react-router";

const RegistorLayout = () => {
    return (
        <>
            {/* <RegisterHeader/> */}
            <Outlet/>
            {/* <RegisterFooter/> */}
        </>
    )
}
export default RegistorLayout
