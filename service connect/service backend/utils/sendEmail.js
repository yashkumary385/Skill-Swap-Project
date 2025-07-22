import nodemailer from "nodemailer"

export const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,      // your email
      pass: process.env.EMAIL_PASS       // your app password (not your Gmail password)
    }
  });
 
    const mailOptions = {
    from: `"SkillSwap" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text
  };
const info=  await transporter.sendMail(mailOptions);
console.log(info);


//    if (info.accepted.length > 0) {
//       return res.status(200).json({ message: 'Email sent successfully', info });
//     } else {
//       return res.status(500).json({ message: 'Email not accepted by server', info });
//     }

}


// {
//   accepted: [ 'ayush@gmail.com' ],
//   rejected: [],
//   ehlo: [
//     'SIZE 36700160',
//     '8BITMIME',
//     'AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH',
//     'ENHANCEDSTATUSCODES',
//     'PIPELINING',
//     'CHUNKING',
//     'SMTPUTF8'
//   ],
//   envelopeTime: 1117,
//   messageTime: 838,
//   messageSize: 408,
//   response: '250 2.0.0 OK  1751745372 d9443c01a7336-23c8459a03dsm51136695ad.216 - gsmtp',
//   envelope: { from: 'yashkumary385@gmail.com', to: [ 'ayush@gmail.com' ] },
//   messageId: '<dfed44d1-cf1f-e931-2f00-70823b467709@gmail.com>'
// }
