import { createTransport } from "nodemailer";

export const emailservice = async (email: string, code: number) => {
  try {
    const transporter = createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_FOR_EMAIL_SERVICE,
        pass: process.env.PASSWORD_FOR_EMAIL_SERVICE,
      },
    });
    const info = await transporter.sendMail({
      from: ` Deepansh <${process.env.EMAIL_FOR_EMAIL_SERVICE}>`,
      to: email,
      subject: "Your Verification Code for Signup",
      text: "",
      html: ` <p>
      Thank you for signing ! To complete your registration, please use the following verification code: ${code}
        </p>`,
    });
    console.log(info);
    if (!info) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
