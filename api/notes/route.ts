import { NextResponse, NextRequest } from "next/server";
import { api, ApiError, createErrorResponse } from "@/lib/api";



export async function GET(request: NextRequest) {
    const postId = request.nextUrl.searchParams.get("postId");
    try {
        const { data } = await api.get("/notes", {
            params: { postId },
        });
        return NextResponse.json(data);
    }
    catch (error) {
        return createErrorResponse(error as ApiError)
    }
}