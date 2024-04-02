import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {
  s3: AWS.S3;
  bucketName: string;
  publicBucketName: string;

  constructor(private configService: ConfigService) {
    this.publicBucketName = this.configService.get('AWS_S3_PUBLIC_BUCKET_NAME');
    this.bucketName = this.configService.get('AWS_S3_BUCKET_NAME');
    const region = this.configService.get('AWS_S3_REGION_NAME');
    const accessKeyId = this.configService.get('AWS_S3_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get('AWS_S3_SECRET_ACCESS_KEY');
    this.s3 = new AWS.S3({
      accessKeyId,
      secretAccessKey,
      region,
    });
  }

  async getUploadUrl(key: string, contentType: string, bucketName: string) {
    const url = await this.s3.getSignedUrlPromise('putObject', {
      Bucket: bucketName,
      Key: key,
      Expires: 60,
      ContentType: contentType,
    });
    return {
      url,
      key,
    };
  }

  async getSignedUrl(file: string, userId: string, vault: string) {
    return await this.s3.getSignedUrlPromise('getObject', {
      Bucket: this.bucketName,
      Key: `${vault}/${userId}/${file}`,
      Expires: 60,
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    userid: string,
    vault: 'legal' | 'digital',
  ) {
    const { originalname, mimetype, buffer } = file;
    const key = `${vault}/${userid}/${Date.now()}-${originalname}`;
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: buffer,
      ContentType: mimetype,
    };
    return await this.s3.upload(params).promise();
  }

  async uploadPublicFile(
    file: Express.Multer.File,
    userid: string,
    folderName: 'profile',
  ) {
    const { originalname, mimetype, buffer } = file;
    const key = `${folderName}/${userid}-${Date.now()}-${originalname}`;
    const params = {
      Bucket: this.publicBucketName,
      Key: key,
      Body: buffer,
      ContentType: mimetype,
    };
    return await this.s3.upload(params).promise();
  }

  async getFile(file: string, userId: string, vault: 'legal' | 'digital') {
    const params = {
      Bucket: this.bucketName,
      Key: `${vault}/${userId}/${file}`,
    };
    await this.s3
      .getObjectAttributes({
        ...params,
        ObjectAttributes: ['ObjectSize'],
      })
      .promise();
    return this.s3.getObject(params).createReadStream();
  }

  async deleteFile(key: string) {
    const params = {
      Bucket: this.bucketName,
      Key: key,
    };
    const isFileExist = await this.isFileExist(key);
    if (isFileExist) return await this.s3.deleteObject(params).promise();
  }

  async deletePublicFile(file: string, folderName: 'profile') {
    const params = {
      Bucket: this.publicBucketName,
      Key: `${folderName}/${file}`,
    };
    return await this.s3.deleteObject(params).promise();
  }
  async isFileExist(key: string) {
    const exists = await this.s3
      .headObject({
        Bucket: this.bucketName,
        Key: key,
      })
      .promise()
      .then(
        () => true,
        (err) => {
          if (err.code === 'NotFound') {
            return false;
          }
          throw err;
        },
      );
    return exists;
  }
  async copyFile(keyToCopy: string, newKey: string) {
    await this.s3
      .copyObject({
        Bucket: this.bucketName,
        CopySource: `${this.bucketName}/${keyToCopy}`,
        Key: newKey,
      })
      .promise();
  }
  async moveFile(keyToCopy: string, newKey: string) {
    const isFileExist = await this.isFileExist(keyToCopy);
    if (isFileExist) {
      await this.copyFile(keyToCopy, newKey);
      await this.s3
        .deleteObject({
          Bucket: this.bucketName,
          Key: keyToCopy,
        })
        .promise();
    }
  }
}
