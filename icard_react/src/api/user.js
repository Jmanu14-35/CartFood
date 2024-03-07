import {BASE_API} from "../utils/constants";

//Conexion con BackEnd
export async function loginApi(formData){
    try{
        const url=`${BASE_API}/api/auth/login/`;
        const params = {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(formData),
        };
        const response = await fetch(url, params);

        if (response.status !== 200){
            throw new Error("Usuario o contraseña incorrectos")
        }

        const result=await response.json();
        return result;
    }catch(error) {
        throw error
    }
}

//FUNCION GET PARA API
export async function getMeApi(token){
    try {
        const url = `${BASE_API}/api/auth/me/`;
        const params = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }

        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }

}