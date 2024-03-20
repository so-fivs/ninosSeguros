import {useAuth} from "../auth/Authenti";
import {useState, useEffect} from "react";
import { API_URL } from "../auth/constants";

interface Todo {
    id:string,
    title:string,
    completed: boolean;
}


export default function Directory() {
    const auth = useAuth();

    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        loadTodos();
    }, []);

    async function loadTodos(){
        const accessToken = auth.getAccessToken();
        try{
            const response = await fetch(`${API_URL}/todos`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                const json = await response.json();
                setTodos(json);
                console.log(json);
            }else{
                //error de conexion
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Perfil de {auth.getUser()?.username || ""}</h1>
            {todos.map((post: Todo) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.completed}</p>
                </div>
            ))}

        </div>
    );
}