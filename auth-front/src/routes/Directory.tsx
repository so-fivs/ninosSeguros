import {useAuth} from "../auth/Authenti";
import {useState, useEffect} from "react";
import { API_URL } from "../auth/constants";
import Portal from "../templates/portal";

interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

export default function Directory() {
    const auth = useAuth();
    const [title, setTitle] = useState("");
    const [todos, setTodos] = useState<Todo[]>([]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        createTodo();
    }

    async function createTodo(){
        try{
            const response = await fetch(`${API_URL}/todos`,  {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getAccessToken()}`,
                },
                body: JSON.stringify({title}),
            });

            if (response.ok) {
                const json = (await response.json()) as Todo;
                setTodos([...todos, json]);
            }

        } catch (error) {
            console.log(error);
        }

    }

    async function loadTodos(){
        const accessToken = auth.getAccessToken();
        try{
            const response = await fetch(`${API_URL}/todos`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                const json = await response.json();
                setTodos(json);
                console.log(json);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadTodos();
    }, []);

    return (
        <Portal>
        <div className="dashboard">
            <h1>Perfil de {auth.getUser()?.username ?? ""}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text"
                       placeholder="Nuevo item..."
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                />
            </form>
            {todos.map((todo: Todo) => (
                <div key={todo.id}>
                    <h3>{todo.title}</h3>
                    <p>{todo.completed}</p>
                </div>
            ))}
        </div>
        </Portal>
    );
}