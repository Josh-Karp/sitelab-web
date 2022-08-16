import Image from "next/image";
import React from "react";
import style from "./Block.module.scss";

export const Block = ({ icon, title, text }) => {
  return (
    <div className={style.container}>
      <div className={style.shape}>
        <Image src={icon} alt="Icon" width={48} height={48} />
      </div>
      <div className={style.text}>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};
