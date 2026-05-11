import Navbar from "../components/Navbar"
import SearchBar from "../components/SearchBar"

export default function Home() {

  return (

    <main className="min-h-screen bg-black text-white">

      <Navbar />

      <section className="max-w-6xl mx-auto px-4 py-32 text-center">

        <p className="text-gray-400 uppercase tracking-[5px]">
          YowesWisuda
        </p>

        <h1 className="text-6xl font-bold mt-6 leading-tight">
          Cari Foto
          <br />
          Wisuda Kamu 🎓
        </h1>

        <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
          Temukan momen terbaik wisuda kamu dengan cepat,
          cukup masukkan kode peserta.
        </p>

        <div className="mt-12 max-w-xl mx-auto">
          <SearchBar />
        </div>

      </section>

    </main>

  )
}