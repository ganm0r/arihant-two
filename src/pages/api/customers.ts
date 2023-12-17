// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import { google } from "googleapis";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    console.log(req.body);

    // const auth = new google.auth.GoogleAuth({
    //   credentials: {
    //     client_email: process.env.CLIENT_EMAIL,
    //     client_id: process.env.CLIENT_ID,
    //     private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
    //   },
    //   scopes: [
    //     'https://www.googleapis.com/auth/spreadsheets',
    //   ],
    // });

    // const sheets = google.sheets({
    //   auth,
    //   version: 'v4',
    // });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const sheet = useGoogleAuth();

    try {
      console.log([Object.values(req.body)]);

      const { index, count, ...sheetOne }: any = req.body;

      const sheetOneRes = await sheet.spreadsheets.values.append({
        spreadsheetId: process.env.SHEET_ID,
        range: "Sheet1!A2:F",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [Object.values(sheetOne)],
        },
      });

      const sheetTwoRes = await sheet.spreadsheets.values.update({
        spreadsheetId: process.env.SHEET_ID,
        range: `Sheet2!C${index}`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [[count]],
        },
      });

      console.log(sheetOneRes.data, sheetTwoRes.data);

      res.status(201).json({ name: "Order created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ name: "Error creating order" });
    }
  } else {
    res.status(200).json({ name: "John Doe" });
  }
}
