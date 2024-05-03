import axios from "axios";

const http = axios.create({
  baseURL: "http://217.25.90.141:3005",
  headers: { "Content-Type": "application/json" },
});

export default http;
