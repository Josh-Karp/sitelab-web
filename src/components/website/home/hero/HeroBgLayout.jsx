import { Box, styled } from "@mui/material";
import Image from "next/image";

export default function HeroBgLayout({ children }) {
  const Vector1 = styled(Box)(
    ({ theme }) => `
    position: absolute;
    right: 0;
    top: 0;
  
    @media (min-width: 768px) {
      right: 0;
      top: 65px;
    }
  `
  );

  const Vector2 = styled(Box)(
    ({ theme }) => `
    position: absolute;
    right: 0;
    top: 148px;
  
    @media (min-width: 768px) {
      right: 0;
      top: 213px;
    }
  `
  );

  const Vector3 = styled(Box)(
    ({ theme }) => `
    position: absolute;
    left: 49px;
    top: 0;
    z-index: -2;
  
    @media (min-width: 768px) {
      left: 126px;
      top: 137px;
    }
  `
  );

  const Vector4 = styled(Box)(
    ({ theme }) => `
    position: absolute;
    left: 0;
    top: 0;
    z-index: -3;
  
    @media (min-width: 768px) {
      left: 76px;
      top: 137px;
    }
  `
  );

  const Vector5 = styled(Box)(
    ({ theme }) => `
    position: absolute;
    left: -100px;
    bottom: 15px;
    z-index: -1;
  
    @media (min-width: 768px) {
      left: -100px;
      top: 388px;
    }
  `
  );

  return (
    <>
      <Vector1>
        <Image
          alt='hero-vector-1'
          src='/hero-vector-1.png'
          width={148}
          height={148}
        />
      </Vector1>
      <Vector2>
        <Image
          alt='hero-vector-2'
          src='/hero-vector-2.png'
          width={148}
          height={148}
        />
      </Vector2>
      <Vector3>
        <Image
          alt='hero-vector-3'
          src='/hero-vector-3.png'
          width={65.5}
          height={65.5}
        />
      </Vector3>
      <Vector4>
        <Image
          alt='hero-vector-4'
          src='/hero-vector-4.png'
          width={115.32}
          height={115.32}
        />
      </Vector4>
      <Vector5>
        <Image
          alt='hero-vector-5'
          src='/hero-vector-5.png'
          width={240}
          height={120}
        />
      </Vector5>
      {children}
    </>
  );
}
