import React from "react";
import Image from "next/image";
import style from "./WebHero.module.scss";
// import HeroBgLayout from "./HeroBgLayout";

export const WebHero = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.text}>
          <h1>Innovative Web Development</h1>
          <p>Let your brand talk to your clients the way you would with a professional, eye-catching website</p>
          <button className="orange">
            Get started{" "}
            <span>
              <Image
                alt="arrow-right"
                src="/arrow-right.png"
                width={33}
                height={33}
              />
            </span>
          </button>
        </div>
        <div className={style.image}>
          {/* <HeroBgLayout>
            <Image alt="Logo" src="/hero.png" width={608} height={671} />
          </HeroBgLayout> */}
        </div>
      </div>
    </div>
  );
};
