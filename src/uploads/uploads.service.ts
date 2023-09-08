import { existsSync, unlinkSync, unlink } from 'fs';
import * as path from 'path';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class UploadsService {
  getStaticProductImages(imageName: string, carpeta: string) {
    //const path = join(__dirname, '../static/', imageName);
    const imagePath = path.resolve(
      process.cwd(),
      `static/${carpeta}/${imageName}`,
    );

    if (!existsSync(imagePath)) {
      throw new BadRequestException(` archivo no encontrado ${imageName}`);
    }
    return imagePath;
  }

  async deleteFile(file: string, carpeta: string) {
    const imagePath = path.resolve(process.cwd(), `static/${carpeta}/${file}`);

    if (!existsSync(imagePath)) {
      throw new BadRequestException(` No encontrado ${file}`);
    }

    unlink(imagePath, (err) => {
      if (err) throw new BadRequestException(` No found 22 ${file}`);
      // if no error, file has been deleted successfully
      console.log('File deleted!');
      return true;
    });

    return true;
  }
}
