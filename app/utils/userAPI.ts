import axiosInstance from "./axiosInstance";
import { User } from "@/types";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken?: string;
}

export const registerUser = async (userData: RegisterInput): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (credentials: LoginInput): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data.data;
};

export const logoutUser = async (): Promise<void> => {
  await axiosInstance.post("/auth/logout");
};
