export type Priority = "Low" | "Medium" | "High";

export type Mood = "Happy" | "Sad" | "Neutral" | "Excited" | "Tired" | "Angry";

export interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
}

export interface Task {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  priority: Priority;
  status: boolean;
  isCompleted: boolean;
  deadline: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description: string;
  priority: Priority | string;
  deadline: string;
}

export interface UpdateTaskInput extends Partial<CreateTaskInput> {
  id: string;
  status?: boolean;
}

export interface Note {
  _id: string;
  title: string;
  content: string;
  tag: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Journal {
  _id: string;
  userId: string;
  title: string;
  content: string;
  mood: Mood;
  createdAt: string;
  updatedAt: string;
}

export interface CreateJournalInput {
  title: string;
  content: string;
  mood: Mood | string;
}

export interface UpdateJournalInput extends Partial<CreateJournalInput> {
  id: string;
}
