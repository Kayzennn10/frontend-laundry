import { Route, Routes } from "react-router-dom"
import Login from "../page/Login"
import Register from "../page/Register"
import DashboardAdmin from "../page/DashboardAdmin"
import DashboardClient from "../page/DashboardClient"

const Router = () => {
    return (
        <>
        <Routes> 
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboardadmin" element={<DashboardAdmin />} />
            <Route path="/dashboardclient" element={<DashboardClient />} />
        </Routes>
        </>
    )
}

export default Router