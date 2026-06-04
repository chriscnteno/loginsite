import Link from "next/link"

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome</h1>
        <p className="text-gray-600 mb-8">You are logged in!</p>
        <div className="flex gap-4 justify-center">
          <Link href="/" className="text-blue-600 hover:underline">
            Go to login
          </Link>
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
