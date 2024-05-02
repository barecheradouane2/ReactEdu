
import axiosClient from "../axios-client";
export  async function getPosts() {
    try {
        const response = await axiosClient.get("/posts");
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}
export async function CreatePostAdmin(payload) {
    try {
        const response = await axiosClient.post("/posts", payload,{
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        return response.data;
    } catch (error) {
        console.error("Error for Creating Post :", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}