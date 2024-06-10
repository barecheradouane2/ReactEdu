import axiosClient from "../axios-client";


export async function getStudents() {
    try {
        const response = await axiosClient.get("/students/children/parent");
        return response.data;
    } catch (error) {
        console.error("Error for Getting Students :", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

export async function deleteStudent(id) {
    try {
        const response = await axiosClient.delete(`/students/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error for Deleting Student :", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}
export async function updateStudent(payload) {
    try {
        const response = await axiosClient.put(`/students/${payload.id}`, payload.data);
        return response.data;
    } catch (error) {
        console.error("Error for Updating Student :", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}
export async function AddStudent(payload) {
    try {
        const response = await axiosClient.post("/students",payload);
        return response.data;
    } catch (error) {
        console.error("Error for Adding Student :", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}
export async function associatestudent(payload) {
    try {
        const response = await axiosClient.post(`/schools/${payload.id}/associate`,payload.mydata);
        return response.data;
    } catch (error) {
        console.error("Error for Adding Student :", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}
