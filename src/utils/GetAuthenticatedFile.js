import { S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand } from '@aws-sdk/client-s3';


const client = new S3Client({
    region: "default",
    endpoint: "https://s3.ir-thr-at1.arvanstorage.ir",
    credentials: {
        accessKeyId: "f498e792-c551-414f-b454-fe8504b4a84c",
        secretAccessKey: "3af1dd1d77aec9dde3ac5d3d10c8a9ac35391084d259b89b9cd62f285065d5ad"
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