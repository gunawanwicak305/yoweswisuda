import { supabase } from "../../../lib/supabase"

type Props = {
  params: Promise<{
    code: string
  }>
}

export default async function GalleryPage({
  params
}: Props) {

  const { code } = await params

  // ambil participant
  const { data: participant } = await supabase
    .from("participants")
    .select("*")
    .eq("participant_code", code)
    .single()

  // ambil photos
  const { data: photos } = await supabase
    .from("photos")
    .select("*")
    .eq("participant_code", code)

  if (!participant) {

    return (
      <main className="p-10">
        <h1 className="text-3xl font-bold">
          Peserta tidak ditemukan
        </h1>
      </main>
    )
  }

  return (

    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold">
        {participant.full_name}
      </h1>

      <p className="mt-2 text-gray-600">
        Kode: {participant.participant_code}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">

        {photos?.map((photo) => (

          <img
            key={photo.id}
            src={photo.image_url}
            alt="wisuda"
            className="rounded-2xl w-full h-[400px] object-cover"
          />

        ))}

      </div>

    </main>

  )
}