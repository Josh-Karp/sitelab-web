import React from "react";
import Image from "next/image";
import style from "./Header.module.scss";

export const Header = () => {
  const handleClick = (event) => {
    if (event.target.checked) {
      document.body.style.overflow = `hidden`;
    } else {
      document.body.style.overflow = `initial`;
    }
  };
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.logo}>
          <a href="#">
            <Image
              alt="SiteLab Logo"
              src="/SiteLab_xSmall-alt.png"
              width={124}
              height={45}
            />
          </a>
        </div>
        <input
          type="checkbox"
          id={style.toggle}
          style={{ display: "none" }}
          onClick={handleClick}
        />
        <label className={style.burger} htmlFor={style.toggle}>
          <div className={style.bar}></div>
          <div className={style.bar}></div>
          <div className={style.bar}></div>
        </label>
        <nav className={style.menu}>
          <ul aria-label="Primary" role="list">
            <li>
              <a className="link" href="#">
                Home
              </a>
            </li>
            <li>
              <a className="link" href="#">
                Services
              </a>
            </li>
            <li>
              <a className="link" href="#">
                Pricing
              </a>
            </li>
            <li>
              <a className="link" href="#">
                About Us
              </a>
            </li>
            <li>
              <a className="link" href="#">
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <button className="button empty">Login</button>
      </div>
    </div>
  );
};
