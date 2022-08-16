import React from "react";
import Image from "next/image";
import style from "./Hero.module.scss";
import HeroBgLayout from "./HeroBgLayout";

export const Hero = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.text}>
          <h1>Digital Content & Marketing Agency</h1>
          <p>
            We create perfect brands, build outstanding websites, vibrant
            identities and inspire creative concepts.
          </p>
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
          <HeroBgLayout>
            <Image alt="Logo" src="/hero.png" width={608} height={671} />
          </HeroBgLayout>
        </div>
      </div>
    </div>
  );
};
