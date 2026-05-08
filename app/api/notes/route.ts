import { NextResponse, NextRequest } from "next/server";
import { api, ApiError, createErrorResponse } from "@/app/api/api";



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

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { data } = await api.post("/notes", body);
        return NextResponse.json(data);
    } catch (error) {
        return createErrorResponse(error as ApiError)
    }
}