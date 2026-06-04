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

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      return NextResponse.json(
        { ok: false, message: error.message || "Sign up failed." },
        { status: 400 }
      )
    }

    return NextResponse.json({
      ok: true,
      user: data.user,
      message: "Account created successfully. Please confirm your email if required.",
    })
  } catch (err) {
    console.error("Sign up error:", err)
    return NextResponse.json(
      { ok: false, message: "Invalid request." },
      { status: 400 }
    )
  }
}
