import Head from "next/head";
import Image from "next/image";
import { Clients } from "../src/components/website/home/clients/Clients";
import { Contact } from "../src/components/website/home/contact/Contact";
import { Hero } from "../src/components/website/home/hero/Hero";
import { LifeCycle } from "../src/components/website/home/lifecycle/Lifecycle";
import { Scaleable } from "../src/components/website/home/scaleable/Scaleable";
import { Services } from "../src/components/website/home/services/Services";
import { Success } from "../src/components/website/home/success/Success";
import { Expertise } from "../src/components/website/home/expertise/Expertise";
import RootLayout from "../src/components/website/layout";

export default function Landing() {
  return (
    <>
      <Hero />
      {/* <Clients /> */}
      <Services />
      <Success />
      <Scaleable />
      <LifeCycle />
      <Expertise />
      <Contact />
    </>
  );
}

Landing.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
