import { NextResponse } from "next/server"
import AdmZip from "adm-zip"
import { v4 as uuidv4 } from "uuid"
import { parse } from "csv-parse/sync"

import { supabase } from "@/lib/supabase"
import { processImage } from "@/lib/process-image"

export async function POST(req: Request) {

  try {

    const formData =
      await req.formData()

    const zipFile =
      formData.get("zip") as File

    const csvFile =
      formData.get("csv") as File

    if (!zipFile || !csvFile) {

      return NextResponse.json({

        success: false,

        message:
          "ZIP dan CSV wajib diupload",

      })

    }

    // ======================
    // PARSE CSV
    // ======================

    const csvText =
      await csvFile.text()

    const csvData = parse(

      csvText,

      {

        columns: true,

        skip_empty_lines: true,

      }

    )

    // mapping folder
    const folderMap: any = {}

    csvData.forEach((row: any) => {

      folderMap[
        row.folder_no.trim()
      ] = row

    })

    // ======================
    // READ ZIP
    // ======================

    const zipBuffer =
      Buffer.from(
        await zipFile.arrayBuffer()
      )

    const zip =
      new AdmZip(zipBuffer)

    const entries =
      zip.getEntries()

    const groupedPhotos:
      any = {}

    for (const entry of entries) {

      if (entry.isDirectory)
        continue

      const path =
        entry.entryName

      const parts =
        path.split("/")

      // cari folder angka
      const folderNo =
        parts.find((p) =>
          /^\d+$/.test(
            p.trim()
          )
        )?.trim()

      if (!folderNo)
        continue

      const fileName =
        parts[
          parts.length - 1
        ]

      const isImage =
        /\.(jpg|jpeg|png|webp)$/i.test(
          fileName
        )

      if (!isImage)
        continue

      if (
        !groupedPhotos[
          folderNo
        ]
      ) {

        groupedPhotos[
          folderNo
        ] = []

      }

      groupedPhotos[
        folderNo
      ].push(entry)

    }

    // ======================
    // LOOP MAHASISWA
    // ======================

    let totalUploaded = 0

    for (const folderNo in groupedPhotos) {

      const student =
        folderMap[
          folderNo
        ]

      if (!student) {

        console.log(
          "Folder tidak ada di CSV:",
          folderNo
        )

        continue

      }

      const nim =
        student.nim

      const nama =
        student.nama

      const kampus =
        student.kampus

      // ======================
      // INSERT PARTICIPANT
      // ======================

      const {

        data: participant,

        error: participantError,

      } =
        await supabase

          .from(
            "participants"
          )

    .upsert({

  nim,

  nama,

  kampus,

  folder_no:
    folderNo,

})

          .select()

          .single()

      if (participantError) {

        console.log(
          participantError
        )

        throw new Error(
          participantError.message
        )

      }

      // ======================
      // UPLOAD FOTO
      // ======================

      const photoRows = []

      for (
        const entry of groupedPhotos[
          folderNo
        ]
      ) {

        const imageBuffer =
          entry.getData()

        const processedImage =
          await processImage(
            imageBuffer
          )

        const fileName =
          `${uuidv4()}.jpg`

        const filePath =
          `${nim}/${fileName}`

        // upload storage
        const {
          error
        } =
          await supabase.storage

            .from(
              "wisuda-photos"
            )

            .upload(

              filePath,

              processedImage,

              {

                contentType:
                  "image/jpeg",

                upsert: true,

              }

            )

        if (error) {

          console.log(
            error
          )

          continue

        }

        // public url
        const { data } =
          supabase.storage

            .from(
              "wisuda-photos"
            )

            .getPublicUrl(
              filePath
            )

        photoRows.push({

          participant_id:
            participant.id,

          image_url:
            data.publicUrl,

        })

        totalUploaded++

      }

      // ======================
      // INSERT PHOTOS
      // ======================

      if (
        photoRows.length > 0
      ) {

        const {
          error: photoError
        } =
          await supabase

            .from("photos")

            .insert(
              photoRows
            )

        if (photoError) {

          console.log(
            photoError
          )

          throw new Error(
            photoError.message
          )

        }

      }

    }

    return NextResponse.json({

      success: true,

      message:
        `🔥 Upload sukses ${totalUploaded} foto`,

    })

  } catch (error: any) {

    console.log(error)

    return NextResponse.json({

      success: false,

      message:
        error?.message ||
        "Server error",

    })

  }

}