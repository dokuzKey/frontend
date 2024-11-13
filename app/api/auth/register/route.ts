import { register } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, username, password } = body;
    
    const data = await register(email, username, password);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { status: 0, message: "Something went wrong" },
      { status: 500 }
    );
  }
}