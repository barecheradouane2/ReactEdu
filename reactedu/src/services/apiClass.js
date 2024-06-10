import axiosClient from "../axios-client.js";

export async function getClasses() {
  try {
    const response = await axiosClient.get("/classes");
    return response.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function CreateClass(payload) {
  try {
    const response = await axiosClient.post("/classes", payload);
    return response.data;
  } catch (error) {
    console.error("Error for Creating Class :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function DeleteClass(payload) {
  try {
    const response = await axiosClient.delete(`/classes/${payload.id}`);
    return response.data;
  } catch (error) {
    console.error("Error for Deleting Class :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function UpdateClass(payload) {
  try {
    const response = await axiosClient.post(`/classes/${payload.get("id")}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(payload)
    return response.data;
  } catch (error) {
    console.error("Error for Updating Class :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function JoinClassbyCode(payload) {
  try {
    const response = await axiosClient.post(
      "/join-requests/class/join",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error for joinning  Class with code :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function getClassMember(id){
  try {
    const response = await axiosClient.get(`/classes/${id}/members`);
    return response.data;
  } catch (error) {
    console.error("Error for getting class members :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function removeMember(payload){
  try {
    const response = await axiosClient.post(`/classes/${payload.class_id}/members/${payload.id}`);
    return response.data;
  } catch (error) {
    console.error("Error for removing class members :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function LeaveClass(payload){
  try {
    const response = await axiosClient.post(`/classes/${payload.class_id}/leave`);
    return response.data;
  } catch (error) {
    console.error("Error for leaving class :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}