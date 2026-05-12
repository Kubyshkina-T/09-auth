// import { NextResponse } from 'next/server';
// import { api, createErrorResponse } from '@/app/api/api';
// import { cookies } from 'next/headers';
// import { logErrorResponse } from '@/app/api/_ulits/ulits';
// import { isAxiosError } from 'axios';

// type Props = {
//   params: Promise<{ id: string }>;
// };

// export async function GET(request: Request, { params }: Props) {
//   try {
//     const cookieStore = await cookies();
//     const { id } = await params;
//     const res = await api.get(`/notes/${id}`, {
//       headers: {
//         Cookie: cookieStore.toString(),
//       },
//     });
//     return NextResponse.json(res.data, { status: res.status });
//   } catch (error) {
//     if (isAxiosError(error)) {
//       logErrorResponse(error.response?.data);
//       return NextResponse.json(
//         // { error: error.message, response: error.response?.data },
//         // { status: error.status }
//         createErrorResponse
//       );
//     }
//     logErrorResponse({ message: (error as Error).message });
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

// export async function DELETE(request: Request, { params }: Props) {
//   try {
//     const cookieStore = await cookies();
//     const { id } = await params;

//     const res = await api.delete(`/notes/${id}`, {
//       headers: {
//         Cookie: cookieStore.toString(),
//       },
//     });
//     return NextResponse.json(res.data, { status: res.status });
//   } catch (error) {
//     if (isAxiosError(error)) {
//       logErrorResponse(error.response?.data);
//       return NextResponse.json(
//         // { error: error.message, response: error.response?.data },
//         // { status: error.status }
//         createErrorResponse
//       );
//     }
//     logErrorResponse({ message: (error as Error).message });
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

// export async function PATCH(request: Request, { params }: Props) {
//   try {
//     const cookieStore = await cookies();
//     const { id } = await params;
//     const body = await request.json();

//     const res = await api.patch(`/notes/${id}`, body, {
//       headers: {
//         Cookie: cookieStore.toString(),
//       },
//     });
//     return NextResponse.json(res.data, { status: res.status });
//   } catch (error) {
//     if (isAxiosError(error)) {
//       logErrorResponse(error.response?.data);
//       return NextResponse.json(
//         // { error: error.message, response: error.response?.data },
//         // { status: error.status }
//        createErrorResponse
//       );
//     }
//     logErrorResponse({ message: (error as Error).message });
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { api, ApiError, createErrorResponse } from "@/app/api/api";
import { cookies } from "next/headers";

type Props = {
  params: Promise<{ id: string }>;
};

const getCookieHeader = async () => {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
};

export async function GET(request: Request, { params }: Props) {
  try {
    const { id } = await params;
    const cookieHeader = await getCookieHeader();

    const res = await api.get(`/notes/${id}`, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    return createErrorResponse(error as ApiError);
  }
}

export async function DELETE(request: Request, { params }: Props) {
  try {
    const { id } = await params;
    const cookieHeader = await getCookieHeader();
console.log("cookieHeader:", cookieHeader);
    const res = await api.delete(`/notes/${id}`, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    return createErrorResponse(error as ApiError);
  }
}

export async function PATCH(request: Request, { params }: Props) {
  try {
    const { id } = await params;
    const body = await request.json();
    const cookieHeader = await getCookieHeader();

    const res = await api.patch(`/notes/${id}`, body, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    return createErrorResponse(error as ApiError);
  }
}