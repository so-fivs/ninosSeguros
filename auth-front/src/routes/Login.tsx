import Default from "../templates/default";
import { useState } from "react";
export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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