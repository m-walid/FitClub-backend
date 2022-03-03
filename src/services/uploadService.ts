import { PutObjectCommand, DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { genRandomKey } from '@utils/randomKey';

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    accessKeyId: process.env.AWS_S3_KEY_ID,
  },
});
const bucketName = process.env.AWS_S3_BUCKET_NAME;

export default class UploadService {
  static getUploadUrl = async () => {
    const key = genRandomKey();
    const bucketParams = {
      Bucket: bucketName,
      Key: key,
    };
    const putCommand = new PutObjectCommand(bucketParams);
    const signedUrl = await getSignedUrl(s3Client, putCommand, {
      expiresIn: 60 * 5, // 5 minutes
    });
    return { signedUrl, key };
  };

  static deleteObject = async (key) => {
    const bucketParams = {
      Bucket: bucketName,
      Key: key,
    };
    const deleteCommand = new DeleteObjectCommand(bucketParams);
    const res = await s3Client.send(deleteCommand);
    return res;
  };

  static getMultipleUploadUrls = async (urlsNo) => {
    const promises = [];
    while (urlsNo--) promises.push(UploadService.getUploadUrl());
    return await Promise.all(promises);
  };
}
