import { S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand } from '@aws-sdk/client-s3';


const client = new S3Client({
    region: "default",
    endpoint: "https://storage.c2.liara.space",
    credentials: {
        accessKeyId: "pvh0qbqv0skuthhg",
        secretAccessKey: "13dcfc0c-b437-4100-8912-b54d26cf0a9a"
    },
});




export const getSignedUrlsForFiles = async (files) => {
  const promises = files.map(async (file) => {
    const command = new GetObjectCommand({
      Bucket: 'arastme',
      Key: file.FileCompressed,
    });

    try {
      const url = await getSignedUrl(client, command, { expiresIn: 86400 }); // تاریخ انقضا: 24 ساعت
      return {
        Id: file.Id, // آیدی اختصاصی فایل
        url,        // لینک امضا شده
      };
    } catch (error) {
      console.error('Error getting signed URL', error);
      throw error;
    }
  });


  return Promise.all(promises);
};