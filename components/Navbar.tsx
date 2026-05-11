export default function Navbar() {

  return (

    <nav className="border-b border-gray-800 bg-black text-white">

      <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          YowesWisuda
        </h1>

        <a
          href="/admin/upload"
          className="bg-white text-black px-5 py-2 rounded-xl font-semibold"
        >
          Upload
        </a>

      </div>

    </nav>

  )
}