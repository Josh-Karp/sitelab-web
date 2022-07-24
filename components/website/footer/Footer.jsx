import Image from "next/image";
import Link from "next/link";
import React from "react";
import style from "./Footer.module.scss";
import { FooterBgLayout } from "./FooterBgLayout";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export const Footer = () => {
  return (
    <div className={style.container}>
      <div className={style.cta}>
        <div>
          <h2>Let&apos;s work together</h2>
          <p>We Accelerate Growth</p>
        </div>
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
        <FooterBgLayout />
      </div>
      <div className={style.nav}>
        <div className={style.left}>
          <a href="#">
            <Image
              alt="SiteLab Logo"
              src="/SiteLab_xSmall-alt.png"
              width={124}
              height={45}
            />
          </a>
          <div className={style.copyright}>
            <span>Copyright &copy; 2022 SiteLab (Pty) Ltd</span>
            <div className={style.flexEnd}>
              <Link href="#" className="small-text link">
                <a>Terms of Service</a>
              </Link>
              <Link href="#" className="small-text link">
                <a>Privacy Policy</a>
              </Link>
              <Link href="#" className="small-text link">
                <a>Sitemap</a>
              </Link>
            </div>
          </div>
        </div>
        <div className={style.right}>
          <div className={style.links}>
            <p className={style.heading}>Resources</p>
            <Link href="#">
              <a>News</a>
            </Link>
            <Link href="#">
              <a>Resources</a>
            </Link>
          </div>
          <div className={style.links}>
            <p className={style.heading}>Support</p>
            <Link href="#">
              <a>Contact Us</a>
            </Link>
            <Link href="#">
              <a>FAQ</a>
            </Link>
          </div>
          <div className={style.connect}>
            <ul
              aria-label="Primary"
              role="list"
              className={`${style.social} ${style.heading}`}
            >
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <FacebookIcon />
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon />
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon />
                </a>
              </li>
            </ul>
            <p>
              Pretoria
              <br />
              South Africa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
