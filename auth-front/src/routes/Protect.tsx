import {Outlet, Navigate} from "react-router-dom";
import {useAuth} from "../auth/Authenti";

export default function Protect() {
    const auth = useAuth();

    //if isAuth = True continue else login redirect
    return auth.isAuthenticated ? <Outlet /> : <Navigate to = "/" />;
}

