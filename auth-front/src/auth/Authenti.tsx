import { useContext, createContext, useState, useEffect} from "react";
import type {AuthResponse, User} from "../types/types";
import { API_URL } from "./constants";
import getNewAToken from "./getNewAToken";

interface  AuthProps{
    children: React.ReactNode;
}

const AuthContext = createContext({
    isAuthenticated : false,
    getAccessToken: () => {},
    getRefreshToken: () => {},
    setTokens: (_accessToken: string,_refreshToken: string) => {},
    getUser:() => ({} as User|undefined),
    saveUser: (_userData:AuthResponse) => {},
    signOut:() => {},
});
export default function Authenti({children}:AuthProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState<string>("");
    const [refreshToken, setRefreshToken] = useState<string>("");
    const [user, setUser] = useState<User | undefined>();
    const [isLoading, setIsLoading] = useState(true);



    async function requestNewAccessToken(refreshToken:string){
        //se pone el request token en otro componente, para ordenar
        const token = await getNewAToken(refreshToken);
        if (token) {
            return token;
        }
    }
    function getUser(): User | undefined {
        return user;
    }
    async function getUserInfo( accessToken: string ){
        try{
            const response = await fetch( `${API_URL}/user`, {
                method: "GET",
                //https://dev.to/oneadvanced/different-types-of-security-token-4on#:~:text=Access%20tokens%20are%20used%20in,which%20must%20be%20a%20JWT.
                headers: {
                    "Content-Type": "application/json",
                     Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.ok){
                const json = await response.json();

                if(json.error){
                    throw new Error(json.error);
                }
                return json.body;
            }else{
                throw new Error(response.statusText);
            }
        }catch (err) {
            console.log(err);
            return null;
        }
    }
    async function checkAuth(){
       try{
            if (!!accessToken) {
                //existe access token
                const userInfo = await getUserInfo(accessToken);

                if (userInfo) {
                    setUser(userInfo);
                    setAccessToken(accessToken);
                    setIsAuthenticated(true);
                    setIsLoading(false);
                    return;
                }

            } else {
                //si no existe access token
                const token = localStorage.getItem("token");
                if (token) {
                    const refreshToken = JSON.parse(token).refreshToken;
                    if (refreshToken){
                        const newAccessToken = await requestNewAccessToken(refreshToken);
                        if (newAccessToken) {
                            const userInfo = await getUserInfo(newAccessToken!);
                            if (userInfo) {
                                setUser(userInfo);
                                setAccessToken(accessToken);
                                setIsAuthenticated(true);
                                setIsLoading(false);
                                return;
                            }
                        }
                    }
                }

            }
            setIsLoading(false);
        }catch (err){
           console.log(err);
           setIsLoading(false);
       }
    }

    function setTokens(accessToken:string,refreshToken:string){
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        localStorage.setItem("token", JSON.stringify({ refreshToken }));
    }
    function getAccessToken() {
        return accessToken;
    }
    function getRefreshToken(){
        if(!!refreshToken){
            return refreshToken;
        }
        const tokenData = localStorage.getItem("token");
        if(tokenData){
            const {newRefreshToken} = JSON.parse(tokenData);
            setRefreshToken(newRefreshToken);
            return newRefreshToken;
        }else{
            return null;
        }
    }
    function saveUser(userData:AuthResponse) {
        setTokens(userData.body.accessToken,userData.body.refreshToken);
        setUser(userData.body.user);
        setIsAuthenticated(true);
    }

    function signOut(){
        localStorage.removeItem("token");
        setAccessToken("");
        setRefreshToken("");
        setUser(undefined);
        setIsAuthenticated(false);
    }
    useEffect(() => {
        checkAuth();
    }, []);
    return(
        <AuthContext.Provider
            value={{isAuthenticated,getAccessToken,setTokens,getRefreshToken,saveUser,getUser,signOut,
            }}>

            {isLoading? <div>... Cargando ...</div>:children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);