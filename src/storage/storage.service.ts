import {
  CreateBucketCommand,
  HeadBucketCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';

@Injectable()
export class StorageService implements OnModuleInit {
  private s3Client: S3Client;

  constructor() {
    const region = process.env.S3_REGION;
    const user = process.env.S3_ACCESS_KEY;
    const password = process.env.S3_SECRET_KEY;
    const endpoint = process.env.S3_ENDPOINT;
    this.s3Client = new S3Client({
      region,
      endpoint,
      credentials: { accessKeyId: user!, secretAccessKey: password! },
      forcePathStyle: true,
    });
  }
  async onModuleInit() {
    const bucketName = process.env.S3_BUCKET_NAME;
    try {
      const headBucketCommand = new HeadBucketCommand({ Bucket: bucketName });
      await this.s3Client.send(headBucketCommand);
    } catch {
      const createBucketCommand = new CreateBucketCommand({
        Bucket: bucketName,
      });
      await this.s3Client.send(createBucketCommand);
    }
  }

  async uploadFile(fileBuffer: Buffer, fileName: string, mimeType: string) {
    try {
      const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        Body: fileBuffer,
        ContentType: mimeType,
      });
      await this.s3Client.send(command);
      return `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET_NAME}/${fileName}`;
    } catch {
      throw new InternalServerErrorException("Couldn't upload file to storage");
    }
  }
}
