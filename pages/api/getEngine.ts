import type { NextApiRequest, NextApiResponse } from "next";
import openai from "../../lib/chatgpt";

type Option = {
  value: string;
  label: string;
};

type Data = {
  modelOptions: Option[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const models = await openai.listModels().then((res) => res.data.data);

    const modelOptions: Option[] = models.map((model) => {
      return {
        value: model.id,
        label: model.id,
      };
    });

    res.status(200).json({ modelOptions });
  } catch (error) {
    console.log(error);
    res.status(500).json({ modelOptions: [] });
  }
}
