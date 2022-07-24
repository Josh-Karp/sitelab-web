import Head from "next/head";
import Image from "next/image";
import { Clients } from "../components/website/home/clients/Clients";
import { Contact } from "../components/website/home/contact/Contact";
import { Hero } from "../components/website/home/hero/Hero";
import { LifeCycle } from "../components/website/home/lifecycle/Lifecycle";
import { Scaleable } from "../components/website/home/scaleable/Scaleable";
import { Services } from "../components/website/home/services/Services";
import { Success } from "../components/website/home/success/Success";
import { Expertise } from "../components/website/home/expertise/Expertise";
import RootLayout from "../components/website/layout";

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
      <Contact
       />
    </>
  );
}

Landing.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
