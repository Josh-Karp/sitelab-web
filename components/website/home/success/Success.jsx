import React from "react";
import Image from "next/image";
import style from "./Success.module.scss";
import { Block } from "../../elements/block/Block";

export const Success = () => {
  return (
    <div className={style.container}>
      <Image src="/success.png" alt="Success" width={581} height={515} quality={100}/>
      <div className={style.content}>
        <div className={style.text}>
          <h2>Experienced & Skilled Designers</h2>
          <p>
            Our dedicated team is our key to delivering a stress-free and
            superior quality working experience to our partners&apos;. So whether you
            want us to develop a web design from scratch, create a social media
            plan or assemble your brand&apos;s identity, we have the team strength
            and the right talent to get your work done seamlessly.
          </p>
        </div>
        <div className={style.blocks}>
          <Block
            icon="/left.png"
            title="20+"
            text="Skilled Web & Graphic Designers"
          />
          <Block icon="/right.png" title="10+" text="Years of Experience" />
        </div>
      </div>
    </div>
  );
};
