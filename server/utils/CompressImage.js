import sharp from "sharp";

export async function ResizedBase64(base64String) {
  try {
    const base64Data = base64String.split(";base64,").pop();

    const imageBuffer = Buffer.from(base64Data, "base64");

    const compressedBuffer = await sharp(imageBuffer)
      .resize({ width: 800, withoutEnlargement: true })
      .jpeg({ quality: 60 })
      .toBuffer();

    return `data:image/jpeg;base64,${compressedBuffer.toString("base64")}`;
  } catch (error) {
    console.error(error);
    return base64String;
  }
}
