"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      alert(error.message)
      return
    }

    router.push("/admin/upload")
  }

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="w-full max-w-md bg-zinc-900 p-10 rounded-3xl">

        <h1 className="text-4xl font-bold">
          Admin Login
        </h1>

        <div className="mt-8 flex flex-col gap-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white text-black rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white text-black rounded-2xl px-5 py-4 outline-none"
          />

          <button
            onClick={handleLogin}
            className="bg-white text-black py-4 rounded-2xl font-bold"
          >
            Login
          </button>

        </div>

      </div>

    </main>

  )
}