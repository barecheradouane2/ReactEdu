
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
export async function register(payload) {
  try {
    const response = await axiosClient.post("/register", payload);
    return response.data;
  } catch (error) {
    console.error("Error for register :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
export async function verify(payload) {
  try {
    const response = await axiosClient.post("/verify", payload);
    return response.data;
  } catch (error) {
    console.error("Error for verify :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
export async function resendotp(payload) {
  try {
    const response = await axiosClient.post("/resendotp", payload);
    return response.data;
  } catch (error) {
    console.error("Error for resendotp :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
export async function forgotpassword(payload) {
  try {
    const response = await axiosClient.post("/forgot-password", payload);
    return response.data;
  } catch (error) {
    console.error("Error for forgotpassword :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
export async function  validateotp(payload) {
  try {
    const response = await axiosClient.post("/validate-otp", payload);
    return response.data;
  } catch (error) {
    console.error("Error for validateotp :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export  async function resentpassword(payload) {  
  try {
    const response = await axiosClient.post("/reset-password", payload);
    return response.data;
  } catch (error) {
    console.error("Error for resetpassword :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function changepassword(payload) {
  try {
    const response = await axiosClient.post("/change-password", payload);
    return response.data;
  } catch (error) {
    console.error("Error for changepassword :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function editprofile(payload) {
  try {
    const response = await axiosClient.post("/user", payload);
    return response.data;
  } catch (error) {
    console.error("Error for editprofile :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

