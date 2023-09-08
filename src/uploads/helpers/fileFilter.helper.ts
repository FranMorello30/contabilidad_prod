/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {


  //console.log(req)
  //console.log({ file });
  if (!file) return callback(new Error('File is empty'), false);

  const fileExptension = file.mimetype.split('/')[1];
  const validExtensions = ['pdf','jpg', 'xlsx'];

  if (validExtensions.includes(fileExptension)) {
    return callback(null, true);
  }
  
  callback(null, true);
};
