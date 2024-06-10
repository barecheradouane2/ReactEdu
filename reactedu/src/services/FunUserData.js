
import axiosClient from "../axios-client.js";

import {login} from "../services/apiauth.js";

export async function getFunUserData() {
    try {
        const payload=JSON.parse(localStorage.getItem("UserInfo"));
        
        console.log("payload userInfo",payload);
        const response = await login(payload);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
 }


