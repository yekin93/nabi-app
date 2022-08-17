import multer, { Multer } from 'multer';
import path from 'path';
import {v4 as uuid} from 'uuid';

const imagesPath = path.join('C://', 'nabi-app', 'images');

const companyAvatarStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        const companyFolder = path.join(imagesPath, 'company');
        cb(null, companyFolder);
    },
    filename: function(req, file, cb){
        const fileName = uuid();
        cb(null, fileName);
    }
});

export const companyAvatarUpload: Multer = multer({storage: companyAvatarStorage});