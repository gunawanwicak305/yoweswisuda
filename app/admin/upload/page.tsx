"use client"

import { useState } from "react"
import { supabase } from "../../../lib/supabase"

export default function UploadPage() {

  const [files, setFiles] = useState<File[]>([])
  const [code, setCode] = useState("")

  const handleUpload = async () => {

    if (!files.length || !code) {
      alert("Isi kode dan pilih foto dulu")
      return
    }

    for (const file of files) {

      const cleanFileName = file.name
        .replaceAll(" ", "-")
        .replace(/[^\w.-]/g, "")

      const filePath =
        `${code.trim()}/${Date.now()}-${cleanFileName}`

      // upload ke storage
      const { error: uploadError } = await supabase
        .storage
        .from("wisuda-photos")
        .upload(filePath, file)

      if (uploadError) {

        console.log(uploadError)

        alert(uploadError.message)

        return
      }

      // ambil public url
      const { data } = supabase
        .storage
        .from("wisuda-photos")
        .getPublicUrl(filePath)

      const imageUrl = data.publicUrl

      // simpan ke database
      await supabase
        .from("photos")
        .insert({
          participant_code: code,
          image_url: imageUrl
        })

    }

    alert("Semua foto berhasil diupload 🔥")
  }

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-xl mx-auto">

        <h1 className="text-5xl font-bold">
          Upload Foto Wisuda
        </h1>

        <p className="text-gray-400 mt-3">
          Upload banyak foto sekaligus
        </p>

        <div className="mt-10 flex flex-col gap-4">

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