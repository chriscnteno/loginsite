"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!email) {
      setError("Please enter your email address.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()
      setLoading(false)

      if (!res.ok || !data?.ok) {
        setError(data?.message || "Failed to send reset email")
        return
      }

      setSuccess(true)
      setEmail("")
    } catch (err) {
      setLoading(false)
      setError("Network error. Please try again.")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle>Reset password</CardTitle>
          <CardDescription>
            Enter your email to receive a password reset link.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {success ? (
            <div className="space-y-4">
              <p className="text-sm text-green-600">
                If an account exists with that email, you'll receive a password reset link shortly.
              </p>
              <Button
                onClick={() => setSuccess(false)}
                className="w-full"
              >
                Send another email
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-sm text-red-600">{error}</p>}

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-md border px-3 py-2"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-6"
              >
                {loading ? "Sending..." : "Send reset link"}
              </Button>
            </form>
          )}

          <p className="text-center text-sm text-gray-600 mt-4">
            Remember your password?{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
