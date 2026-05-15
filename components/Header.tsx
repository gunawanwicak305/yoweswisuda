"use client"

import Link from "next/link"

export default function Header() {

  return (

    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* logo */}
        <Link
          href="/"
          className="text-3xl font-black tracking-tight hover:opacity-80 transition"
        >
          YowesWisuda
        </Link>

        {/* nav */}
        <nav className="hidden md:flex items-center gap-10">

          <Link
            href="/tentang"
            className="text-zinc-300 hover:text-white hover:-translate-y-1 transition duration-300"
          >
            Tentang Kami
          </Link>

          <a
            href="#gallery"
            className="text-zinc-300 hover:text-white hover:-translate-y-1 transition duration-300"
          >
            Gallery Wisuda
          </a>

          <a
            href="#kontak"
            className="text-zinc-300 hover:text-white hover:-translate-y-1 transition duration-300"
          >
            Kontak
          </a>

        </nav>

        {/* login */}
        <Link
          href="/login"
          className="bg-white text-black px-6 py-3 rounded-2xl font-bold hover:scale-105 hover:bg-zinc-200 transition duration-300"
        >
          Login
        </Link>

      </div>

    </header>

  )
}