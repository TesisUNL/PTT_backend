import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '../config/config.service';
import { v4 as uuid } from 'uuid';
import { FileData } from './imterface';

@Injectable()
export class FilesService {
  bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.bucketName = this.configService.AwsConfig.BUCKET_NAME;
  }

  async uploadPublicFile(file: FileData) {
    const { dataBuffer, fileName } = file;
    const s3 = new S3();

    const uploadResult = await s3
      .upload({
        Bucket: this.configService.AwsConfig.BUCKET_NAME,
        Body: dataBuffer,
        Key: `${uuid()}-${fileName.replace('/', '')}`,
      })
      .promise();

    const newFile = {
      key: uploadResult.Key,
      url: uploadResult.Location,
      fileName,
    };

    return newFile;
  }

  async uploadPublicMultipleFile(files: FileData[]) {
    const newFiles = [];
    for (const file of files) {
      const newFile = await this.uploadPublicFile(file);
      if (newFile.url) {
        newFiles.push(newFile);
      }
    }

    return newFiles;
  }

  async deletePublicFile(urlFile: string) {
    const fileKey = urlFile?.split('/')?.reverse()?.[0];
    const s3 = new S3();
    try {
      // verify if key exists
      await s3.headObject({ Bucket: this.bucketName, Key: fileKey }).promise();
      s3.deleteObjects();
      await s3
        .deleteObject({
          Bucket: this.bucketName,
          Key: fileKey,
        })
        .promise();
      return { deleted: true };
    } catch (e) {
      return { deleted: false };
    }
  }

  async deletePublicMultipleFiles(urlFiles: string[]) {
    let deletedCount = 0;
    for (const urlFile of urlFiles) {
      const { deleted } = await this.deletePublicFile(urlFile);
      if (deleted) {
        deletedCount++;
      }
    }

    return { deleted: deletedCount };
  }
}
