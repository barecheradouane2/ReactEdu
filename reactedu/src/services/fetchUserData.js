import { login } from "../services/apiauth";

const fetchUserData = async () => {
  try {
    const response = await login(JSON.parse(localStorage.getItem("UserInfo")));
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export default fetchUserData;
