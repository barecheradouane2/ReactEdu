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

export async function getClassRequests(id){
    try {
     
        const response = await axiosClient.get(`/join-requests/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error for getting Class requests :", error);
        throw error; // Rethrow the error to be handled by the caller
      }
}

export async function ApproveJoinRequest(id){
    try {
        
        const response = await axiosClient.post(`/join-requests/${id}/approve`);
        return response.data;
      } catch (error) {
        console.error("Error for approving Class requests :", error);
        throw error; // Rethrow the error to be handled by the caller
      }
}

export async function RefuseJoinRequests(id){
    try {
        
        const response = await axiosClient.post(`/join-requests/${id}/refuse`);
        return response.data;
      } catch (error) {
        console.error("Error for refusing Class requests :", error);
        throw error; // Rethrow the error to be handled by the caller
      }
}