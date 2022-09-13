import React from "react";
import Image from "next/image";
import HeroBgLayout from "./HeroBgLayout";
import { Box, Button, styled, Typography, useTheme } from "@mui/material";

const Container = styled(Box)(
  ({ theme }) => `
    width: 100%;
    background-color: ${theme.colors.alpha.white[100]};
    justify-content: space-between;
    filter: drop-shadow(1rem 1rem 1.5rem rgba(177, 186, 201, 0.25));
  
    p {
      font-weight: 400;
      font-size: 20px;
      line-height: 31px;
    }
  }
  `
);

const Content = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-flow: row wrap;
    max-width: 1440px;
    align-items: center;
    margin-inline: auto;
    justify-content: center;
    `
);

const Text = styled(Box)(
  ({ theme }) => `
      display: flex;
      flex-flow: column nowrap;
      text-align: left;
      align-items: flex-start;
      padding: 72px 5%;
      flex: 1 0;
      gap: 3rem;
  
      h1 {
        position: relative;
        max-width: 10em;
      }
  
      p {
        max-width: 30rem;
      }
  
      button {
        place-self: center;

      }
  
      @media (min-width: 1024px) {
        h1 {
          max-width: unset;
        }
      }
  
      @media (min-width: 768px) {
        padding: 72px 9%;
  
        h1:before {
          content: url("/left-alt.png");
          position: absolute;
          z-index: -1;
          top: -30px;
          left: -30px;
        }
  
        button {
          place-self: unset;
        }
      }
    `
);

const Background = styled(Box)(
  ({ theme }) => `
      position: relative;
      overflow-y: clip;
      display: flex;
      align-items: flex-end;

      > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          justify-content: center;
        }}
      }
    }
  `
);

export const Hero = () => {
  const theme = useTheme();

  return (
    <Container>
      <Content>
        <Text>
          <Typography
            sx={{
              fontSize: {
                xs: `${theme.typography.pxToRem(48)}`,
                sm: `${theme.typography.pxToRem(56)}`,
              },
              lineHeight: {
                xs: `${theme.typography.pxToRem(48)}`,
                sm: `${theme.typography.pxToRem(56)}`,
              },
            }}
            variant='h1'
          >
            Digital Content & Marketing Agency
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: `${theme.typography.pxToRem(16)}`,
                sm: `${theme.typography.pxToRem(20)}`,
              },
            }}
            color='text.secondary'
            component='p'
          >
            {
              "We create perfect brands, build outstanding websites, vibrant identities and inspire creative concepts."
            }
          </Typography>
          <Button
            variant='contained'
            sx={{ padding: "16px 32px" }}
            onClick={() => router.push("/")}
            endIcon={
              <Image
                alt='arrow-right'
                src='/arrow-right.png'
                width={33}
                height={33}
              />
            }
          >
            {"Get started"}
          </Button>
        </Text>
        <Background>
          <HeroBgLayout>
            <Image alt='Logo' src='/hero.png' width={608} height={671} />
          </HeroBgLayout>
        </Background>
      </Content>
    </Container>
  );
};
