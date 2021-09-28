import mailer from 'nodemailer'
import jwt from 'jsonwebtoken'
export async function sendMail(email){
    const mailTransport =  mailer.createTransport({
        service : process.env.MAIL_SERVICE,
        host: 'smtp.gmail.com',
        auth:{
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    const url = `http://localhost:3000/auth/verification/${email}`
    const mailOpts = {
        from : process.env.EMAIL,
        to : email,
        subject : `Please verify this email : ${email}`,
        text: `click this link to verify your email : ${url}`
    }
    mailTransport.sendMail(mailOpts,(err,info)=>{
        if(err){
            console.log(err);
        } 
        else{
            console.log('Email sent: ' + info.response)
        }
    })
}
export async function mailForgotPassword(code,email){
    const mailTransport =  mailer.createTransport({
        service : process.env.MAIL_SERVICE,
        host: 'smtp.gmail.com',
        auth:{
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    const encode = jwt.sign(email,process.env.JWT_SECRET)
    const url = `http://localhost:3000/recovery/${encode}`
    const mailOpts = {
        from : process.env.EMAIL,
        to : email,
        subject : `Recover Password for email : ${email}`,
        text: `click this link to to recover your password : ${url} and dont forget your SECRET CODE : ${code} this code valid in 5mins` 
    }
    await mailTransport.sendMail(mailOpts,(err,info)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log('Email sent: ' + info.response)
        }
    })
}