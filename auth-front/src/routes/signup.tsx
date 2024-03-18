import Default from "../templates/default";
import { useState } from "react";
export default function Signup() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Default>
            <form className="form">
                <h1>Signup</h1>
                <label>Nombre:</label>
                <input type="text"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                />

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

                <button>Crear Usuario</button>

            </form>
        </Default>
    );
}