import { supabase } from "@/lib/supabase"

export default async function GalleryPage({
  params,
}: {
  params: Promise<{
    kampus: string
    nim: string
  }>
}) {

  const {
    kampus,
    nim,
  } = await params

  // PARTICIPANT
  const { data: participant } =
    await supabase
      .from("participants")
      .select("*")
      .eq("nim", nim)
      .single()

  // VALIDASI KAMPUS
  if (
    participant &&
    participant.kampus !== kampus
  ) {

    return (

      <main className="min-h-screen bg-[#f3f1eb] flex items-center justify-center px-6">

        <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[40px] p-16 max-w-2xl w-full text-center">

          <h1 className="text-6xl font-black leading-tight text-zinc-900 mb-6">

            Kampus Tidak
            <br />
            Cocok

          </h1>

          <p className="text-zinc-500 text-xl leading-relaxed mb-10">

            Data mahasiswa tidak sesuai dengan kampus yang dipilih.

          </p>

          <a
            href="/"
            className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-white border border-zinc-300 text-zinc-900 font-bold tracking-[0.2em] uppercase hover:bg-zinc-100 hover:shadow-xl transition duration-300"
          >

            Back Home

          </a>

        </div>

      </main>

    )

  }

  // PHOTOS
 const { data: photos } =
  await supabase
    .from("photos")
    .select("*")
    .eq(
      "participant_id",
      participant.id
    )

  // DATA TIDAK DITEMUKAN
  if (!participant) {

    return (

      <main className="min-h-screen bg-[#f3f1eb] flex items-center justify-center px-6">

        <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[40px] p-16 max-w-2xl w-full text-center">

          <h1 className="text-6xl font-black leading-tight text-zinc-900 mb-6">

            Data Tidak
            <br />
            Ditemukan

          </h1>

          <p className="text-zinc-500 text-xl leading-relaxed mb-10">

            NIM tidak ditemukan di database.

          </p>

          <a
            href="/"
           className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-white border border-zinc-300 text-zinc-900 font-bold tracking-[0.2em] uppercase hover:bg-zinc-100 hover:shadow-xl transition duration-300"
          >

            Back Home

          </a>

        </div>

      </main>

    )

  }

  return (

    <main className="min-h-screen bg-[#f3f1eb] px-6 lg:px-12 py-14">

      <div className="max-w-7xl mx-auto">

      {/* HERO */}
<div className="bg-white rounded-[40px] p-10 md:p-16 shadow-[0_10px_40px_rgba(0,0,0,0.06)] mb-16">

  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">

    {/* LEFT */}
    <div className="max-w-3xl">

      <p className="text-sm tracking-[0.4em] uppercase text-zinc-400 font-semibold mb-6">

        Graduation Gallery

      </p>

      <h1 className="text-5xl md:text-7xl leading-[0.95] font-black text-zinc-900 mb-8">

        {participant.nama}

      </h1>

      <div className="flex flex-wrap items-center gap-8 text-xl">

        <div>

          <span className="font-black text-zinc-900">

            Kampus

          </span>

          <span className="ml-2 text-zinc-500">

            {participant.kampus}

          </span>

        </div>

        <div>

          <span className="font-black text-zinc-900">

            NIM

          </span>

          <span className="ml-2 text-zinc-500">

            {participant.nim}

          </span>

        </div>

      </div>

    </div>

    {/* RIGHT */}
    <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">

      <a
        href="/"
        className="h-[64px] px-10 rounded-2xl border border-zinc-200 flex items-center justify-center font-bold tracking-[0.2em] uppercase hover:bg-zinc-100 transition"
      >

        Back Home

      </a>

      <a
        href={`/api/download-all?nim=${participant.nim}`}
        className="h-[64px] px-10 rounded-2xl bg-zinc-200 text-black flex items-center justify-center font-bold tracking-[0.2em] uppercase hover:bg-zinc-100 transition"
      >

        Download All

      </a>

    </div>

  </div>

</div>

        {/* GALLERY */}
        {photos && photos.length > 0 ? (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">

            {photos.map((photo: any) => (

              <div
                key={photo.id}
                className="group"
              >

                <div className="relative overflow-hidden rounded-[34px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)]">

                  {/* IMAGE */}
                  <div className="overflow-hidden">

                    <img
                      src={photo.image_url}
                      alt="wisuda"
                      className="w-full h-[520px] object-cover group-hover:scale-105 transition duration-700"
                    />

                  </div>

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                  {/* BUTTON */}
<a
  href={`/api/download?url=${encodeURIComponent(photo.image_url)}&filename=wisuda-${nim}.jpg`}
  className="w-full flex items-center justify-center bg-white/90 backdrop-blur-xl text-zinc-900 py-4 rounded-2xl font-bold uppercase tracking-[0.2em] hover:bg-white transition"
>

  Download

</a>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="bg-white rounded-[40px] p-20 text-center shadow-[0_10px_40px_rgba(0,0,0,0.08)]">

            <h2 className="text-5xl font-black text-zinc-900 mb-6">

              Belum Ada Foto

            </h2>

            <p className="text-zinc-500 text-xl">

              Foto wisuda belum diupload.

            </p>

          </div>

        )}

      </div>

    </main>

  )

}