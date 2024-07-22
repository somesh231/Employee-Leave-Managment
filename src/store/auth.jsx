import { useContext, useEffect, useState } from "react";
import {createContext} from "react";
export const AuthContext = createContext();



export const AuthProvider = ({children})=>{

    const [token,setToken]= useState(localStorage.getItem("token"));
    const [user,setUser] = useState("");
    const [empleav,setempleav] = useState("");
    const storetokenInLS = (serverToken)=>{ 
        return localStorage.setItem("token",serverToken);
    }

    //logout

    let isLoggedIn = !!token;
    console.log(isLoggedIn); //if token then true else false
    const LogoutUser =()=>{
        setToken("");
        return localStorage.removeItem("token");
    };

    const userAuthentication =async ()=>{
        try {
            const response = await fetch("http://localhost:5000/api/auth/Users",{
                method:"GET",
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            });
            console.log(response);

            if(response.ok){
                const data = await response.json();
                // console.log(data.userData);
                setUser(data.userData);
            }
        } catch (error) {
            console.log("Error fetching user Data");
        }
    }

   
    const getEmpleavData = async () => {
    const response = await fetch("http://localhost:5000/api/empleav",{
        method:"GET",
        headers:{
            Authorization:`Bearer ${token}`,
        },
    });

    if(response.ok){
        const data = await response.json();
        setempleav(data.data);
    }
    };

    useEffect(()=>{
        getEmpleavData();
        userAuthentication();
    },[])

    return<AuthContext.Provider value={{token,storetokenInLS,user,empleav,LogoutUser,isLoggedIn}}>
        {children}
    </AuthContext.Provider>

}

export const useAuth = ()=>{
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
} 