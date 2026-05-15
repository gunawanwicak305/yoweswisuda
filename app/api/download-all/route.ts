import { NextResponse } from "next/server"
import JSZip from "jszip"

import { supabase } from "@/lib/supabase"

export async function GET(
  req: Request
) {

  try {

    const { searchParams } =
      new URL(req.url)

    const nim =
      searchParams.get("nim")

    if (!nim) {

      return new NextResponse(
        "NIM kosong",
        {
          status: 400,
        }
      )

    }

    // participant
    const {
      data: participant
    } =
      await supabase

        .from("participants")

        .select("*")

        .eq("nim", nim)

        .single()

    if (!participant) {

      return new NextResponse(
        "Participant tidak ditemukan",
        {
          status: 404,
        }
      )

    }

    // photos
    const {
      data: photos
    } =
      await supabase

        .from("photos")

        .select("*")

        .eq(
          "participant_id",
          participant.id
        )

    if (
      !photos ||
      photos.length === 0
    ) {

      return new NextResponse(
        "Foto tidak ada",
        {
          status: 404,
        }
      )

    }

    const zip =
      new JSZip()

    // download semua foto
    for (
      let i = 0;
      i < photos.length;
      i++
    ) {

      const photo =
        photos[i]

      const response =
        await fetch(
          photo.image_url
        )

      const blob =
        await response.arrayBuffer()

      zip.file(
        `wisuda-${nim}-${i + 1}.jpg`,
        blob
      )

    }

    // generate zip
    const zipBuffer =
  await zip.generateAsync({
    type: "uint8array",
  })

return new NextResponse(
  Buffer.from(zipBuffer),
  {

    headers: {

      "Content-Type":
        "application/zip",

      "Content-Disposition":
        `attachment; filename="wisuda-${nim}.zip"`,

        },

      }
    )

  } catch (error) {

    console.log(error)

    return new NextResponse(
      "Server Error",
      {
        status: 500,
      }
    )

  }

}