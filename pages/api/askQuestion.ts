// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/queryApi";
import admin from "firebase-admin";
import { adminDb } from "../../firebaseAdmin";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { prompt, chatId, model, session } = req.body;

    if (!prompt) {
      res.status(400).json({ answer: "Please enter a prompt." });
    }

    if (!chatId) {
      res.status(400).json({ answer: "Please enter a valid chat ID." });
    }

    // ChatGPT Query
    const response = await query(prompt, chatId, model);

    const message: Message = {
      text:
        response?.toString() ||
        "ChatGPT was unable to find an answer for that.",
      createdAt: admin.firestore.Timestamp.now(),
      user: {
        _id: "ChatGPT",
        name: "ChatGPT",
        avatar:
          "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
      },
    };

    await adminDb
      .collection("users")
      .doc(session?.user?.email!)
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .add(message);

    res.status(200).json({ answer: message.text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ answer: "Something went wrong." });
  }
}
