import axios from 'axios';

// const API_URL = 'http://localhost:8000/api';
const API_URL = 'http://172.20.10.2:8000/api'; // Utilisation d'une adresse IP locale pour les tests sur un émulateur mobile


let jwt: string | null = null;

export const setToken = (token: string) => {
  jwt = token;
};

export const getToken = () => jwt;

const authHeaders = () => ({
  Authorization: `Bearer ${jwt}`,
});

export const login = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/login_check`, {
    email,
    password,
  });
  return res.data;
};

export const register = async (name: string, email: string, password: string) => {
  const res = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
  });
  return res.data;
};

export const fetchTodos = async () => {
  const res = await axios.get(`${API_URL}/todos`, { headers: authHeaders() });
  return res.data;
};

export const createTodo = async (title: string, description: string) => {
  const res = await axios.post(
    `${API_URL}/todos`,
    { title, description },
    { headers: authHeaders() }
  );
  return res.data;
};

export const updateTodo = async (id: number, updates: { title: string; description: string; isCompleted: boolean }) => {
  const res = await axios.put(
    `${API_URL}/todos/${id}`,
    updates,
    { headers: authHeaders() }
  );
  return res.data;
};

export const deleteTodo = async (id: number) => {
  await axios.delete(`${API_URL}/todos/${id}`, { headers: authHeaders() });
};
