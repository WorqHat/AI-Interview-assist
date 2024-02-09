/* The code is importing the `IncomingForm` class from the "formidable" package and assigning it to the
variable `IncomingForm`. It is also importing the `fs` module from the Node.js standard library
using the `require` function. */
import { IncomingForm } from "formidable";
const fs = require("fs");
/* The code is importing the `FormData` class from the "form-data" package and assigning it to the
variable `FormData`. It is also importing the `fetch` function from the "node-fetch" package. These
imports are used to handle form data and make HTTP requests respectively. */
import FormData from "form-data";
import fetch from 'node-fetch';
/* The code `import dotenv from "dotenv";` is importing the `dotenv` package, which is used to load
environment variables from a `.env` file into the Node.js process. */
import dotenv from "dotenv";
dotenv.config();

/* The `export const config` statement is exporting a configuration object that is used by the Next.js
framework. In this case, it is configuring the API route to disable the built-in body parsing
middleware (`bodyParser: false`). This means that the request body will not be automatically parsed
by Next.js, and you will need to handle the parsing manually in your code. */
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: any, res: any) {
  // Here, we create a temporary file to store the audio file using Vercel's tmp directory
  // As we compressed the file and are limiting recordings to 2.5 minutes, we won't run into trouble with storage capacity
  console.log("Request received");

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

  /* The code block you provided is responsible for creating a `FormData` object and configuring the
options for making a POST request to the "https://api.worqhat.com/api/ai/speech-text" endpoint. */
  const videoFile = fData.files.file;
  const videoFilePath = videoFile?.filepath;
  console.log(videoFilePath);

  const file = fs.createReadStream(videoFilePath); // Replace "path/to/your/file" with the actual path to your file

  const formData = new FormData();
  formData.append("audio", file);

  /* The code block you provided is configuring the options for making a POST request to the
"https://api.worqhat.com/api/ai/speech-text" endpoint.
Over here we have hardcoded the user's API key. This is not a good practice as it exposes the API key. We generally suggest users to Store API keys in environment variables and load them into your code using the `dotenv` package.
*/
  const url = "https://api.worqhat.com/api/ai/speech-text";
  const options = {
    method: "POST",
    headers: {
      Authorization: "Bearer sk-02e44d2ccb164c738a6c4a65dbf75e89",
    },
    body: formData,
  };

  /* The code block you provided is using a try-catch statement to handle any errors that may occur
during the execution of the code. */
  try {
    const response = await fetch(url, options);
    const data = (await response.json()) as { data: { text: string } };
    console.log("data", data);
    const transcript = data.data.text;

    console.log(transcript);
    res.status(200).json({ transcript: transcript });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error });
  }
}
