import axios, {AxiosError } from "axios";
import type { Note} from "@/types/note";
import type { FormValues } from "../components/NoteForm/NoteForm";
import { NextResponse } from "next/server";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}
// axios.defaults.baseURL = "https://notehub-public.goit.study/api";


export type ApiError = AxiosError<{ error: string }>;

export const createErrorResponse = (error: ApiError) => {
  return NextResponse.json(
    {
      error:
        error.response?.data?.error ?? error.message,
    },
    { status: error.status },
  );
}


axios.defaults.baseURL = "process.env.NEXT_PUBLIC_API_URL + '/api'"

export const api = axios.create({
  baseURL: "https://notehub-api.goit.study",
   withCredentials: true,
})

axios.defaults.headers.common["Authorization"] =
  `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;
    
export const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
    searchQuery: string = "",
  tag?: string
): Promise<NotesResponse> => {
    const res = await axios.get<NotesResponse>("/notes", {
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
  const res = await axios.get<Note>(`/notes/${postId}`);
  return res.data;
} 

export const createNote = async (note: FormValues): Promise<Note> => {
  const res = await axios.post<Note>("/notes", note);
  return res.data;
};

export const deleteNote = async (postId: string): Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${postId}`);
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