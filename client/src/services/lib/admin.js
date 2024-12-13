import { axiosClient } from '../apiClient';

export const addProductService = (data) => axiosClient.post(`/products`, data);

export const deleteProductService = (id) =>
  axiosClient.delete(`/products/${id}`);
