import {useAuth} from "../auth/Authenti";
export default function Directory() {
    const auth = useAuth();
    return <h1>Perfil de {auth.getUser()?.username || ""}</h1>;
}