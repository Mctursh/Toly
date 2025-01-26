import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cookiePromise = await cookies()
        cookiePromise.delete('refresh_token')
        return NextResponse.json({message: "Ssuccessfully logged out"})
    } catch (error) {
        console.error("Lgout Error", error)
    }
  }