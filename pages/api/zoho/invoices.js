import axios from "axios";

const organization_id = process.env.ZOHO_ORGANIZATION_ID;

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      return getInvoices();
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getInvoices() {
    const { headers } = req;
    const { id } = req.query;

    try {
      const response = await axios.get(
        `https://books.zoho.com/api/v3/invoices?customer_id=${id}&organization_id=${organization_id}`,
        {
          headers: {
            Authorization: headers.authorization,
          },
        }
      );

      res.status(200).json(response.data);
    } catch (error) {
      res.send(error);
    }
  }
};
