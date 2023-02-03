import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Injectable, mixin, NestInterceptor, Type } from '@nestjs/common';
import { ConfigService } from '../api/config/config.service';
import { MulterField, MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

const MAX_FILE_SIZE = 8000000; // 8MB
interface LocalFilesInterceptorOptions extends FilesInterceptorOptions {
  fieldName: string;
}

interface LocalFileFieldsInterceptorOptions extends FilesInterceptorOptions {
  fieldNames: MulterField[];
}

interface FilesInterceptorOptions {
  path?: string;
  fileFilter?: MulterOptions['fileFilter'];
  limits?: MulterOptions['limits'];
}

//https://wanago.io/2021/11/08/api-nestjs-uploading-files-to-server/
export function LocalFilesInterceptor(options: LocalFilesInterceptorOptions): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;
    constructor(configService: ConfigService) {
      const filesDestination = configService.UPLOADED_FILES_DESTINATION;

      const destination = `${filesDestination}${options.path || ''}`;

      const multerOptions: MulterOptions = {
        storage: diskStorage({
          destination,
        }),
        fileFilter: options.fileFilter,
        limits: {
          ...options.limits,
          fileSize: 8000000,
        },
      };

      this.fileInterceptor = new (FilesInterceptor(options.fieldName, 10, multerOptions))();
    }

    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      return this.fileInterceptor.intercept(...args);
    }
  }
  return mixin(Interceptor);
}

export function LocalFileFieldsInterceptor(options: LocalFileFieldsInterceptorOptions): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;
    constructor(configService: ConfigService) {
      const filesDestination = configService.UPLOADED_FILES_DESTINATION;

      const destination = `${filesDestination}${options.path || ''}`;

      const multerOptions: MulterOptions = {
        storage: diskStorage({
          destination,
        }),
        fileFilter: options.fileFilter,
        limits: {
          ...options.limits,
          fileSize: 8000000,
        },
      };

      this.fileInterceptor = new (FileFieldsInterceptor(options.fieldNames, multerOptions))();
    }

    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      return this.fileInterceptor.intercept(...args);
    }
  }
  return mixin(Interceptor);
}
