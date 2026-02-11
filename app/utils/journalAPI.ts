import axiosInstance from "./axiosInstance";
import { CreateJournalInput, Journal, UpdateJournalInput } from "@/types";

export const createJournal = async (
  journal: CreateJournalInput,
): Promise<Journal> => {
  const response = await axiosInstance.post("/journal", journal);
  return response.data;
};

export const getJournals = async (search?: string) => {
  let query = "";
  if (search) {
    const params = new URLSearchParams();
    params.append("search", search);
    query = `?${params.toString()}`;
  }
  const response = await axiosInstance.get(`/journal${query}`);
  return response.data;
};

export const updateJournal = async (
  journal: UpdateJournalInput,
): Promise<Journal> => {
  const { id, ...data } = journal;
  const response = await axiosInstance.put(`/journal/${id}`, data);
  return response.data;
};
