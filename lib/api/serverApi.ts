import { cookies } from 'next/headers';
import { nextServer } from './api';
import { Note } from '@/types/note';
import { User } from '@/types/user';


export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie:  cookieStore.toString()
,
    },
  });
  return data;
};


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
  const cookieStore = await cookies();

    const res = await nextServer.get<NotesResponse>("/notes", {
    params: {
      page,
      perPage,
            search: searchQuery,
      tag,
        },
      headers: {
      Cookie: cookieStore.toString(),
    },  
  });

  return res.data;
};

export const fetchNoteById = async (postId: string): Promise<Note> => {
  const cookieStore = await cookies();
  const res = await nextServer.get<Note>(`/notes/${postId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
} 
