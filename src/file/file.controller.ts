import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('file')
export class FileController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImageToCloudinary(@UploadedFile() file: Express.Multer.File) {
    return await this.cloudinaryService.uploadImage(file).catch((error) => {
      console.log(error);
      throw new BadRequestException(
        error.message || 'Error uploading image to Cloudinary',
      );
    });
  }
}
