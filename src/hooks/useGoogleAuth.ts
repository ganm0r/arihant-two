import { google } from "googleapis";

const useGoogleAuth = () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
      private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheet = google.sheets({
    auth,
    version: "v4",
  });

  return sheet;
};

export { useGoogleAuth };
