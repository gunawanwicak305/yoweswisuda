{/* NAVBAR */}

<nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/5">

  <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

    {/* LOGO */}

    <a
      href="/"
      className="text-4xl font-black tracking-tight text-zinc-900"
    >
      YowesWisuda
    </a>

    {/* MENU */}

    <div className="flex items-center gap-10 text-sm font-bold uppercase tracking-[0.2em] text-zinc-800">

      <a
        href="/"
        className="hover:opacity-60 transition duration-300"
      >
        Home
      </a>

      <a
        href="/"
        className="hover:opacity-60 transition duration-300"
      >
        Cari Foto
      </a>

      <a
        href="/gallery"
        className="hover:opacity-60 transition duration-300"
      >
        Gallery
      </a>

      <a
        href="/products"
        className="hover:opacity-60 transition duration-300"
      >
        Products
      </a>

      <a
        href="/contact"
        className="hover:opacity-60 transition duration-300"
      >
        Contact
      </a>

      <a
        href="/login"
        className="bg-zinc-900 text-white px-6 py-3 rounded-full hover:scale-105 transition duration-300"
      >
        Admin
      </a>

    </div>

  </div>

</nav>