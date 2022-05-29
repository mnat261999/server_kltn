import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('api/file')
export class FileController {
    constructor(
        private readonly fileService: FileService,
    ) { }

    @Post('upload/image')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<any>{
        return await this.fileService.uploadImage(file)
    }
}
