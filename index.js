const express = require ('express');
const nodemailer = require("nodemailer");
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// async function main() {
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



app.post ('/sendmail', function (req,res) {
    let {name, email, subject, message} = req.body
    let info = transporter.sendMail({
        from: 'me', // sender address
        to: "ppmaxjer@yandex.ru", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>Сообщение от вашего Portfolio</b>
         <div>${name}</div>
         <div>${email}</div>
         <div>${subject}</div>
         <div>${message}</div>`
    })
    .then(res => {
        console.log(info)
    })
})

app.listen(3001,function () {
    console.log('Listen for port 3001!node')
    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
})
// }
// main().catch(console.error);



