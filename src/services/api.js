import fetch from "node-fetch";
import utils from "../utils";

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

const fetchApi = async (path, method, options) => {
  const fetchOptions = {
    method,
    headers: {
      ...headers,
    },
  }
  if (options.headers) {
    fetchOptions.headers = { ...fetchOptions.headers, ...options.headers };
  }
  if (options.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }
  const res = await fetch(`${utils.env.dummyDataURL}${path}`, fetchOptions);
  const json = await res.json();
  return json;
}

const api = {
  headers,
  setHeader: (key, value) => {
    headers[key] = value;
  },
  get: (path, options = {}) => fetchApi(path, "GET", options),
  post: (path, options = {}) => fetchApi(path, "POST", options),
  put: (path, options = {}) => fetchApi(path, "PUT", options),
  patch: (path, options = {}) => fetchApi(path, "PATCH", options),
  delete: (path, options = {}) => fetchApi(path, "DELETE", options),
  auth: {
    get: async (path, options = {}) => utils.error.handleFetchError(await fetchApi(`/auth${path}`, "GET", options)),
    post: async (path, options = {}) => utils.error.handleFetchError(await fetchApi(`/auth${path}`, "POST", options)),
    put: async (path, options = {}) => utils.error.handleFetchError(await fetchApi(`/auth${path}`, "PUT", options)),
    patch: async (path, options = {}) => utils.error.handleFetchError(await fetchApi(`/auth${path}`, "PATCH", options)),
    delete: async (path, options = {}) => utils.error.handleFetchError(await fetchApi(`/auth${path}`, "DELETE", options)),
  }
};

export default api;