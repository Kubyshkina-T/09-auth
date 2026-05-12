
import type { Note} from "@/types/note";
import type { FormValues } from "../../components/NoteForm/NoteForm";
import { nextServer } from "./api";
import { User } from "@/types/user";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
    searchQuery: string = "",
  tag?: string
): Promise<NotesResponse> => {
    const res = await nextServer.get<NotesResponse>("/notes", {
    params: {
      page,
      perPage,
            search: searchQuery,
      tag,
        },
        
  });

  return res.data;
};

export const fetchNoteById = async (postId: string) => {
  const res = await nextServer.get<Note>(`/notes/${postId}`);
  return res.data;
} 


export const createNote = async (note: FormValues): Promise<Note> => {
  const res = await nextServer.post<Note>("/notes", note);
  return res.data;
};


export const deleteNote = async (postId: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${postId}`);
  return res.data;
};

export type Category = {
    id: string;
     title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    tag: string;
}



// Auth

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
}


export type LoginRequest = {
  email: string;
  password: string;
}

export const login = async(data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
}


type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
}

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
}

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};
export const updateMe = async (username: string) => {
  const { data } = await nextServer.patch("/users/me", { username });
  return data;
};