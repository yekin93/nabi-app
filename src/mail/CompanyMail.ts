import ejs from "ejs";
import path from "path/posix";
import { sendMail } from "../middleware/sendMail";
import { CompanyApplication } from "../models/CompanyApplication";
import log from '../utils/logger';

export class CompanyMail {
    public static instance: CompanyMail;
    
    constructor(){

    }

    static getInstance(): CompanyMail {
        if(!this.instance){
            this.instance = new CompanyMail();
        }
        return this.instance;
    }

    async companyApplicationMail(application: CompanyApplication): Promise<void> {
        log.info(path.join(__dirname, '../../', 'mailcontents'));
        const template = await ejs.renderFile(path.join(__dirname, '../', 'mailcontents', 'company-application.ejs'), {application});
        const options = {
            from: 'yekin_zulfikar@outlook.com',
            to: application.getEmail,
            subject: 'Company Application',
            html: template
        }
        sendMail(application.getEmail, options);
    }
}