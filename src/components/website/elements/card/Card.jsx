import Image from "next/image";
import React from "react";
import style from './Card.module.scss'

export const Card = ({ icon, title, text }) => {
  return (
    <div className={style.container}>
      <Image src={icon} alt="Icon" width={93} height={93} />
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
};
