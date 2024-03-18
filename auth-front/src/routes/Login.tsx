import Default from "../templates/default";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/Authenti";
import { useState } from "react";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth();

    if(auth.isAuthenticated){
        return <Navigate to = "/directory"/>;
    }

    return (
        <Default>
            <form className="form">
                <h1>Login</h1>
                <label>Usuario:</label>
                <input type="text"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                />

                <label>Contraseña:</label>
                <input type="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                />

                <button>Iniciar sesión</button>

            </form>
        </Default>
    );
}