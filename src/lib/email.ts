
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_KEY);

export const sendEmail = async(email: string, text: string, subject: string, url: string) => {
    try {
       const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4F46E5;">Verify Your Email</h2>
        <p>Hi ${email},</p>
        <p>${text}</p>
        <p style="text-align: center; margin: 20px 0;">
          <a href="${url}" style="
            display: inline-block;
            padding: 12px 25px;
            background-color: #4F46E5;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
          ">Verify Email</a>
        </p>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p><a href="${url}">${url}</a></p>
        <hr />
        <p style="font-size: 12px; color: #888;">Acme Team</p>
      </div>
    `;  
    const {data} = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: email,
        subject: subject,
        text: text,
        html: htmlTemplate
    })
    console.log("Email sent", data);
    return data
    } catch (error) {
         console.error('Error sending email:', error);
    throw error;
    }
}