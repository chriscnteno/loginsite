import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body || {}

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, message: "Email and password required." },
        { status: 400 }
      )
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json(
        { ok: false, message: error.message || "Invalid credentials." },
        { status: 401 }
      )
    }

    return NextResponse.json({
      ok: true,
      session: data.session,
      user: data.user,
    })
  } catch (err) {
    console.error("Login error:", err)
    return NextResponse.json(
      { ok: false, message: "Invalid request." },
      { status: 400 }
    )
  }
}
