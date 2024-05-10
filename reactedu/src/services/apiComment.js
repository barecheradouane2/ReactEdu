import axiosClient from "../axios-client";

export async function getComments(post_id) {
  try {
    const response = await axiosClient.get(`/posts/${post_id}/all-comments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
export async function CreateComment(payload) {
  try {
    const response = await axiosClient.post(
      `/posts/${payload.id}/comments`,
      { text: payload.text }, {
        'Content-Type': 'application/json',
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }


    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function CreateReply(payload) {
  try {
    const response = await axiosClient.post(
      `/posts/${payload.id}/replies`,
      { text: payload.text }, {
        'Content-Type': 'application/json',
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating reply:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
