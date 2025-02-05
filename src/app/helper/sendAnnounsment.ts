import { Request, Response } from 'express';
import config from '../config';
import NormalUser from '../modules/normalUser/normalUser.model';
import sendEmail from '../utilities/sendEmail';

const sendAnnounsment = async (req: Request, res: Response) => {
  const { titile, message } = req.body;
  const normalUserSubscriptionEmails = await NormalUser.find({});
  const emails = normalUserSubscriptionEmails.map((user) => user.email);
  if (emails.length === 0) {
    console.log('No users found with subscription emails.');
    return;
  }
  const emailHtml = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
    <h2 style="color: #2C3E50;">📢 New Announcement: ${titile}</h2>
    <p>Hello,</p>
    <p>We have an exciting announcement for you from <strong>Find Your Why</strong>.</p>
    
    <p><strong>Title:</strong> ${titile}</p>
    
    <p><strong>Message:</strong></p>
    <blockquote style="border-left: 4px solid #FF6600; padding-left: 10px; color: #666; font-style: italic;">
      "${message}"
    </blockquote>
    
    <p>We encourage you to check it out and stay updated with what's new. You can click the button below to explore further:</p>
    
    <a href="https://survey-zeta-tawny.vercel.app/client-why" target="_blank" style="display: inline-block; background-color: #FF6600; color: #fff; text-decoration: none; padding: 12px 20px; border-radius: 5px; font-size: 16px;">Read the Announcement</a>
    
    <p>If you don't want to receive these updates in the future, you can <a href="#" style="color: #FF6600;">unsubscribe</a> at any time.</p>
    
    <p>Thank you for being part of our community.<br><strong>Find Your Why Team</strong></p>
    
    <footer style="text-align: center; font-size: 12px; color: #888; margin-top: 20px;">
      <p>Find Your Why | <a href="https://yourwebsite.com" target="_blank" style="color: #FF6600;">Visit Our Website</a></p>
      <p>123 Your Street, City, Country | <a href="mailto:info@findyourwhy.com" style="color: #FF6600;">Contact Us</a></p>
    </footer>
  </div>
`;

  // Sending ONE email to ALL recipients using BCC
  await sendEmail({
    email: config.smtp.smtp_mail as string,
    subject: `📢 New Announsment`,
    html: emailHtml,
    bcc: emails.join(','),
  });

  res
    .status(200)
    .json({ success: true, message: 'Annousment sent successfully' });
};

export default sendAnnounsment;
