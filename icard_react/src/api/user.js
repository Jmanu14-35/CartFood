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

        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }

}

export async function getUserApi(token){
    try {
        const url= `${BASE_API}/api/users/`;
        const params = {
            headers: {
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

export async function addUserApi(data, token){
    try {
        const url= `${BASE_API}/api/users/`;
        const params = {
            method: "POST",
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function updateUserApi(id, data, token){
    try {
        const url= `${BASE_API}/api/users/${id}/`;
        const params = {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function deleteUserApi(id, token){
    try {
        const url= `${BASE_API}/api/users/${id}/`;
        const params ={
            method:"DELETE",
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }

}