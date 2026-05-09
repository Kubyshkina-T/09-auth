import { NextRequest, NextResponse } from 'next/server';
import { api, } from '@/app/api/api';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/app/api/_ulits/ulits';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await api.post('/auth/register', body);
    const cookieStore = await cookies();
    const setCookie = res.headers['set-cookie'];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: Number(parsed['Max-Age']),
        };
        if (parsed.accessToken) { cookieStore.set('accessToken', parsed.accessToken, options) };
        if (parsed.refreshToken) { cookieStore.set('refreshToken', parsed.refreshToken, options) };
      }
      return NextResponse.json(res.data, { status: res.status });
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status:  error.status }
    
  
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
    
}



// import { NextResponse } from "next/server";

// export async function POST() {
//   return NextResponse.json({ ok: true });
// }




// import { NextRequest, NextResponse } from 'next/server';
// import { api } from '@/app/api/api';
// import { isAxiosError } from 'axios';

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     console.log('REGISTER BODY:', body);

//     const res = await api.post('/auth/register', body);

//     console.log('REGISTER SUCCESS:', res.data);

//     return NextResponse.json(res.data, { status: res.status });
//   } catch (error) {
//     if (isAxiosError(error)) {
//       console.log('REGISTER ERROR STATUS:', error.response?.status);
//       console.log('REGISTER ERROR DATA:', error.response?.data);

//       return NextResponse.json(
//         { error: error.message, response: error.response?.data },
//         { status: error.response?.status || 500 }
//       );
//     }

//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }