import "../styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WorqHat AI Demo - AI Mock Interviews",
  openGraph: {
    title: "WorqHat AI Demo - AI Mock Interviews",
    description:
      "This is a demo of WorqHat AI, an AI-powered mock interview platform that helps you practice for your next job interview.",
    images: [
      {
        url: "https://demo.useliftoff.com/opengraph-image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WorqHat AI Demo - AI Mock Interviews",
    description:
      "This is a demo of WorqHat AI, an AI-powered mock interview platform that helps you practice for your next job interview.",
    images: ["https://demo.useliftoff.com/opengraph-image"],
    creator: "@worqhat",
  },
  metadataBase: new URL("https://demo.useliftoff.com"),
  themeColor: "#273e92",
};

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
