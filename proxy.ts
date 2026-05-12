import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkServerSession } from "./lib/api/serverApi";
import { parse } from "cookie";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!accessToken) {
    if (refreshToken) {
      const data = await checkServerSession();
      const setCookie = data.headers["set-cookie"];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        let tokensUpdated = false;

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);

          const options: {
            expires?: Date;
            path?: string;
            maxAge?: number;
          } = {};

          if (parsed.Expires) {
            options.expires = new Date(parsed.Expires);
          }

          if (parsed.Path) {
            options.path = parsed.Path;
          }

          if (parsed["Max-Age"]) {
            options.maxAge = Number(parsed["Max-Age"]);
          }

          if (parsed.accessToken) {
            cookieStore.set("accessToken", parsed.accessToken, options);
            tokensUpdated = true;
          }

          if (parsed.refreshToken) {
            cookieStore.set("refreshToken", parsed.refreshToken, options);
            tokensUpdated = true;
          }
        }

        if (!tokensUpdated) {
          if (isPrivateRoute) {
            return NextResponse.redirect(new URL("/sign-in", request.url));
          }

          return NextResponse.next();
        }

        if (isPublicRoute) {
          return NextResponse.redirect(new URL("/", request.url), {
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }

        if (isPrivateRoute) {
          return NextResponse.next({
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
      }
    }

    if (isPublicRoute) {
      return NextResponse.next();
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isPrivateRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};