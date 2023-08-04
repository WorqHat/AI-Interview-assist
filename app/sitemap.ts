/* The line `import { MetadataRoute } from "next";` is importing the `MetadataRoute` type from the
"next" module. This type is used to define the structure of the sitemap data that will be returned
by the `sitemap` function. */
import { MetadataRoute } from "next";

/**
 * The function `sitemap` returns an array of objects representing URLs and their last modified dates.
 * @returns An array of objects is being returned. Each object represents a URL in the sitemap and
 * includes the URL itself and the last modified date.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ai-interview-assist.vercel.app/",
      lastModified: new Date(),
    },
    {
      url: "https://ai-interview-assist.vercel.app/",
      lastModified: new Date(),
    },
  ];
}
