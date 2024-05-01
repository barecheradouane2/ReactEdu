import axiosClient from "../axios-client.js";

export async function getSchools() {
  try {
    const response = await axiosClient.get("/schools");
    return response.data;
  } catch (error) {
    console.error("Error fetching schools:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function CreateSchool(payload) {
  try {
    const response = await axiosClient.post("/schools",payload);
    return response.data;
  } catch (error) {
    console.error("Error for creating school :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function DeleteSchool(id) {
  try {
    const response = await axiosClient.delete(`/schools/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error for deleting school :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function UpdateSchool(payload) {
  try {
    const response = await axiosClient.put(`/schools/${payload.id}`, payload,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error for updating school :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function JoinSchool (payload) {
  try {
    const response = await axiosClient.post("/school-join-requests",payload);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error for joining school :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

