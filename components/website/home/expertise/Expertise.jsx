import React from "react";
import { Card } from "../../elements/card/Card";
import style from "./Expertise.module.scss";

export const Expertise = () => {
  return (
    <div className={style.container}>
      <div>
        <h2>Our Expertise</h2>
        <p className={style.sub}>We take pride in our ability to deliver quality designs in a timely manner.</p>
      </div>
      <div className="grid">
        <Card
          icon="/seo.png"
          title="Priority Design Assistance"
          text="We provide our partners assistance on a priority basis in case of emergency design requirements, even if it requires jumping the queue."
        />
        <Card
          icon="/design.png"
          title="Clean, Simple & Unique
          Designs"
          text="Simple, minimal, and effective - our design mantra. There is a lot more to simple designs than what you may think and imagine. Bold, clean, and simple designs draw attention."
        />
        <Card
          icon="/responsive.png"
          title="Adapting, Designing &
          Delivering"
          text="We adapt and design digital assets based on the templates provided by our partners’. Our designers will produce the rest of the assests accustomed to your speciﬁc requirements and brand guidelines."
        />
      </div>
    </div>
  );
};
