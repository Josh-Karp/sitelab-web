import sendgrid from "@sendgrid/mail";
import { CONTACT_TEMPLATE } from "../../templates/mail_templates";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default handler = async (req, res) => {
  const body = JSON.parse(req.body);

  const { subject, message } = CONTACT_TEMPLATE(body);

  const data = {
    to: process.env.EMAIL_TO,
    from: process.env.EMAIL_FROM,
    subject: subject,
    text: message,
    html: message.replace(/\r\n/g, "<br>"),
  };

  sendgrid.send(data);

  return res.status(500).json({ status: true });
};
