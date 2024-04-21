
import axiosClient from "../axios-client.js";
export async function JoinSchoolWithCode(payload) {
    try {
      const response = await axiosClient.post("/school-join-requests/join-school",payload);
      return response.data;
    } catch (error) {
      console.error("Error for join  school with code  :", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }