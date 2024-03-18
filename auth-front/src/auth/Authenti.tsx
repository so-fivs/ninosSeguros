import { useContext, createContext, useState, useEffect} from "react";

interface  AuthProps{
    children: React.ReactNode;
}

const AuthContext = createContext({
    isAuthenticated : false,
});
export default function Authenti({children}:AuthProps) {
    const [isAuthenticated, setIsAuthenticated] =useState(false);

    return(
        <AuthContext.Provider value = {{isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);