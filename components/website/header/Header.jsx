import React from "react";
import Image from "next/image";
import style from "./Header.module.scss";

export const Header = () => {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.logo}>
          <a href="#">
            <Image
              alt="Logo"
              src="/SiteLab_xSmall-alt.png"
              width={124}
              height={45}
            />
          </a>
        </div>
        <input type="checkbox" id={style.toggle} style={{ display: "none" }} />
        <label className={style.burger} for={style.toggle}>
          <div className={style.bar}></div>
          <div className={style.bar}></div>
          <div className={style.bar}></div>
        </label>
        <nav className={style.menu}>
          <ul aria-label="Primary" role="list">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
        <button className="button empty">Login</button>
      </div>
    </div>
  );
};
