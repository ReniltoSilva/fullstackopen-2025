import axios from "axios";
const baseUrl = "/api/blogs";

let token;

const setToken = (token) => {
  token = `Bearer ${token}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async () => {
  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.post(baseUrl);
  return request.data;
};

export default { getAll, create, setToken };
