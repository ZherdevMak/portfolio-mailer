const express = require ('express');
const nodemailer = require("nodemailer");
const app = express();

let transporter = nodemailer.createTransport({
    // host: "smtp.yandex.ru",
    // port: "465",
    // secure: true,
    service:'gmail',
    auth: {
        user:'zherdev.max@gmail.com', // generated ethereal user
        pass: 'mjjohccpbtytwbxv', // generated ethereal password
    },
    tls:{rejectUnauthorized:false}
})



app.get ('/sendmail', async function (req,res) {
    let info = await transporter.sendMail({
        from: 'me', // sender address
        to: "ppmaxjer@yandex.ru", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });
})

app.listen(3000,function () {
    console.log('Listen for port 3000!node')
})



