import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const create = (newPersonObject) => {
  const request = axios.post(baseUrl, newPersonObject);
  return request.then((res) => res.data);
};

const deleteEntry = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((res) => res.data);
};

const update = (id, newObj) => {
  const request = axios.put(`${baseUrl}/${id}`, newObj);
  return request.then((res) => res.data);
};

export default {
  getAll,
  create,
  deleteEntry,
  update,
};
