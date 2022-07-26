import React from "react";
import { Card } from "../../elements/card/Card";
import style from "./Services.module.scss";

export const Services = () => {
  return (
    <div className={style.container}>
      <div>
        <h2>Development To Marketing</h2>
        <p className={style.sub}>
          We offer services across all major online marketing domains and niches
        </p>
      </div>
      <div className="grid">
        <Card
          icon="/award.png"
          title="Marketing & Strategy"
          text="It goes without saying but without a proper plan or strategy, you’re throwing darts in the dark."
        />
        <Card
          icon="/design.png"
          title="Branding & Creative"
          text="We’ll help you communicate your brand messaging through visual elements, from graphic design to full-on video production."
        />
        <Card
          icon="/app.png"
          title="Web Development"
          text="Interactive, innovative, eye-catching websites to grow your business like never before."
        />
      </div>
    </div>
  );
};
