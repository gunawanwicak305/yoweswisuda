"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(

  process.env.NEXT_PUBLIC_SUPABASE_URL!,

  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

)

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    setLoading(true)

    const { error } =
      await supabase.auth.signInWithPassword({

        email,
        password,

      })

    setLoading(false)

   if (error) {

  console.log(error)

  alert(error.message)

  return

}

    router.push("/admin/bulk-upload")

  }

  return (

    <main className="relative z-50 min-h-screen bg-[#f5f1eb] flex items-center justify-center px-6">

      <div className="relative z-50 w-full max-w-md bg-white rounded-[40px] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">

        {/* HEADER */}

        <div className="mb-10 text-center">

          <p className="uppercase tracking-[0.3em] text-sm text-zinc-400 font-semibold mb-4">

            Admin Panel

          </p>

          <h1 className="text-5xl font-black text-zinc-900">

            Login

          </h1>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          {/* EMAIL */}

          <div>

            <label className="block text-sm font-black uppercase tracking-[0.2em] mb-3">

              Email

            </label>

            <input
              type="email"
              placeholder="admin@email.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border border-zinc-200 rounded-2xl px-6 py-5 outline-none bg-white text-zinc-900 focus:ring-2 focus:ring-zinc-900"
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="block text-sm font-black uppercase tracking-[0.2em] mb-3">

              Password

            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border border-zinc-200 rounded-2xl px-6 py-5 outline-none bg-white text-zinc-900 focus:ring-2 focus:ring-zinc-900"
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:scale-[1.02] transition duration-300 cursor-pointer"
          >

            {loading
              ? "Loading..."
              : "Login Admin"}

          </button>

        </form>

        {/* BACK */}

        <div className="mt-8 text-center">

          <a
            href="/"
            className="text-zinc-500 hover:text-black transition"
          >

            ← Back Home

          </a>

        </div>

      </div>

    </main>

  )

}