import multer, { Multer } from 'multer';
import path from 'path';
import {v4 as uuid} from 'uuid';
import { getFileExt } from '../utils/fileUtil';

const imagesPath = path.join('C://', 'nabi-app', 'images');

const companyAvatarStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        const companyFolder = path.join(imagesPath, 'company');
        console.log(file);
        cb(null, companyFolder);
    },
    filename: function(req, file, cb){
        const fileName = `${uuid()}.${getFileExt(file.originalname)}`;
        cb(null, fileName);
    }
});

export const companyAvatarUpload: Multer = multer({storage: companyAvatarStorage});