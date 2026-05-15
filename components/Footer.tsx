export default function Footer() {

  return (

    <footer className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* brand */}
          <div>

            <h2 className="text-3xl font-black">
              YowesWisuda
            </h2>

            <p className="text-zinc-400 mt-5 leading-relaxed">
              Platform gallery wisuda modern untuk mencari dan download foto wisuda dengan cepat dan praktis.
            </p>

          </div>

          {/* navigation */}
          <div>

            <h3 className="text-xl font-bold">
              Navigasi
            </h3>

            <div className="flex flex-col gap-3 mt-5">

              <a
                href="/"
                className="text-zinc-400 hover:text-white transition"
              >
                Home
              </a>

              <a
                href="/login"
                className="text-zinc-400 hover:text-white transition"
              >
                Login
              </a>

            </div>

          </div>

          {/* tentang */}
          <div>

            <h3 className="text-xl font-bold">
              Tentang
            </h3>

            <div className="flex flex-col gap-3 mt-5">

              <a
                href="#"
                className="text-zinc-400 hover:text-white transition"
              >
                Tentang Kami
              </a>

              <a
                href="#"
                className="text-zinc-400 hover:text-white transition"
              >
                Gallery Wisuda
              </a>

            </div>

          </div>

          {/* kontak */}
          <div>

            <h3 className="text-xl font-bold">
              Kontak
            </h3>

            <div className="flex flex-col gap-3 mt-5">

              <a
                href="https://instagram.com/yowesfoto"
                target="_blank"
                className="text-zinc-400 hover:text-white transition"
              >
                Instagram
              </a>

              <a
                href="https://wa.me/6285156077596"
                target="_blank"
                className="text-zinc-400 hover:text-white transition"
              >
                WhatsApp
              </a>

            </div>

          </div>

        </div>

        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-5">

          <p className="text-zinc-500 text-sm">
            © 2026 YowesWisuda. All rights reserved.
          </p>

          <p className="text-zinc-500 text-sm">
            Crafted by YowesFoto 📸
          </p>

        </div>

      </div>

    </footer>

  )
}