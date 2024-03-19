import Default from "../templates/default";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/Authenti";
import { useState } from "react";
import { API_URL } from "../auth/constants";
import { AuthResponseError } from "../types/types";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");  const [errorResponse, setErrorResponse] = useState("");
    const auth = useAuth();
    const goTo = useNavigate();

    async function handleSubmit( e : React.FormEvent<HTMLFormElement> ){
        e.preventDefault();
        try{
            const response = await fetch( `${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (response.ok){
                console.log("Incio de sesion OK");
                setErrorResponse("");
                goTo("/directory");
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

    if( auth.isAuthenticated ){
        return <Navigate to = "/directory"/>;
    }

    return (
        <Default>
            <form className="form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
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