import * as fs from 'fs';
import { Response, Request } from 'express';
import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  Headers,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { fileFilter, fileNamer } from './helpers/';
import { ConfigService } from '@nestjs/config';
import { UploadsService } from './uploads.service';
import { Auth } from 'src/modules/auth/decorators';
import { Helpers } from 'src/common/helpers/helpers';

export class Helper {
  // static common: Helpers;
  // constructor() {
  //   //common = new commonHelper();
  // }

  static customFileName(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExptension = file.mimetype.split('/')[1];

    const originalName = reemplazarCaracter(
      ' ',
      '-',
      file.originalname.split('.')[0],
    );
    cb(null, originalName + '-' + uniqueSuffix + '.' + fileExptension);
  }

  static destinationPath(req, file, cb) {
    console.log(req.headers.base);
    const ruta = `static/${req.headers.base}`;
    if (!fs.existsSync(ruta)) {
      fs.mkdirSync(ruta);
    }

    cb(null, ruta);
  }
}

@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly configService: ConfigService,
    private readonly uploadsService: UploadsService,
    private readonly commonHelper: Helpers,
  ) {}

  @Get('/:path/:archivo')
  findFile(
    @Res() res: Response,
    @Param('archivo') imageName: string,
    @Param('path') subCarpeta: string,
  ) {
    const path = this.uploadsService.getStaticProductImages(
      imageName,
      subCarpeta,
    );
    res.sendFile(path);
  }

  @Delete('/:path/:archivo')
  deleteFile(
    @Res() res: Response,
    @Param('archivo') imageName: string,
    @Param('path') subCarpeta: string,
  ) {
    this.uploadsService.deleteFile(imageName, subCarpeta);

    res.json({ msg: 'borrado' });
  }

  @Post('')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: Helper.destinationPath,
        filename: Helper.customFileName,
      }),
    }),
    // FileInterceptor('file', {
    //   fileFilter,
    //   storage: diskStorage({
    //     destination: `static`,
    //     filename: fileNamer,
    //   }),
    // }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Headers() headers) {
    //console.log(file);
    //console.log(headers);
    if (!file) {
      throw new BadRequestException('Make sure the file is an pdf.');
    }

    return {
      nombre: file.filename,
      nombreOriginal: file.originalname,
      size: file.size,
    };
  }
}

function reemplazarCaracter(search: string, replace: string, sujeto: any) {
  const result = [];
  const _string = sujeto.toLowerCase();
  const _search = search.toLowerCase();
  let start = 0;
  let match;
  const length = _search.length;
  while ((match = _string.indexOf(_search, start)) >= 0) {
    result.push(sujeto.slice(start, match));
    start = match + length;
  }
  result.push(sujeto.slice(start));

  return result.join(replace);
}
/*
@UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Headers() headers) {
    console.log(file);
    console.log(headers);
    if (!file) {
      throw new BadRequestException('Make sure the file is an pdf.');
    }

    const fileExptension = file.mimetype.split('/')[1];
    const fileName = `${file.originalname}.${fileExptension}`;

    diskStorage({
      destination: 'static',
      filename: (req, file, callback) => {
        callback(null, fileName);
      },
    });

    return {
      nombre: file.filename,
      nombreOriginal: file.originalname,
      size: file.size,
    };
  } */
