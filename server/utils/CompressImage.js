import sharp from "sharp";

export async function ResizedBase64(base64String) {
  try {
    // 1. استخراج البيانات فقط وحذف الجزء النصي (data:image/jpeg;base64,)
    const base64Data = base64String.split(";base64,").pop();

    // 2. تحويل النص إلى Buffer
    const imageBuffer = Buffer.from(base64Data, "base64");

    // 3. معالجة الصورة باستخدام sharp
    const compressedBuffer = await sharp(imageBuffer)
      .resize({ width: 800, withoutEnlargement: true })
      .jpeg({ quality: 60 })
      .toBuffer();

    return `data:image/jpeg;base64,${compressedBuffer.toString("base64")}`;
  } catch (error) {
    console.error(error);
    return base64String; // في حال فشل الضغط، أرجع الصورة الأصلية أو تعامل مع الخطأ
  }
}
