import { getSession } from "@/lib/auth/auth-server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const user = await getSession()
    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 401 })
  }
}
