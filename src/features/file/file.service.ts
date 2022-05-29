import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { Express } from 'express';
import { config } from 'aws-sdk';

config.update({
    accessKeyId: 'AKIARXDQ32MS62O7SJY3',
    secretAccessKey: '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',
    region: 'us-east-1',
});

@Injectable()
export class FileService {
    constructor(
        private readonly configService: ConfigService
    ) { }

    async uploadImage(file: Express.Multer.File): Promise<any> {
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') throw new HttpException('File format is incorrect.', HttpStatus.BAD_REQUEST)
        const s3 = new S3();
        const uploadResult = await s3.upload({
            Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
            Body: file.buffer,
            Key: `${uuid()}-${file.originalname}`,
            ACL:'public-read-write'
        })
            .promise();

        const newFile = {
            key: uploadResult.Key,
            url: uploadResult.Location
        }

        return newFile;
    }
}
