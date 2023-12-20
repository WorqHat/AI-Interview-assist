import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { webcamRef, videoEnded } = req.body;

    if (!webcamRef || !videoEnded) {
      return res.status(400).json({ error: 'Invalid request parameters' });
    }

    // Get a reference to the webcam video element
    const videoElement = webcamRef.video;

    // Check if the video element is loaded and playing
    if (videoElement && !videoElement.paused) {
      // Delay the capture by 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Capture a frame from the current video time
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext('2d');

      // Check if ctx is not null before using it
      if (ctx) {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        // Generate a unique filename for the captured frame
        const fileName = `random_frame_${Date.now()}.png`;
        const filePath = path.join(process.cwd(), 'public', fileName);

        // Convert the canvas content to a data URL and save it as an image file
        const dataUrl = canvas.toDataURL('image/png');
        const buffer = Buffer.from(dataUrl.split(',')[1], 'base64');
        fs.writeFileSync(filePath, buffer);

        console.log('Random frame captured and saved:', filePath);

        // Send a response indicating success
        res.status(200).json({ success: true, imagePath: `/public/${fileName}` });
      } else {
        return res.status(500).json({ error: 'Canvas context is null' });
      }
    } else {
      return res.status(400).json({ error: 'Webcam not available or video not playing' });
    }
  } catch (error) {
    console.error('Error capturing random frame:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
