
import axiosClient from "../axios-client.js";

export async function login(payload) {

  try {
    const response = await axiosClient.post("/login", payload);
    return response.data;
  } catch (error) {
    console.error("Error for login :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}