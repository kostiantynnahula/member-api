import * as AWS from 'aws-sdk';
import * as stream from 'stream';
import { S3UploadStream } from '../models/uploader';

export class UploaderService {
  private s3: AWS.S3;

  constructor() {
    AWS.config.update({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
    });
    this.s3 = new AWS.S3();
  }

  createUploadStream(key: string): S3UploadStream {
    const pass = new stream.PassThrough();
    const result = {
      writeStream: pass,
      promise: this.s3
        .upload({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: key,
          Body: pass,
          ACL: 'public-read',
        })
        .promise(),
    };
    return result;
  }
}
