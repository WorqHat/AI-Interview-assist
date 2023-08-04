/* The code is importing the global CSS file and the `Metadata` type from the `next` package. The
global CSS file is used to apply styles to the entire application, while the `Metadata` type is used
to define metadata for the page, such as the title, description, and images for social media
sharing. */

import "../styles/globals.css";
import { Metadata } from "next";

/* The `export const metadata: Metadata` statement is defining a constant variable named `metadata`
with the type `Metadata`. The `Metadata` type is imported from the `next` package. */

export const metadata: Metadata = {
  /* The code is defining the metadata for the page. The `title` property specifies the title of the
page, which is "WorqHat AI Demo - AI Mock Interviews". */
  title: "WorqHat AI Demo - AI Mock Interviews",
  openGraph: {
    title: "WorqHat AI Demo - AI Mock Interviews",
    description:
      "This is a demo of WorqHat AI, an AI-powered mock interview platform that helps you practice for your next job interview.",
    images: [
      {
        url: "https://ai-interview-assist.vercel.app//opengraph-image",
      },
    ],
  },
  /* The code block is defining the metadata for the page specifically for Twitter sharing. */
  twitter: {
    card: "summary_large_image",
    title: "WorqHat AI Demo - AI Mock Interviews",
    description:
      "This is a demo of WorqHat AI, an AI-powered mock interview platform that helps you practice for your next job interview.",
    images: ["https://ai-interview-assist.vercel.app//opengraph-image"],
    creator: "@worqhat",
  },
  /* The `metadataBase` property is defining the base URL for the metadata of the page. It is set to the
URL "https://ai-interview-assist.vercel.app/". This URL is used as the base for any relative URLs
specified in the metadata, such as the image URL in the `openGraph` and `twitter` properties. */
  metadataBase: new URL("https://ai-interview-assist.vercel.app/"),
  themeColor: "#273e92",
};

/**
 * The function `RootLayout` is a TypeScript React component that wraps its children in an HTML body
 * element with some additional attributes.
 * @param  - The `RootLayout` function is a React component that takes in a single parameter `props`
 * which is an object with a property `children`. The `children` property is of type `React.ReactNode`,
 * which means it can accept any valid React node as its value.
 * @returns an HTML document with a body element containing the provided children. The body element has
 * the class names "scroll-smooth antialiased [font-feature-settings:'ss01']" and the lang attribute is
 * set to "en".
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="scroll-smooth antialiased [font-feature-settings:'ss01']">
        {children}
      </body>
    </html>
  );
}
