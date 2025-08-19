import axios from "axios";
const baseUrl = "http://localhost:3001/notes";

// const getAll = () => {
//   return axios.get(baseURL);
// };

// const create = (newObject) => {
//   return axios.post(baseURL, newObject);
// };

// const update = (id, newObject) => {
//   return axios.put(`${baseURL}/${id}`, newObject);
// };

//Adding variable 'request'
const getAll = () => {
  const request = axios.get(baseUrl);
  //   const nonExisting = {
  //     id: 1000,
  //     content: "This note is not saved to server",
  //     important: true,
  //   };
  //   return request.then((response) => response.data.concat(nonExisting));
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default { getAll, create, update };
