import { NextResponse } from "next/server"

export async function GET(
  req: Request
) {

  const { searchParams } =
    new URL(req.url)

  const imageUrl =
    searchParams.get("url")

  const filename =
    searchParams.get("filename")

  if (!imageUrl) {

    return new NextResponse(
      "Image tidak ada",
      {
        status: 400,
      }
    )

  }

  const response =
    await fetch(imageUrl)

  const blob =
    await response.blob()

  return new NextResponse(
    blob,
    {

      headers: {

        "Content-Type":
          blob.type,

        "Content-Disposition":
          `attachment; filename="${filename || "photo.jpg"}"`,

      },

    }
  )

}