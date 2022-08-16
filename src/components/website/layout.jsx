import Head from "next/head";
import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <title>Sitelab</title>
        <meta name="description" content="Sitelab" />
        <link rel="icon" href="/sitelab_favicon-alt.png" />
      </Head>
      <main>
        <Header />
        {children}
        <Footer />
      </main>
    </>
  );
}
