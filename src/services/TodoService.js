import axios from "axios";

const baseUrl = "https://todo-app-backend-nu.vercel.app/api/todos";



export const addTask = (name, description) => {
  const task = {
    name: name,
    description: description,
  };

  return axios
    .post(`${baseUrl}/create`, task)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getAllTasks = () => {
  return axios
    .get(`${baseUrl}/all-tasks`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const editTask = (id, editedName, editedDescription) => {
  const editedTask = {
    name: editedName,
    description: editedDescription,
  };
  return axios
    .put(`${baseUrl}/edit/${id}`, editedTask)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const deleteTask = (id) => {
  return axios
    .delete(`${baseUrl}/delete/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const completeTask = (id) => {
  return axios
    .patch(`${baseUrl}/completed/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getTaskDetails = (id) => {
  return axios.get(`${baseUrl}/${id}`).catch((error) => {
    throw error;
  });
};

export const deleteAllTasks = () => {
  return axios
    .delete(`${baseUrl}/delete-all-tasks`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

