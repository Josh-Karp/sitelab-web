import Image from "next/image";
import style from "./HeroBgLayout.module.scss";

export default function HeroBgLayout({ children }) {
  return (
    <>
      <div className={style.vector1}>
        <Image
          alt="hero-vector-1"
          src="/hero-vector-1.png"
          width={148}
          height={148}
        />
      </div>
      <div className={style.vector2}>
        <Image
          alt="hero-vector-2"
          src="/hero-vector-2.png"
          width={148}
          height={148}
        />
      </div>
      <div className={style.vector3}>
        <Image
          alt="hero-vector-3"
          src="/hero-vector-3.png"
          width={65.5}
          height={65.5}
        />
      </div>
      <div className={style.vector4}>
        <Image
          alt="hero-vector-4"
          src="/hero-vector-4.png"
          width={115.32}
          height={115.32}
        />
      </div>
      <div className={style.vector5}>
        <Image
          alt="hero-vector-5"
          src="/hero-vector-5.png"
          width={240}
          height={120}
        />
      </div>
      {children}
    </>
  );
}
