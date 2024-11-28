import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectAdminRoute = ({ isAdmin }) => {
    return isAdmin ? <Outlet /> : <Navigate to="/home" />;
};


export default ProtectAdminRoute