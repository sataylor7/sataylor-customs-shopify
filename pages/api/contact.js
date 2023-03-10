import { Client } from 'postmark';
const postmarkClient = new Client(process.env.POSTMARK_API_TOKEN);

export default async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await postmarkClient.sendEmail({
      From: process.env.SMTP_CONTACT_FROM,
      To: process.env.SMTP_FROM,
      Subject: 'Contact Us Form',
      HtmlBody: `<strong>Name:</strong> ${name} <br/> <strong>Email:</strong> ${email} <br/> <strong>Message:</strong> ${message}`,
      TextBody: `Name:${name} \n Email:${email} \n Message:${message}`,
      MessageStream: 'outbound',
    });

    console.log('Message Sent');
  } catch (err) {
    console.log(err);
  }

  res.status(200).json(req.body);
};
