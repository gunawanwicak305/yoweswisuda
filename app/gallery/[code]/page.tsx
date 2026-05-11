import { supabase } from "../../../lib/supabase"

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {

  const { code } = await params

  // participant
  const { data: participant } = await supabase
    .from("participants")
    .select("*")
    .eq("participant_code", code)
    .single()

  // photos
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

         <div
  key={photo.id}
  className="bg-white rounded-3xl overflow-hidden"
>

  <img
    src={photo.image_url}
    alt="wisuda"
    className="rounded-t-3xl w-full h-[400px] object-cover"
  />

  <a
    href={photo.image_url}
    download
    target="_blank"
    className="block text-center bg-black text-white py-4 font-bold hover:bg-zinc-800"
  >
    Download Foto
  </a>

</div>

    </main>

  )
}