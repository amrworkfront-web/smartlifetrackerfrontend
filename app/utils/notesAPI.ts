import axiosInstance from "./axiosInstance";

export interface Note {
  _id: string;
  title: string;
  content: string;
  tag: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateNoteInput {
  title: string;
  content: string;
  tag: string;
}

export interface UpdateNoteInput extends CreateNoteInput {
  id: string;
}

export const createNote = async (note: CreateNoteInput): Promise<Note> => {
  const response = await axiosInstance.post("/notes", note);
  return response.data;
};

export const getNotes = async (search?: string): Promise<Note[]> => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);

  const query = params.toString() ? `?${params.toString()}` : "";
  const response = await axiosInstance.get(`/notes${query}`);
return response.data.data
};

export const deleteNote = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/notes/${id}`);
};

export const updateNote = async (note: UpdateNoteInput): Promise<Note> => {
  const { id, ...data } = note;
  const response = await axiosInstance.put(`/notes/${id}`, data);
  return response.data;
};
