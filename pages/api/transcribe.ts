// import { Configuration, OpenAIApi } from "openai";
import { IncomingForm } from "formidable";
const fs = require("fs");
import FormData from "form-data";
import fetch from "node-fetch";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: any, res: any) {
  // Here, we create a temporary file to store the audio file using Vercel's tmp directory
  // As we compressed the file and are limiting recordings to 2.5 minutes, we won't run into trouble with storage capacity
  const fData = await new Promise<{ fields: any; files: any }>(
    (resolve, reject) => {
      const form = new IncomingForm({
        multiples: false,
        uploadDir: "/tmp",
        keepExtensions: true,
      });
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    },
  );

  const videoFile = fData.files.file;
  const videoFilePath = videoFile?.filepath;
  console.log(videoFilePath);

  const file = fs.createReadStream(videoFilePath); // Replace "path/to/your/file" with the actual path to your file

  const formData = new FormData();
  formData.append("audio", file);

  const url = "https://api.worqhat.com/api/ai/speech-text";
  const options = {
    method: "POST",
    headers: {
      "x-api-key": "U2FsdGVkX1+Sk6YyCE/qSsxu++vzqt0+G8WII+DFpcbNS8LbTTTIibdN/4Jg5A2s",
      "x-org-key": "U2FsdGVkX1/tXNgNZtTaRxvfCBr63WZddF09RiJ3YF4e5anXW1YHtscWb4LFKhhli+2VkdE8rHHacSlh086kQw=="
    },
    body: formData,
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json() as { content: string; };
    console.log(data.content);
    res.status(200).json({ transcript: data.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error });
  }
}
