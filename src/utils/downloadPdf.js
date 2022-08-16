import axios from "./zoho/axiosZoho";
import { saveAs } from "file-saver";

export const downloadPdf = async (token, id) => {
  try {
    const response = await axios.get(`api/zoho/invoice?id=${id}&type=html`, {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
      },
      responseType: "blob",
    });
    let file = new Blob([response.data], {
      type: "application/pdf;charset=utf-8",
    });
    saveAs(file);
  } catch (error) {
    return Promise.reject({ error: error.message });
  }
};
