import axiosInstance from "./axiosInstance";
import { CreateTaskInput, Task, UpdateTaskInput } from "@/types";

export const CreateTask = async (taskData: CreateTaskInput): Promise<Task> => {
    const response = await axiosInstance.post('/tasks', taskData);
    return response.data;
};

export const getTasks = async (filters?: {
  search?: string;
  priority?: string;
  dateFilter?: 'today' | 'upcoming' | 'all';
}): Promise<Task[]> => {
  let query = '';
  if (filters) {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.priority && filters.priority !== 'All') params.append('priority', filters.priority);
    if (filters.dateFilter) params.append('dateFilter', filters.dateFilter);
    query = `?${params.toString()}`;
  }

  const response = await axiosInstance.get(`/tasks${query}`);
  return response.data;
};

export const updateTask = async (taskData: UpdateTaskInput): Promise<Task> => {
    const { id, ...data } = taskData;
    const response = await axiosInstance.put(`/tasks/${id}`, data);
    return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
    const response = await axiosInstance.delete(`/tasks/${id}`);
    return response.data;
};


