import axiosInstance from "./axiosInstance";
import { CreateJournalInput, Journal, UpdateJournalInput } from "@/types";

export const createJournal = async (journal: CreateJournalInput): Promise<Journal> => {
    const response = await axiosInstance.post('/journal', journal);
    return response.data;
};

export const getJournals = async (): Promise<Journal[]> => {
    const response = await axiosInstance.get('/journal');
    return response.data;
};

export const updateJournal = async (journal: UpdateJournalInput): Promise<Journal> => {
    const { id, ...data } = journal;
    const response = await axiosInstance.put(`/journal/${id}`, data);
    return response.data;
};
