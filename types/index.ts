export type Priority = 'Low' | 'Medium' | 'High';
export type Mood = 'Happy' | 'Sad' | 'Neutral' | 'Excited' | 'Tired' | 'Angry';

export interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
}

export interface Task {
  _id: string; // MongoDB typically uses _id
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

// Correction: The updateTask signature in taskAPI.ts had `status:boolean`. 
// To allow flexibility and better naming, I'll map `status` to `boolean` or strict string if needed.
// However, standardizing on a string enum is usually better for "Status".
// Let's look at `taskAPI.ts` again.

export interface CreateTaskInput {
  title: string;
  description: string;
  priority: Priority | string;
  deadline: string;
}

export interface UpdateTaskInput extends Partial<CreateTaskInput> {
  id: string;
  status?: boolean; // Matching the existing API signature found in taskAPI.ts
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
