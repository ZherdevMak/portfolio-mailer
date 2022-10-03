const express = require('express');
const nodemailer = require("nodemailer");
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')


app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
let smtp_login = process.env.SMTP_LOGIN
let smtp_password = process.env.SMTP_PASSWORD
let transporter = nodemailer.createTransport({
    // host: "smtp.yandex.ru",
    // port: "465",
    // secure: true,
    service: 'gmail', auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password, // generated ethereal password
    }, tls: {rejectUnauthorized: false}

})


app.post('/sendmail', function (req, res) {
    let {name, email, subject, message} = req.body
    transporter.sendMail({
        from: 'me', // sender address
        to: "zherdev.max@gmail.com", // list of receivers
        subject: "Portfolio message!", // Subject line
        text: "Portfolio mail", // plain text body
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Demystifying Email Design</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin: 0; padding: 0;">
<b>Сообщение от вашего Portfolio</b>
 <table border="1" cellpadding="0" cellspacing="0" width="100%">
  <tr>
   <td>
   <table align="center" border="1" cellpadding="0" cellspacing="0" width="600">
 <tr>
  <td align="center" bgcolor="#70bbd9" style="padding: 40px 0 30px 0;">
 <img src='cid:unique@kreata.ee' alt="Creating Email Magic" width="200" height="230" style="display: block;" />
</td
 </tr>
 <tr>
  <td bgcolor="#ffffff">
 <table border="1" cellpadding="0" cellspacing="0" width="100%">
 <tr>
  <td>
   <div>You recive mail from: ${name}</div>
  </td>
 </tr>
 <tr>
  <td style="padding: 20px 0 30px 0;">
   <div>Email: ${email}</div>
  </td>
 </tr>
 <tr>
  <td style="padding: 20px 0 30px 0;">
  <div>${subject}</div>
  </td>
 </tr>
 <tr>
  <td>
   <div>Text: ${message}</div>
  </td>
 </tr>
</table>
</td>
  </td>
 </tr>
 <tr>
  <td bgcolor="#ee4c50" bgcolor="#ee4c50" style="padding: 50px 50px 50px 50px;">
  </td>
 </tr>
</table>
   </td>
  </tr>
 </table>
</body>
</html>
`, attachments: [{
            filename: 'letterMarker.png',
            path: './images/letterMarker.png',
            cid: 'unique@kreata.ee' //same cid value as in the html img src
        }]
    }, function (error, info) {
        if (error) {
            console.log(error);
            res.json({yo: 'error'});
            res.sendStatus(500);
        } else {
            console.log('Message sent: ' + info.response);
            res.sendStatus(200);
        }
        return res.end();
    })
})
let port = process.env.PORT || 3001
app.listen(port, function () {
    console.log('Listen for port 3001!node')})




