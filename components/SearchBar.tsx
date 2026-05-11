"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SearchBar() {

  const [search, setSearch] = useState("")
  const router = useRouter()

  const handleSearch = () => {

    if (!search) return

    router.push(`/gallery/${search}`)
  }

  return (

    <div className="flex gap-3">

      <input
        type="text"
        placeholder="Masukkan kode peserta..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-white text-black rounded-2xl px-5 py-4 outline-none"
      />

      <button
        onClick={handleSearch}
        className="bg-white text-black px-8 rounded-2xl font-semibold"
      >
        Cari
      </button>

    </div>

  )
}