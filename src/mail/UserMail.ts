import { sendMail } from "../middleware/sendMail";
import { User } from "../models/User";
import path from "path";
import ejs from 'ejs';

export class UserMail {

    private static instance: UserMail;

    constructor(){

    }

    static getInstance(): UserMail {
        if(!this.instance) {
            this.instance = new UserMail();
        }

        return this.instance;
    }


    async userConfirmation(recipient: User, link: string): Promise<void>{
       let template = await ejs.renderFile(path.join(__dirname, '../../', 'mailcontents', 'user-confirmation.ejs'), {recipient, link});
       const options = {
           from: 'yekin_zulfikar@outlook.com',
           to: recipient.getEmail,
           subject: 'Confirmation',
           html: template
       }
        sendMail(recipient.getEmail, options);
    }

}