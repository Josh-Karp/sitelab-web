import axios from "axios";

const organization_id = process.env.ZOHO_ORGANIZATION_ID;

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      return getContacts();
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getContacts() {
    const { headers } = req;

    try {
      const response = await axios.get(
        `https://books.zoho.com/api/v3/contacts?organization_id=${organization_id}`,
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );

      Object.keys(headers).forEach((key) => res.setHeader(key, headers[key]));

      res.status(200).json(response.data);
    } catch (error) {
      const { status } = error.response;
      res.status(status).send(error);
    }
  }
};
