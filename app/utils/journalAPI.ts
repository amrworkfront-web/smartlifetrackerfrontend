import axiosInstance from "./axiosInstance";
import { Journal, CreateJournalInput, UpdateJournalInput } from "@/types";

export const createJournal = async (
  journal: CreateJournalInput,
): Promise<Journal> => {
  const response = await axiosInstance.post("/journal", journal);
  return response.data;
};

export const getJournals = async (search?: string): Promise<Journal[]> => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);

  const query = params.toString() ? `?${params.toString()}` : "";
  const response = await axiosInstance.get(`/journal${query}`);
return response.data.data
};

export const updateJournal = async (
  journal: UpdateJournalInput,
): Promise<Journal> => {
  const { id, ...data } = journal;
  const response = await axiosInstance.put(`/journal/${id}`, data);
  return response.data;
};

export const deleteJournal = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/journal/${id}`);
};
