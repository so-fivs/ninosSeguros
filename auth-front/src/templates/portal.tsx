import React, { MouseEvent } from "react";
import {useAuth} from "../auth/Authenti";
import {Link} from "react-router-dom";
import { API_URL } from "../auth/constants";

interface PortalTemplate{
    children?: React.ReactNode;
}
export default function Portal({children}:PortalTemplate){
    const auth = useAuth();

    async function handleSignOut(e:MouseEvent){
        e.preventDefault();
        
        try{
            const response = await fetch(`${API_URL}/signout`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getRefreshToken()}`,
                },
            });

            if (response.ok){
                auth.signOut();
            }
        }catch (e) {
            console.log(e);
        }
    }
    return (
        <>
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/directory">Home</Link>
                    </li>
                    <li>
                        <Link to="/directory">Perfil</Link>
                    </li>
                    <li>
                        <Link to="/directory">{auth.getUser()?.username ?? ""}</Link>
                    </li>
                    <li>
                        <a href="#" onClick={handleSignOut}>
                            Sign out
                        </a>
                    </li>
                </ul>
            </nav>
        </header>

        <main className="directory">{children}</main>
    </>
    );
}