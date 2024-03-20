import { useContext, createContext, useState, useEffect} from "react";
import type {AuthResponse, AccessTokenResponse, User} from "../types/types";
import { API_URL } from "./constants";

interface  AuthProps{
    children: React.ReactNode;
}

const AuthContext = createContext({
    isAuthenticated : false,
    getAccessToken: () => {},
    getRefreshToken: () => {},
    getUser:() => ({} as User|undefined),
    saveUser: (userData:AuthResponse) => {},
});
export default function Authenti({children}:AuthProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState<string>("");
    const [user, setUser] = useState<User>();

    useEffect(() => {
        checkAuth();
    }, []);

    async function requestNewAccessToken(refreshToken:string){
        try{
            const response = await fetch( `${API_URL}/refreshtoken`, {
                method: "POST",
                //https://dev.to/oneadvanced/different-types-of-security-token-4on#:~:text=Access%20tokens%20are%20used%20in,which%20must%20be%20a%20JWT.
                headers: {
                    "Content-Type": "application/json",
                     Authorization: `Bearer ${refreshToken}`,
                },
            });
            if (response.ok){
                const json = (await response.json()) as AccessTokenResponse;
                if(json.error){
                    throw new Error(json.error);
                }
                return json.accessToken;
            }else{
                throw new Error(response.statusText);
            }
        }catch (err) {
            console.log(err);
            return null;
        }
    }
    function getUser(){
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
        if(accessToken){

        }else{
            const token = getRefreshToken();
            if (token){
                const newAccessToken = await requestNewAccessToken(token);
                if (newAccessToken){
                    const userInfo = await getUserInfo(newAccessToken);
                    if (userInfo){
                       saveSessionInfo(userInfo,newAccessToken,token);

                    }
                }
            }

        }
    }
    function saveSessionInfo(userInfo:User, accessToken :string, refreshToken:string){

        setAccessToken(accessToken);
        localStorage.setItem("token", JSON.stringify(refreshToken));
        setIsAuthenticated(true);
        setUser(userInfo);
    }
    function getAccessToken() {
        return accessToken;
    }
    function getRefreshToken():string|null {
        const tokenData = localStorage.getItem("token");
        if(tokenData){
            const token = JSON.parse(tokenData);
            return token;
        }else{
            return null;
        }
    }
    function saveUser(userData:AuthResponse) {
        saveSessionInfo(userData.body.user,
                        userData.body.accessToken,
                        userData.body.refreshToken
        );
    }
    return(
        <AuthContext.Provider value = {{isAuthenticated, getAccessToken, getRefreshToken, saveUser, getUser}}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);