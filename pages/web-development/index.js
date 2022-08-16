import Head from "next/head";
import Image from "next/image";
import { WebHero } from "../../components/website/web/hero/WebHero";
import { WebServices } from "../../components/website/web/services/WebServices";
import { WebCta } from "../../components/website/web/cta/WebCta";
import RootLayout from "../../components/website/layout";

export default function WebDevelopmentPage() {
  return (
    <>
      <WebHero />
      <WebServices />
      <WebCta />
    </>
  );
}

WebDevelopmentPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
