import { supabase } from "../../../lib/supabase"

type Props = {
  params: {
    code: string
  }
}

export default async function GalleryPage({
  params
}: Props) {

  const { data: participant } = await supabase
    .from("participants")
    .select("*")
    .eq("participant_code", params.code)
    .single()

  const { data: photos } = await supabase
    .from("photos")
    .select("*")
    .eq("participant_code", params.code)

  if (!participant) {

    return (
      <main className="p-10 text-white bg-black min-h-screen">

        <h1 className="text-3xl font-bold">
          Peserta tidak ditemukan
        </h1>

      </main>
    )
  }

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold">
          {participant.full_name}
        </h1>

        <p className="mt-3 text-gray-400 text-lg">
          Kode: {participant.participant_code}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">

          {photos?.map((photo) => (

            <div
              key={photo.id}
              className="overflow-hidden rounded-3xl bg-white"
            >

              <img
                src={photo.image_url}
                alt="wisuda"
                className="w-full h-[400px] object-cover hover:scale-105 duration-300"
              />

              <a
                href={photo.image_url}
                download
                target="_blank"
                className="block bg-white text-black text-center py-3 font-semibold"
              >
                Download
              </a>

            </div>

          ))}

        </div>

      </div>

    </main>

  )
}