import React , {useState,createContext, useEffect} from "react";
import {setToken, getToken, removeToken} from "../api/token";
import {useUser} from "../hooks";


export const AuthContext = createContext({
    auth: undefined,
    login: () => null,
    logout: () => null
});

//Funcion de Autorizacion de Login y reidireccionamiento de pagina Admin.
export function AuthProvaider(props){
    const{children} = props;

    const [auth, setAuth] = useState(undefined);

    const{getME}=useUser();

    //Recuperar llave de token al momento de refrescar pagina.
    useEffect(() => {
      (async () => {
        const token = getToken();

        if (token) {
            const me = await getME(token);
            setAuth({token, me});
            console.log(me);
        } else {
            setAuth(null);
        }

        console.log(token);
      })();
    }, []);
    



    const login = async(token) => {
        setToken(token);
        const me = await getME(token);
        setAuth({token, me});
        //console.log(me);
        //console.log('Context Login --->', token);
    };


    const logout = () => {
        if (auth){
            removeToken();
            setAuth(null);
        }
    };

    //Validar inicio de Sesion o Cierre de Sesion.
    const valueContext = {
        auth,
        login,
        logout,
    };


    if (auth=== undefined) return null;


    return (
        <AuthContext.Provider value={valueContext}> {children}</AuthContext.Provider>
    );

}