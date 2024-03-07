import {getMeApi} from "../api/user";


//Asignacion de Token a variable
export function useUser(){
    const getME = async (token) => {
        try {
            const response = await getMeApi(token);
            return response
        } catch (error) {
            throw error;
        }
    };
    return {
        getME,
    };
}