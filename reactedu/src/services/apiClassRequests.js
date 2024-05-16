import axiosClient from "../axios-client.js";

export async function JoinClassRequests(payload){
   
    try {
        
        const response = await axiosClient.post(`/join-requests`,payload);
        return response.data;
      } catch (error) {
        console.error("Error for joinning Class :", error);
        throw error; // Rethrow the error to be handled by the caller
      }


}