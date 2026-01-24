import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);

    return response.data;
  } catch (error) {
    return { error: "Error when retrieving notes!" };
  }
};

const create = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.post(baseUrl, blog, config);
    return response;
  } catch (error) {
    return { error: `${error.response.data.error}` };
  }
};

const updateLike = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return response.data;
};

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response;
};

export default { getAll, create, updateLike, setToken, deleteBlog };
