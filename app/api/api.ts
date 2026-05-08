import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";


export const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});
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

// import axios from "axios";
// import { NextResponse } from "next/server";

// export type ApiError = {
//   response?: {
//     status?: number;
//     data?: unknown;
//   };
// };

// export const api = axios.create({
//   baseURL: "https://notehub-public.goit.study/api",
//   headers: {
//     Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
//   },
// });

// export const createErrorResponse = (error: ApiError) => {
//   return NextResponse.json(
//     error.response?.data || { message: "Something went wrong" },
//     { status: error.response?.status || 500 }
//   );
// };