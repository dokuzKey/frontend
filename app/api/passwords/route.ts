import { getToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = await getToken();
    if (!token) {
      return NextResponse.json(
        { status: 0, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const response = await fetch("https://api.sifre.org.tr/fetch/passwords", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { status: 0, message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const token = await getToken();
    if (!token) {
      return NextResponse.json(
        { status: 0, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const response = await fetch("https://api.sifre.org.tr/create/passwords", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, token }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { status: 0, message: "Something went wrong" },
      { status: 500 }
    );
  }
}