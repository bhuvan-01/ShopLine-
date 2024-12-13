import { axiosClient } from '../apiClient';

export const signupService = (data) => axiosClient.post(`/auth/register`, data);

export const loginService = (data) => axiosClient.post(`/auth/login`, data);
