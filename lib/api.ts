import axios  from "axios";
import type { Note} from "@/types/note";
import type { FormValues } from "../components/NoteForm/NoteForm";


export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const nextServer = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
    headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
})

// axios.defaults.headers.common["Authorization"] =
// `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;
//   // `Bearer ${process.env.NEXT_PUBLIC_API_URL}`;
    
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
    console.log("ID:", postId);
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

export