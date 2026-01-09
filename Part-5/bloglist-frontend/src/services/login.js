import axios from "axios";
const baseURL = "/api/login";

const login = async (userInfo) => {
  const response = await axios.post(baseURL, userInfo);

  return response.data;
};

export default login;
