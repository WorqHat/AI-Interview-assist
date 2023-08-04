/* eslint-disable @next/next/no-img-element */
/* The code is importing the `ImageResponse` class from the `next/server` module. It also defines three
constants: `runtime`, `alt`, and `contentType`. */
import { ImageResponse } from "next/server";

export const runtime = "edge";
export const alt = "Precedent - Building blocks for your Next.js project";
export const contentType = "image/png";

export default async function OG() {
  // Font
  /* The code is fetching the font file `JetBrainsMono-Regular.ttf` from the specified URL and converting
the response into an array buffer. The font file is used later in the code for rendering the image. */
  const JetBrainsMono = await fetch(
    new URL("./fonts/JetBrainsMono-Regular.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  /* The code is creating a new instance of the `ImageResponse` class and returning it. The
`ImageResponse` class is used to generate an image response that can be used for server-side
rendering in Next.js. */
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          backgroundImage:
            "linear-gradient(to bottom right, #E0E7FF 25%, #ffffff 50%, #bde1ff 75%)",
        }}
      >
        <img
          src={new URL(
            "../public/apple-touch-icon.png",
            import.meta.url,
          ).toString()}
          alt="WorqHat Logo"
          tw="w-20 h-20 mb-4 opacity-95"
        />
        <h1
          style={{
            fontSize: "100px",
            background:
              "linear-gradient(to bottom right, #1E2B3A 21.66%, #78716c 86.47%)",
            backgroundClip: "text",
            color: "transparent",
            lineHeight: "5rem",
            letterSpacing: "-0.02em",
          }}
        >
          WorqHat AI Mock Interviews
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "JetbrainsMono",
          data: JetBrainsMono,
        },
      ],
    },
  );
}
