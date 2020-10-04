import axios from "axios";

import DBCCompany from "../support";

const api = axios.create({
  baseURL: DBCCompany().baseURL,
});

export default api;
