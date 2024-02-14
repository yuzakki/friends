import Mail from 'nodemailer/lib/mailer';
import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
import { htmlToText } from 'html-to-text';
import { RPEmailHTML } from '@/lib/emails/reset-password-template';

interface Props {
  email: string;
  name: string;
  resetURL: string;
}

export async function sendPasswordResetEmail({ email, name, resetURL }: Props) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const emailHtml = render(<RPEmailHTML name={name} resetURL={resetURL} />);

  const options: Mail.Options = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Password Reset Notification',
    html: emailHtml,
    text: htmlToText(emailHtml),
  };

  await transporter.sendMail(options);
}
