
import axiosClient from "./axiosClient";

export async function login(payload) {



    // axiosClient
    // .post("/login", payload)
    // .then(({ data }) => {
    //   setUser(data.data);
    //   console.log (data);
    //   setToken(data.token);
    // })
    // .catch((err) => {
    //   const response = err.response;
    //   if (response && response.status === 422) {
    //     setMessage(response.data.message);
    //   }
    // });
  try {
    const response = await axiosClient.post("/login", payload);
    return response.data;
  } catch (error) {
    console.error("Error for login :", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}