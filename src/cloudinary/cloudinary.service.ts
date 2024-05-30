import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { IMAGE_FOLDER } from './constants/constants';
@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: IMAGE_FOLDER },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }

  async getUploadedFiles() {
    return new Promise((resolve, reject) => {
      v2.api.resources(
        {
          type: 'upload',
          prefix: IMAGE_FOLDER,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.resources);
        },
      );
    });
  }

  async getFileByPublicId(assetId: string) {
    return new Promise((resolve, reject) => {
      v2.api.resource(assetId, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }

  async uploadVideo(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: 'video' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }

  async uploadMultipleImages(
    files: Express.Multer.File[],
  ): Promise<UploadApiResponse[] | UploadApiErrorResponse> {
    return Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const upload = v2.uploader.upload_stream(
            { folder: IMAGE_FOLDER },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          );
          toStream(file.buffer).pipe(upload);
        });
      }),
    ) as Promise<UploadApiResponse[] | UploadApiErrorResponse>;
  }
}
