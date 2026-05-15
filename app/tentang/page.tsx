import Header from "../../components/Header"
import Footer from "../../components/Footer"

export default function TentangPage() {

  return (

    <main className="min-h-screen bg-black text-white">

      <Header />

      <section className="max-w-6xl mx-auto px-6 pt-40 pb-32">

        <div className="text-center">

          <p className="uppercase tracking-[0.3em] text-zinc-500 text-sm">
            Tentang Kami
          </p>

          <h1 className="text-6xl font-black mt-6">
            YowesWisuda
          </h1>

          <p className="text-zinc-400 text-xl leading-relaxed max-w-3xl mx-auto mt-10">

            YowesWisuda adalah platform gallery digital
            untuk mencari dan mengunduh foto wisuda
            secara cepat, modern, dan eksklusif.

          </p>

        </div>

      </section>

      <Footer />

    </main>

  )
} 