
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


export async function GetSchoolPosts(school_id , pageParam ) {
    console.log("GetSchoolPosts function called with pageParam:", pageParam);
    try {
        const response = await axiosClient.get(`/posts/school/${school_id}?page=${pageParam}`);
     
        return response.data;
    } catch (error) {
        console.error("Error fetching School posts:", error);
        throw error;
    }
}

export async function LikePost(payload){
    try {
        const response = await axiosClient.post(`/posts/${payload.id}/likes`);
        return response.data;
    } catch (error) {
        console.error("Error for Like Post :", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

export async function LikeComment(payload){
    try {
        const response = await axiosClient.post(`/posts/${payload.id}/like`);
        return response.data;
    } catch (error) {
        console.error("Error for Like Comment :", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

export async function LikeReply(payload){
    try {
        const response = await axiosClient.post(`/posts/replies/${payload.id}/like`);
        return response.data;
    } catch (error) {
        console.error("Error for Like Reply :", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

export async function SavePost(payload){
    try{
        const response = await axiosClient.post(`/posts/${payload.id}/toggle-save`);
        return response.data;

    }catch(error){
        console.error("Error for Save a Post :", error);
        throw error; // Rethrow the error to be handled by the caller

    }


}

