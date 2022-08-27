import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth:{
        user: 'yekin_zulfikar@outlook.com',
        pass: '15121993@Ykn'
    }
});


const mailOptions = {
    from: 'yekin_zulfikar@outlook.com',
    to: 'gsyekings@gmail.com',
    subject: 'Test',
    html:'<h1>Hello world</h1>'
}

export const sendMail = (recipient: string, mailOptions: any) => {
    transporter.sendMail(mailOptions, (err, data) => {
        if(err){
            throw err;
        }
        console.log(data);
    });
}