import axios from "axios";
import API_ENDPOINTS from "./api-endpoints";

export default axios.create({
  // `baseURL` will be prepended to `url` unless `url` is absolute.
  baseURL: API_ENDPOINTS.TODOS,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});
