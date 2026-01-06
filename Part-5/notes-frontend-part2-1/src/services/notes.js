import axios from "axios";
const baseUrl = "/api/notes";
// const baseUrl = "https://render-test-uwhi.onrender.com/api/notes";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

//Adding variable 'request'
const getAll = async () => {
  const response = await axios.get(baseUrl);
  //   const nonExisting = {
  //     id: 1000,
  //     content: "This note is not saved to server",
  //     important: true,
  //   };
  //   return request.then((response) => response.data.concat(nonExisting));
  // return request.then((response) => response.data);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;

  // const request = axios.post(baseUrl, newObject);
  // return request.then((response) => response.data);
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  // return request.then((response) => response.data);
  return response.data;
};

export default { getAll, create, update, setToken };
