import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = body || {}

    if (!email) {
      return NextResponse.json(
        { ok: false, message: "Email required." },
        { status: 400 }
      )
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password`,
    })

    if (error) {
      return NextResponse.json(
        { ok: false, message: error.message || "Unable to send reset email." },
        { status: 400 }
      )
    }

    return NextResponse.json({
      ok: true,
      message: "Password reset email sent.",
      data,
    })
  } catch (err) {
    console.error("Forgot password error:", err)
    return NextResponse.json(
      { ok: false, message: "Invalid request." },
      { status: 400 }
    )
  }
}
