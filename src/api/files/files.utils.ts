import { BadRequestException } from '@nestjs/common';
import { FileData } from './interface';

export const fileImageConfig = {
  filter: (_, file, callback) => {
    if (!file.mimetype.includes('image')) {
      return callback(new BadRequestException('Provide a valid image'), false);
    }
    callback(null, true);
  },

  limits: {
    fileSize: 8000000,
  },
};

export const getImageFileData = ({ originalname, buffer }: Express.Multer.File): FileData => ({
  fileName: originalname,
  dataBuffer: buffer,
});
