import fetch, { RequestInit } from "node-fetch";
import { FetchError, FetchRequestOptions } from "../interfaces/fetch.interface";
import { HttpMethod } from "../enum/http-method.enum";
import utils from "../utils";

const headers: HeadersInit = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

async function fetchApi<T>(
	path: string,
	method: HttpMethod,
	options: FetchRequestOptions
): Promise<T> {
	const fetchOptions: RequestInit = {
		method,
		headers: {
			...headers,
		},
	};
	if (options.headers) {
		fetchOptions.headers = { ...fetchOptions.headers, ...options.headers };
	}
	if (options.body) {
		fetchOptions.body = JSON.stringify(options.body);
	}
	const res = await fetch(`${utils.env.dummyDataURL}${path}`, fetchOptions);
	const json: T & FetchError = (await res.json()) as FetchError & T;
  return utils.error.handleFetchError(json);
};

const api = {
  headers,
  setHeader: (key: string, value: string): void => {
    headers[key] = value;
  },
  async get<T>(path: string, options: FetchRequestOptions = {}): Promise<T> {
    return await fetchApi(path, HttpMethod.GET, options)
  },
  async post<T>(path: string, options: FetchRequestOptions = {}): Promise<T> {
    return await fetchApi(path, HttpMethod.POST, options)
  },
  async put<T>(path: string, options: FetchRequestOptions = {}): Promise<T> {
    return await fetchApi(path, HttpMethod.PUT, options)
  },
  async patch<T>(path: string, options: FetchRequestOptions = {}): Promise<T> {
    return await fetchApi(path, HttpMethod.PATCH, options)
  },
  async delete<T>(path: string, options: FetchRequestOptions = {}): Promise<T> {
    return await fetchApi(path, HttpMethod.DELETE, options)
  },
  auth: {
    async get<T>(path: string, options: FetchRequestOptions = {}): Promise<T> {
      return await fetchApi(`/auth${path}`, HttpMethod.GET, options) as T;
    },
    async post<T>(path: string, options: FetchRequestOptions = {}): Promise<T> {
      return await fetchApi(`/auth${path}`, HttpMethod.POST, options) as T;
    },
    async put<T>(path: string, options: FetchRequestOptions = {}): Promise<T> {
      return await fetchApi(`/auth${path}`, HttpMethod.PUT, options) as T;
    },
    async patch<T>(path: string, options: FetchRequestOptions = {}): Promise<T> {
      return await fetchApi(`/auth${path}`, HttpMethod.PATCH, options) as T;
    },
    async delete<T>(path: string, options: FetchRequestOptions = {}): Promise<T> {
      return await fetchApi(`/auth${path}`, HttpMethod.DELETE, options) as T;
    },
  }
};

export default api;