import {Outlet, Navigate} from "react-router-dom";
import {useState} from "react";
export default function Protect() {
    const [isAuth, setIsAuth] = useState(false);

    //if isAuth = True continue else login redirect
    return isAuth ? <Outlet /> : <Navigate to = "/" />;
}

