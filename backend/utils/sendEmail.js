const nodeMailer= require("nodemailer");


const sendEmail= async(options)=>{

    
    const transporter= nodeMailer.createTransport({

        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,//465
        service:process.env.SMPT_SERVICE,
        auth:{
         
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
          
        },
        tls:{
            rejectUnauthorized: false,
        },
    });
    const mailOptions={
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }
   
    await transporter.sendMail(mailOptions);
}

module.exports= sendEmail;


// "use strict";
// const nodemailer = require("nodemailer");

// // async..await is not allowed in global scope, must use a wrapper
// const sendEmail=async(options)=>{
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: 'joyce.rowe@ethereal.email',
//         pass: '3k2yFqSA1rZ7wFkhhj'
//     },
//     tls:{
//         rejectUnauthorized: false,
//     }
//   });

 

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Gourob 👻" <debnathgourob98@gmail.com>', // sender address
//     to: options.email, // list of receivers
//     subject: options.subject, // Subject line
//     text: options.message, // plain text body
//     // html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

 //module.exports= sendEmail;




