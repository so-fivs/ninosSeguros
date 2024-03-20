import React from "react";
import {useAuth} from "../auth/Authenti";
import {Link} from "react-router-dom";
export default function Portal({children}:{children:React.ReactNode}){
    const auth = useAuth();

    async function handleSignOut(e:React.MouseEvent<HTMLAnchorElement>){
        e.preventDefault();
        
        try{
            const response = await fetch(`${API_URL}/signout`,{
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
                        <Link to="/me">Perfil</Link>
                    </li>
                    <li>
                        <Link to="/me">{auth.getUser()?.username ?? ""}</Link>
                    </li>
                    <li>
                        <a href="#" onClick={handleSignOut}>
                            Sign out
                        </a>
                    </li>
                </ul>
            </nav>
        </header>

        <main className="dashboard">{children}</main>
    </>
    );
}