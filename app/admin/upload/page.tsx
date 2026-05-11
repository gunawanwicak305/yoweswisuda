"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../../lib/supabase"

export default function UploadPage() {

  const router = useRouter()

  const [loading, setLoading] = useState(true)

  const [files, setFiles] = useState<File[]>([])

  const [code, setCode] = useState("")
  const [name, setName] = useState("")

  // cek login
  useEffect(() => {

    const checkUser = async () => {

      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) {

        router.push("/login")

      } else {

        setLoading(false)

      }

    }

    checkUser()

  }, [router])

  const handleUpload = async () => {

    if (!files.length || !code || !name) {

      alert("Lengkapi semua data dulu 😎")

      return
    }

    // insert participant
    await supabase
      .from("participants")
      .upsert({
        participant_code: code,
        full_name: name
      })

    // upload semua foto
    for (const file of files) {

      const cleanFileName = file.name
        .replaceAll(" ", "-")
        .replace(/[^\w.-]/g, "")

      const filePath =
        `${code.trim()}/${Date.now()}-${cleanFileName}`

      // upload storage
      const { error: uploadError } = await supabase
        .storage
        .from("wisuda-photos")
        .upload(filePath, file)

      if (uploadError) {

        alert(uploadError.message)

        return
      }

      // public url
      const { data } = supabase
        .storage
        .from("wisuda-photos")
        .getPublicUrl(filePath)

      const imageUrl = data.publicUrl

      // insert photo
      await supabase
        .from("photos")
        .insert({
          participant_code: code,
          image_url: imageUrl
        })

    }

    alert("Upload berhasil 🔥")

    setCode("")
    setName("")
    setFiles([])

  }

  if (loading) {

    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Loading...
        </h1>
      </main>
    )
  }

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-xl mx-auto">

        <h1 className="text-5xl font-bold">
          Upload Foto Wisuda
        </h1>

        <p className="text-gray-400 mt-3">
          Admin Only
        </p>

        <div className="mt-10 flex flex-col gap-4">

          <input
            type="text"
            placeholder="Nama peserta"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white text-black rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="text"
            placeholder="Kode peserta"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="bg-white text-black rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="file"
            multiple
            onChange={(e) => {

              if (e.target.files) {
                setFiles(Array.from(e.target.files))
              }

            }}
            className="border border-gray-700 rounded-2xl p-4"
          />

          <button
            onClick={handleUpload}
            className="bg-white text-black py-4 rounded-2xl font-bold"
          >
            Upload Semua Foto
          </button>

        </div>

      </div>

    </main>

  )
}