import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('file')
export class FileController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload/image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImageToCloudinary(@UploadedFile() file: Express.Multer.File) {
    return await this.cloudinaryService.uploadImage(file).catch((error) => {
      console.log(error);
      throw new BadRequestException(
        error.message || 'Error uploading image to Cloudinary',
      );
    });
  }

  // @Post('upload/images')
  // @UseInterceptors(FileInterceptor('images'))
  // async uploadMultipleImagesToCloudinary(
  //   @UploadedFiles() files: Express.Multer.File[],
  // ) {
  //   return await this.cloudinaryService
  //     .uploadMultipleImages(files)
  //     .catch((error) => {
  //       console.log(error);
  //       throw new BadRequestException(
  //         error.message || 'Error uploading image to Cloudinary',
  //       );
  //     });
  // }

  @Get('find')
  async getFileByPublicId(@Body() { public_id }: { public_id: string }) {
    console.log(public_id);
    return await this.cloudinaryService
      .getFileByPublicId(public_id)
      .catch((error) => {
        console.log(error);
        throw new BadRequestException(
          error.message || 'Error fetching file from Cloudinary',
        );
      });
  }

  @Get('all')
  async getFiles() {
    return await this.cloudinaryService.getUploadedFiles().catch((error) => {
      console.log(error);
      throw new BadRequestException(
        error.message || 'Error fetching files from Cloudinary',
      );
    });
  }

  @Post('upload/video')
  @UseInterceptors(FileInterceptor('video'))
  async uploadVideoToCloudinary(@UploadedFile() file: Express.Multer.File) {
    return await this.cloudinaryService.uploadVideo(file).catch((error) => {
      console.log(error);
      throw new BadRequestException(
        error.message || 'Error uploading video to Cloudinary',
      );
    });
  }
}
