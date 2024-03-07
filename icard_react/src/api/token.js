import {TOKEN} from "../utils/constants";

//Envio de Token
export function setToken(token){
    localStorage.setItem(TOKEN, token);
}

//conseguir token
export function getToken(){
    return localStorage.getItem(TOKEN);
}

//Eliminar Token
export function removeToken(){
    localStorage.removeItem(TOKEN);
}