import { adminAuth } from "src/utils/firebaseAdmin";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      return getUser();
    case "POST":
      return createUser();
    case "DELETE":
      return deleteUser();
    case "PUT":
      return updateUser();
    default:
      res.setHeader("Allow", ["POST, PUT, GET, DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getUser() {
    const { uid } = req.query;

    try {
      const userRecord = await adminAuth.getUser(uid);

      res.status(200).json(userRecord);
    } catch (error) {
      res.send(error);
    }
  }

  async function createUser() {
    const { customClaims } = req.body;

    try {
      const userRecord = await adminAuth.createUser(req.body);

      if (customClaims) {
        await adminAuth.setCustomUserClaims(userRecord.uid, customClaims);
      }

      res.status(200).json(userRecord.uid);
    } catch (error) {
      res.send(error);
    }
  }

  async function updateUser() {
    const { uid } = req.query;

    try {
      await adminAuth.updateUser(uid, req.body);

      res.end(
        JSON.stringify({
          status: "success",
        })
      );
    } catch (error) {
      res.send(error);
    }
  }

  async function deleteUser() {
    const { uid } = req.query;

    try {
      const success = await adminAuth.deleteUser(uid);

      res.status(200).json(response.data);
    } catch (error) {
      res.send(error);
    }
  }
};
