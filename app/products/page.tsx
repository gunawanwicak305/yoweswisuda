"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {

  const router = useRouter()

  const [kampus, setKampus] =
    useState("UNPAM")

  const [nim, setNim] =
    useState("")

  const heroImages = [

    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1600&auto=format&fit=crop",

    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",

    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1600&auto=format&fit=crop",

  ]

  const galleryImages = [

    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",

    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",

    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",

    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop",

    "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",

    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",

  ]

  const products = [

    {
      title: "Toga Wisuda",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop",
    },

    {
      title: "Bouquet",
      image:
        "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1200&auto=format&fit=crop",
    },

    {
      title: "Patung Wisuda",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    },

    {
      title: "Photo Frame",
      image:
        "https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=1200&auto=format&fit=crop",
    },

  ]

  const [currentSlide, setCurrentSlide] =
    useState(0)

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentSlide((prev) =>
        prev === heroImages.length - 1
          ? 0
          : prev + 1
      )

    }, 4000)

    return () => clearInterval(interval)

  }, [heroImages.length])

  const handleSearch = () => {

    if (!nim) {

      alert("Masukkan NIM dulu 😭")
      return

    }

    router.push(`/find/${kampus}/${nim}`)

  }

  return (

    <main className="bg-[#f5f1eb] text-zinc-900 overflow-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-black/5">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <a
            href="/"
            className="text-3xl font-black tracking-tight"
          >

            YowesWisuda

          </a>

          <div className="hidden md:flex items-center gap-10 text-sm font-bold uppercase tracking-[0.2em]">

            <button
              onClick={() =>
                window.scrollTo({
                  top: 850,
                  behavior: "smooth",
                })
              }
              className="hover:opacity-60 transition"
            >

              Cari Foto

            </button>

            <a
              href="/gallery"
              className="hover:opacity-60 transition"
            >

              Gallery

            </a>

            <a
              href="/products"
              className="hover:opacity-60 transition"
            >

              Products

            </a>

            <a
              href="/login"
              className="bg-zinc-900 text-white px-6 py-3 rounded-full hover:scale-105 transition"
            >

              Admin

            </a>

          </div>

        </div>

      </nav>

      {/* HERO */}
      <section className="relative h-screen overflow-hidden z-0">

        {heroImages.map((image, index) => (

          <img
            key={index}
            src={image}
            alt="hero"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${
              currentSlide === index
                ? "opacity-100"
                : "opacity-0"
            }`}
          />

        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">

          <div className="max-w-3xl text-white">

            <p className="uppercase tracking-[0.4em] text-sm text-white/60 mb-6 font-semibold">

              Graduation Memories

            </p>

            <h1 className="text-7xl md:text-8xl font-black leading-[0.9] mb-8">

              Find Your
              <br />
              Graduation
              <br />
              Moments

            </h1>

            <p className="text-xl text-white/80 leading-relaxed max-w-2xl mb-10">

              Dokumentasi wisuda premium dengan
              nuansa modern, cinematic, dan elegan.

            </p>

            <div className="flex flex-wrap gap-4">

              <button
                onClick={() =>
                  window.scrollTo({
                    top: 850,
                    behavior: "smooth",
                  })
                }
                className="bg-white text-zinc-900 px-8 py-5 rounded-full font-bold uppercase tracking-[0.2em] hover:scale-105 transition duration-300"
              >

                Cari Foto

              </button>

              <a
                href="/gallery"
                className="border border-white/30 bg-white/10 backdrop-blur-xl text-white px-8 py-5 rounded-full font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-zinc-900 transition duration-300"
              >

                Explore Gallery

              </a>

            </div>

          </div>

        </div>

      </section>

      {/* SEARCH */}
      <section className="relative z-50 py-32 px-6">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>

            <p className="uppercase tracking-[0.4em] text-sm text-zinc-400 mb-5 font-semibold">

              Search System

            </p>

            <h2 className="text-6xl font-black leading-tight mb-8">

              Cari Foto
              <br />
              Wisuda Kamu

            </h2>

            <p className="text-zinc-500 text-xl leading-relaxed">

              Cari gallery wisuda mahasiswa secara
              otomatis menggunakan kampus dan NIM.

            </p>

          </div>

          {/* RIGHT */}
          <div className="relative z-30 bg-white rounded-[40px] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">

            <div className="space-y-6">

              {/* KAMPUS */}
              <div>

                <label className="block text-sm font-black uppercase tracking-[0.2em] mb-3">

                  Institution

                </label>

                <select
                  value={kampus}
                  onChange={(e) =>
                    setKampus(e.target.value)
                  }
                  className="w-full border border-zinc-200 rounded-2xl px-6 py-5 outline-none bg-white text-zinc-900"
                >

                  <option value="UNPAM">
                    UNPAM
                  </option>

                  <option value="UNTIRTA">
                    UNTIRTA
                  </option>

                  <option value="BINUS">
                    BINUS
                  </option>

                </select>

              </div>

              {/* NIM */}
              <div>

                <label className="block text-sm font-black uppercase tracking-[0.2em] mb-3">

                  Student ID (NIM)

                </label>

                <input
                  type="text"
                  placeholder="Masukkan NIM"
                  value={nim}
                  onChange={(e) =>
                    setNim(e.target.value)
                  }
                  className="w-full border border-zinc-200 rounded-2xl px-6 py-5 outline-none bg-white text-zinc-900"
                />

              </div>

              {/* BUTTON */}
              <button
                type="button"
                onClick={handleSearch}
                className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:scale-[1.02] transition duration-300 cursor-pointer"
              >

                Search Gallery

              </button>

            </div>

          </div>

        </div>

      </section>

      {/* GALLERY */}
      <section className="px-6 pb-32">

        <div className="max-w-7xl mx-auto">

          <div className="flex items-end justify-between mb-14">

            <div>

              <p className="uppercase tracking-[0.4em] text-sm text-zinc-400 mb-5 font-semibold">

                Portfolio

              </p>

              <h2 className="text-6xl font-black">

                Graduation
                Gallery

              </h2>

            </div>

            <a
              href="/gallery"
              className="text-zinc-900 font-bold uppercase tracking-[0.2em] hover:opacity-60 transition"
            >

              View More →

            </a>

          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">

            {galleryImages.map((image, index) => (

              <div
                key={index}
                className="break-inside-avoid overflow-hidden rounded-[32px] shadow-[0_15px_50px_rgba(0,0,0,0.08)] group"
              >

                <img
                  src={image}
                  alt="gallery"
                  className="w-full object-cover group-hover:scale-105 transition duration-700"
                />

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* PRODUCTS */}
      <section className="px-6 pb-32">

        <div className="max-w-7xl mx-auto">

          <div className="flex items-end justify-between mb-14">

            <div>

              <p className="uppercase tracking-[0.4em] text-sm text-zinc-400 mb-5 font-semibold">

                Graduation Products

              </p>

              <h2 className="text-6xl font-black">

                Essentials
                <br />
                Products

              </h2>

            </div>

            <a
              href="/products"
              className="text-zinc-900 font-bold uppercase tracking-[0.2em] hover:opacity-60 transition"
            >

              View More →

            </a>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {products.map((product, index) => (

              <div
                key={index}
                className="bg-white rounded-[32px] overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.08)] group hover:-translate-y-2 transition duration-500"
              >

                <div className="overflow-hidden">

                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-[320px] object-cover group-hover:scale-105 transition duration-700"
                  />

                </div>

                <div className="p-6">

                  <h3 className="text-2xl font-black mb-6">

                    {product.title}

                  </h3>

                  <a
                    href="https://wa.me/6285156077596"
                    className="inline-flex bg-zinc-900 text-white px-6 py-4 rounded-full font-bold uppercase tracking-[0.2em] hover:scale-105 transition"
                  >

                    Order

                  </a>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

    </main>

  )

}