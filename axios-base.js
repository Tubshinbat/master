import axios from "axios";

const instance = axios.create({
  // baseURL: "https://germondental.com/api/",
  baseURL: "http://localhost:8000/api/v1/",
});

instance.defaults.withCredentials = true;

export default instance;
