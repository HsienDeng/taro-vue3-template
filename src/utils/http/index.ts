import axios from "axios";
import TaroAdapter from "./adapters";

export const http = axios.create({
  baseURL: "http://127.0.0.1:8080",
  timeout: 60000,
  adapter: TaroAdapter,
});
