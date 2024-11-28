import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = ({ isAuthenticated }) => {

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectRoute;
