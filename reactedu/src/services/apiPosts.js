
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


export async function GetSchoolPosts(school_id , pageParam = 1) {
    console.log("GetSchoolPosts function called with pageParam:", pageParam);
    try {
        const response = await axiosClient.get(`/posts/school/${school_id}?page=${pageParam}`);
        console.log("response.data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching School posts:", error);
        throw error;
    }
}

