import axios from "axios";

const API = axios.create({
  baseURL: "https://bff-iv1u.onrender.com/api",
});

export default API;
