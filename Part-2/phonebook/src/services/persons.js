import axios from "axios";

// const baseURL = "http://localhost:3001/persons";
// const baseURL = "http://localhost:3001/api/persons";
// const baseURL = "https://phonebook-backend-qzjm.onrender.com";
const baseURL = "/api/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const createPerson = (newObject) => {
  const request = axios.post(baseURL, newObject);
  return request.then((response) => response.data);
};

const updatePerson = (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => axios.delete(`${baseURL}/${id}`);
// const deletePerson = (id) => {
//   const request = axios.delete(`${baseURL}/${id}`);
//   return request.then((response) => response.data);
// };

export default { getAll, createPerson, deletePerson, updatePerson };
