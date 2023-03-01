import { Client } from 'postmark';
const postmarkClient = new Client(process.env.POSTMARK_API_TOKEN);

export default async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await postmarkClient.sendEmail({
      From: email,
      To: process.env.SMTP_FROM,
      Subject: 'Hello from Postmark',
      HtmlBody: message,
      TextBody: message,
      MessageStream: 'outbound',
    });

    console.log('Message Sent');
  } catch (err) {
    console.log(err);
  }

  res.status(200).json(req.body);
};
