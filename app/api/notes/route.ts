// import { NextResponse, NextRequest } from "next/server";
// import { api, ApiError, createErrorResponse } from "@/app/api/api";


// export async function GET(request: NextRequest) {
//     const postId = request.nextUrl.searchParams.get("postId");
//     try {
//         const { data } = await api.get("/notes", {
//             params: { postId },
//         });
//         return NextResponse.json(data);
//     }
//     catch (error) {
//         return createErrorResponse(error as ApiError)
//     }
// }

// export async function POST(request: NextRequest) {
//     try {
//         const body = await request.json();
//         const { data } = await api.post("/notes", body);
//         return NextResponse.json(data);
//     } catch (error) {
//         return createErrorResponse(error as ApiError)
//     }
// }

import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { api, ApiError, createErrorResponse } from "@/app/api/api";

const getCookieHeader = async () => {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
};

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page");
  const perPage = request.nextUrl.searchParams.get("perPage");
  const search = request.nextUrl.searchParams.get("search");
 const tag = request.nextUrl.searchParams.get("tag");
  try {
    const cookieHeader = await getCookieHeader();

    const { data } = await api.get("/notes", {
      params: {
        page,
        perPage,
            search,
        tag
      },
      headers: {
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(error as ApiError);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const cookieHeader = await getCookieHeader();

    const { data } = await api.post("/notes", body, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return createErrorResponse(error as ApiError);
  }
}