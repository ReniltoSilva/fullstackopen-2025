import axios from "axios";
const baseURL = "/api/login";

const login = async (userInfo) => {
  const response = await axios.post(baseURL, userInfo);
  // console.log("Response from login coming from backend", response.data);
  return response.data;
};

export default login;
