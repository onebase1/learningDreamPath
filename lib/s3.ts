// src/lib/s3.ts


// First, let's create a utility for S3 uploads
// path: lib/s3.ts

// path: lib/s3.ts

// lib/s3.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToS3(file: Buffer, filename: string, contentType: string) {
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: `speaking-recordings/${filename}`,
      Body: file,
      ContentType: contentType,
      // Removed ACL setting
    });

    await s3Client.send(command);
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/speaking-recordings/${filename}`;
  } catch (error) {
    console.error('S3 upload error:', error);
    throw error;
  }
}

// export async function saveToS3(imageBuffer: Buffer, key: string): Promise<string> {
//   const command = new PutObjectCommand({
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: key,
//     Body: imageBuffer,
//     ContentType: 'image/png'
//   });

//   await s3.send(command);
  
//   return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
// }