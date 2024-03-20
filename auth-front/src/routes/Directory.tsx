import {useAuth} from "../auth/Authenti";
import {useState, useEffect} from "react";
import { API_URL } from "../auth/constants";

interface Todo {
    _id:string,
    idUser: string,
    title:string,
    completed: boolean;
}


export default function Directory() {
    const auth = useAuth();
    const [title, setTitle] = useState("");
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        loadTodos();
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        createTodo();
    }

    async function createTodo(){
        const accessToken = auth.getAccessToken();
        try{
            const response = await fetch(`${API_URL}/todos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({title}),
            });

            if (response.ok) {
                const json = await response.json();
                setTodos([json, ...todos]);
            }else{
                //error de conexion
            }

        } catch (error) {
            console.log(error);
        }

    }

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
            <form onSubmit={handleSubmit}>
                <input type="text"
                       placeholder="Nuevo item..."
                       onChange={(e) => setTitle(e.target.value)}
                       value={title}
                />
            </form>
            {todos.map((todo) => (
                <div key = {todo._id}>
                    <h3>{todo.title}</h3>
                </div>
            ))}

        </div>
    );
}