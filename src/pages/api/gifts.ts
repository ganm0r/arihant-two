import type { NextApiRequest, NextApiResponse } from "next";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";

type Data = {
  name: string;
  gifts?: Object;
  total?: Object;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const sheet = useGoogleAuth();

    try {
      const gifts = await sheet.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range: "Sheet2!A2:D14",
      });

      console.log(gifts.data);

      const total = await sheet.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range: "Sheet2!B16",
      });

      console.log(total.data);
      
      res.status(201).json({name: "Gifts fetched", gifts: gifts.data, total: total.data});
    } catch (error) {
      console.log(error);
      res.status(500).json({ name: "Error fetching gifts" });
    }
  } else {
    res.status(200).json({ name: "John Doe" });
  }
}
