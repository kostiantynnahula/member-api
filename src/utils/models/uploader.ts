import * as AWS from 'aws-sdk';
import * as stream from 'stream';

export type S3UploadStream = {
  writeStream: stream.PassThrough;
  promise: Promise<AWS.S3.ManagedUpload.SendData>;
};
