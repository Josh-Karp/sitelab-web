import { adminAuth } from "src/utils/firebase/firebaseAdmin";

const handler = async (req, res) => {
  switch (req.method) {
    case "PUT":
      return updateUserClaims();
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function updateUserClaims() {
    const { uid } = req.query;
    const { role = false, company = false } = req.body;

    try {
      const userRecord = await adminAuth.getUser(uid);

      let claims = {
        role: role,
        company: company,
      };

      if (typeof userRecord.customClaims !== "undefined") {
        claims = {
          role: role ? role : userRecord.customClaims["role"],
          company: company ? company : userRecord.customClaims["company"],
        };
      }

      await adminAuth.setCustomUserClaims(uid, claims);

      res.end(
        JSON.stringify({
          status: "success",
        })
      );
    } catch (error) {
      res.send(error);
    }
  }
};

export default handler;
