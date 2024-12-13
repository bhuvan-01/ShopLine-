import { axiosClient } from '../apiClient';

export const getProductsService = () => axiosClient.get(`/products`);

export const getProduct = (id) => axiosClient.get(`/products/${id}`);

export const createOrder = (cartData) => axiosClient.post('/orders', cartData);

export const getOrders = () => axiosClient.get('/orders');
