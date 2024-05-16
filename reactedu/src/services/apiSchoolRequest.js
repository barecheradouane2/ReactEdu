import axiosClient from "../axios-client.js";
export async function JoinSchoolWithCode(payload) {
  try {
    const response = await axiosClient.post(
      "/school-join-requests/join-school",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error for join  school with code  :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function getSchoolJoinRequests() {
  try {
    const response = await axiosClient.get(`/school-join-requests`);
    return response.data;
  } catch (error) {
    console.error("Error to  get school requests  :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
export async function ApproveJoinRequest(id) {
  try {
    const response = await axiosClient.post(
      `/school-join-requests/${id}/approve`
      
    );
    return response.data;
  } catch (error) {
    console.error("Error to approve join request  :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function RefuseJoinRequests(id) {
  try {
    const response = await axiosClient.post(
      `/school-join-requests/${id}/reject`
      
    );
    return response.data;
  } catch (error) {
    console.error("Error to refuse join request  :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
