import api from "../api";

const fetchAll = async (limit, skip) => {
  return await api.get(`/products?limit=${limit}&skip=${skip}&select=title,price,rating,category,brand,thumbnail`);
}

export default { fetchAll };