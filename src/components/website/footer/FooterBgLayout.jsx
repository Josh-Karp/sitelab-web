import Image from "next/image";
import style from "./FooterBgLayout.module.scss";

export const FooterBgLayout = () => {
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
    </>
  );
};
