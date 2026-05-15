import sharp from "sharp"

export async function processImage(

  imageBuffer: Buffer

) {

  const processedImage =
    await sharp(imageBuffer)

      .resize({
        width: 2000,
        withoutEnlargement: true,
      })

      .jpeg({
        quality: 90,
      })

      .toBuffer()

  return processedImage

}