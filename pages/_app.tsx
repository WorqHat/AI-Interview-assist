/* The first line `import "@/styles/globals.css";` is importing a global CSS file located at
`@/styles/globals.css`. This file likely contains styles that will be applied to the entire
application. */
import "@/styles/globals.css";
import type { AppProps } from "next/app";

/**
 * The function MyApp is a React component that renders the Component passed as a prop along with any
 * additional pageProps.
 * @param {AppProps}  - - `Component`: This is the component that will be rendered as the main content
 * of the application. It can be any React component.
 * @returns a JSX element.
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="scroll-smooth antialiased [font-feature-settings:'ss01']">
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
