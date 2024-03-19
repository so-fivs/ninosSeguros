import Default from "../templates/default";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/Authenti";
import { useState } from "react";
import { API_URL } from "../auth/constants";

export default function Signup() {

    const [name, setName]     = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth();

    if( auth.isAuthenticated ){
        return <Navigate to = "/directory"/>;
    }

    async function handleSubmit( e : React.FormEvent<HTMLFormElement> ){
        e.preventDefault();
        try{
            const response = await fetch( `${API_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    username,
                    password,
                }),
            });

            if (response.ok){
                console.log("Usuario creado OK");
            }else{
                console.log("Algo ocurrio");
            }

        }catch (error) {
            console.log(error);
        }
    }
    return (
        <Default>
            <form className="form" onSubmit={handleSubmit}>
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