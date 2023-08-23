import axios from "axios";

const instance = axios.create({
  baseURL: "https://node.mn/api/",
  // baseURL: "http://localhost:8000/api/v1/",
});

instance.defaults.withCredentials = true;

export default instance;
