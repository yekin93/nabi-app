import nodemailer from 'nodemailer';
import log from '../utils/logger';

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth:{
        user: 'yekin_zulfikar@outlook.com',
        pass: '15121993@Ykn'
    }
});

export const sendMail = (recipient: string, mailOptions: any) => {
    transporter.sendMail(mailOptions, (err, data) => {
        if(err){
            throw err;
        }
        log.info("SUCCESSFULL Sent mail: " + JSON.stringify(data));
    });
}