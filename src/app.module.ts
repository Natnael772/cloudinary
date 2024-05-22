import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    FileModule,
    CloudinaryModule,
    ConfigModule.forRoot({
      // isGlobal: true,
      envFilePath: '.env',
    }),
    // MulterModule.register({
    //   dest: './uploads',
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
