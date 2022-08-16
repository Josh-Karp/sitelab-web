import React from "react";
import { Card } from "../../elements/card/Card";
import style from "./WebServices.module.scss";

export const WebServices = () => {
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
          icon="/web/html-css-js.png"
          title="HTML/CSS/JS"
          text="It goes without saying but without a proper plan or strategy, you’re throwing darts in the dark."
        />
        <Card
          icon="/web/react.png"
          title="ReactJS"
          text="We’ll help you communicate your brand messaging through visual elements, from graphic design to full-on video production."
        />
        <Card
          icon="/app.png"
          title="NextJS"
          text="Interactive, innovative, eye-catching websites to grow your business like never before."
        />
                <Card
          icon="/web/gatsbyjs.png"
          title="GatsbyJS"
          text="A fast and flexible framework to build and deploy headless websites that drive more traffic, convert better, and earn more revenue."
        />
      </div>
    </div>
  );
};
