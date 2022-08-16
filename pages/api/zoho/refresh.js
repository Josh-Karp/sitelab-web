import axios from "axios";

const redirect_uri = process.env.ZOHO_REDIRECT_URI;
const client_id = process.env.ZOHO_CLIENT_ID;
const client_secret = process.env.ZOHO_CLIENT_SECRET;
const refresh_token = process.env.ZOHO_REFRESH_TOKEN;

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      return getAccessToken();
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getAccessToken() {
    try {
      const { data, headers } = await axios.post(
        `https://accounts.zoho.com/oauth/v2/token?refresh_token=${refresh_token}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&grant_type=refresh_token`
      );

      res.status(200).json(data);
    } catch (error) {
      const { status } = error.response;
      res.status(status).send(error);
    }
  }
};
