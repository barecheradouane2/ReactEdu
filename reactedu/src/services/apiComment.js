
import axiosClient from "../axios-client";

export async function getComments() {
    try {
        const response = await axiosClient.get("/comments");
        return response.data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}
 export async function CreateComment(post_id,payload) {
        try {
            const response = await axiosClient.post(`/posts/${post_id}/comments`, payload);
            return response.data;
        } catch (error) {
            console.error("Error for Creating Comment :", error);
            throw error; // Rethrow the error to be handled by the caller
        }
 }