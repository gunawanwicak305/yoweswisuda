"use client"

import Link from "next/link"
import { useState } from "react"

export default function BulkUploadPage() {

  const [zipFile, setZipFile] =
    useState<File | null>(null)

  const [csvFile, setCsvFile] =
    useState<File | null>(null)

  const [loading, setLoading] =
    useState(false)

  const handleUpload = async () => {

    if (!zipFile || !csvFile) {

      alert("ZIP dan CSV wajib diupload")
      return

    }

    setLoading(true)

    try {

      const formData = new FormData()

      formData.append("zip", zipFile)
      formData.append("csv", csvFile)

      const response = await fetch(

        "/api/bulk-upload",

        {

          method: "POST",

          body: formData,

        }

      )

      const result =
        await response.json()

      alert(result.message)

    } catch (error) {

      console.log(error)

      alert("Upload gagal")

    }

    setLoading(false)

  }

  return (

    <main className="min-h-screen bg-[#f5f1eb] text-black">

      {/* NAVBAR */}

      <header className="border-b border-zinc-200 bg-white">

        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

          <Link
            href="/"
            className="text-4xl font-black tracking-tight"
          >

            YowesWisuda

          </Link>

          <div className="flex items-center gap-8">

            <Link
              href="/"
              className="uppercase tracking-[0.25em] text-sm font-semibold hover:opacity-60 transition"
            >

              Home

            </Link>

            <button className="bg-black text-white px-6 py-3 rounded-full text-sm uppercase tracking-[0.2em] font-semibold">

              Logout

            </button>

          </div>

        </div>

      </header>

      {/* CONTENT */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="mb-20">

          <p className="uppercase tracking-[0.35em] text-zinc-400 text-sm font-semibold mb-6">

            Admin Dashboard

          </p>

          <h1 className="text-7xl font-black leading-none mb-8">

            Bulk Upload
            <br />
            Gallery Wisuda
          </h1>

          <p className="text-zinc-500 text-xl leading-relaxed max-w-2xl">

            Upload ZIP foto dan CSV data mahasiswa
            secara otomatis.

          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT */}

          <div className="bg-white rounded-[40px] p-10 border border-zinc-200">

            <h2 className="text-3xl font-black mb-10">

              Upload Files

            </h2>

            <div className="space-y-8">

              {/* ZIP */}

              <div>

                <label className="block uppercase tracking-[0.2em] text-sm font-black mb-4">

                  Upload ZIP Foto

                </label>

                <input
                  type="file"
                  accept=".zip"
                  onChange={(e) =>
                    setZipFile(
                      e.target.files?.[0] || null
                    )
                  }
                  className="w-full border border-zinc-200 rounded-2xl px-6 py-5 bg-[#faf8f5]"
                />

              </div>

              {/* CSV */}

              <div>

                <label className="block uppercase tracking-[0.2em] text-sm font-black mb-4">

                  Upload CSV Data

                </label>

                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) =>
                    setCsvFile(
                      e.target.files?.[0] || null
                    )
                  }
                  className="w-full border border-zinc-200 rounded-2xl px-6 py-5 bg-[#faf8f5]"
                />

              </div>

              {/* BUTTON */}

              <button
                onClick={handleUpload}
                disabled={loading}
                className="w-full bg-black text-white py-5 rounded-2xl uppercase tracking-[0.25em] font-black hover:scale-[1.02] transition"
              >

                {loading
                  ? "Uploading..."
                  : "Upload Gallery"}

              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div className="bg-white rounded-[40px] p-10 border border-zinc-200 flex flex-col justify-between">

            <div>

              <p className="uppercase tracking-[0.35em] text-zinc-400 text-sm font-semibold mb-6">

                System Information

              </p>

              <h2 className="text-5xl font-black leading-tight mb-10">

                Modern
                <br />
                Graduation
                <br />
                Gallery System
              </h2>

            </div>

            <div className="space-y-8">

              <div className="border-t border-zinc-200 pt-6">

                <h3 className="font-black text-xl mb-3">

                  Auto Mapping Folder

                </h3>

                <p className="text-zinc-500 leading-relaxed">

                  Sistem otomatis membaca folder ZIP
                  dan mencocokkan data berdasarkan NIM.

                </p>

              </div>

              <div className="border-t border-zinc-200 pt-6">

                <h3 className="font-black text-xl mb-3">

                  Upload Cepat

                </h3>

                <p className="text-zinc-500 leading-relaxed">

                  Upload ribuan foto sekaligus tanpa input manual.

                </p>

              </div>

              <div className="border-t border-zinc-200 pt-6">

                <h3 className="font-black text-xl mb-3">

                  Gallery Otomatis

                </h3>

                <p className="text-zinc-500 leading-relaxed">

                  Gallery mahasiswa langsung siap diakses.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>

  )

}