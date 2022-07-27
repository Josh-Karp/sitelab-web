import React from "react";
import Image from "next/image";
import style from "./Scaleable.module.scss";
import { Block } from "../../elements/block/Block";

export const Scaleable = () => {
  return (
    <div className={style.container}>
      <Image src="/sales.png" alt="Scaleable" width={515} height={581} quality={100}/>
      <div className={style.content}>
        <div className={style.text}>
          <h2>Driving Business Growth through Creative Design</h2>
          <p>
            Design is a powerful tool that influences understanding and
            perception of your brand. Bring your products and services to life
            in a way that can simultaneously drive consumer demand and unite
            people around a shared objective.
          </p>
        </div>
        <div className={style.blocks}>
          <Block
            icon="/left.png"
            title="65% Increase"
            text="Online sales growth"
          />
          <Block
            icon="/right.png"
            title="50% Increase"
            text="Average business leads growth"
          />
        </div>
      </div>
    </div>
  );
};
