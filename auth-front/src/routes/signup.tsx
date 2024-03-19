import Default from "../templates/default";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/Authenti";
import { useState } from "react";
import { API_URL } from "../auth/constants";
import { AuthResponseError } from "../types/types";

export default function Signup() {

    const [name, setName]     = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");
    const auth = useAuth();
    const goTo = useNavigate();

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
                setErrorResponse("");
                goTo("/");
            }else{
                console.log("Algo ocurrio");
                const json = (await response.json()) as AuthResponseError;
                setErrorResponse(json.body.error);
                return;
            }

        }catch (error) {
            console.log(error);
        }
    }
    return (
        <Default>
            <form className="form" onSubmit={handleSubmit}>
                <h1>Signup</h1>
                {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
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