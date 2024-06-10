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

export async function DeleteSchool(payload) {
  try {
    const response = await axiosClient.delete(`/schools/${payload.id}`);
    return response.data;
  } catch (error) {
    console.error("Error for deleting school :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function UpdateSchool(payload) {
  console.log("payload",payload.get("school_id"));
  try {
    const response = await axiosClient.post(`/schools/${payload.get("school_id")}`, payload,{
      headers: {
        'Content-Type': 'multipart/form-data',
        "Accept": "application/json",
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

export async function getSchoolMembers(id) {
  try {
    const response = await axiosClient.get(`/schools/${id}/members`);
    return response.data;
  } catch (error) {
    console.error("Error fetching school members:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function RemoveMember(payload) {
  try {
    const response = await axiosClient.delete(`/schools/${payload.id}/members`);
    return response.data;
  } catch (error) {
    console.error("Error for removing member :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function getSchoolClasses(id) {
  try {
    const response = await axiosClient.get(`/schools/${id}/classes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching school classes:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function LeaveSchool(id) {
  try {
    const response = await axiosClient.post(`/schools/${id}/leave`);
    return response.data;
  } catch (error) {
    console.error("Error for LeaveSchool :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}


export async function verifyschool(payload) {
  try {
    const response = await axiosClient.post(`/schools/${payload.id}/request/verification`, payload.data);
    return response.data;
  } catch (error) {
    console.error("Error for verifying school :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}