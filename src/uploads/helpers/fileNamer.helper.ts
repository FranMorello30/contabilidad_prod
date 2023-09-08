/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import { v4 as uuid} from 'uuid';
export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  //console.log({ file });
  if (!file) return callback(new Error('File is empty'), false);

  const fileExptension = file.mimetype.split('/')[1];
  
  const fileName = `${uuid()}.${fileExptension}`;
 

  callback(null, fileName);
};

export const fileNameExcel = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  //console.log({ file });
  if (!file) return callback(new Error('File is empty'), false);

  const fileExptension = file.mimetype.split('/')[1];
  
  const fileName = `${uuid()}.xlsx`;
 

  callback(null, fileName);
};