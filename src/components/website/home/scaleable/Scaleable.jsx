import { Box, styled, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { Block } from "../../elements/block/Block";

const Container = styled(Box)(
  ({ theme }) => `
    padding: 100px 5%;
    display: flex;
    flex-flow: row-reverse wrap;
    justify-content: center;
    gap: 5rem;
    background-color: ${theme.colors.alpha.white[50]};
  `
);

const Content = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-flow: row wrap;
    max-width: 560px;
    align-content: center;
    align-items: flex-start;
    `
);

const Blocks = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-flow: column nowrap;
    gap: 3rem;
  `
);

export const Scaleable = () => {
  const theme = useTheme();
  
  return (
    <Container>
      <Image
        src='/sales.png'
        alt='Scaleable'
        width={515}
        height={581}
        quality={100}
      />
      <Content>
        <Typography
          variant='h1'
          sx={{
            fontSize: {
              xs: `${theme.typography.pxToRem(32)}`,
              sm: `${theme.typography.pxToRem(42)}`,
            },
            mb: "1.5rem",
          }}
        >
          Driving Business Growth
        </Typography>
        <Typography
          variant='p'
          component='paragraph'
          sx={{
            fontSize: {
              sm: `${theme.typography.pxToRem(16)}`,
            },
            mb: "3rem",
          }}
          color='text.secondary'
          fontWeight='normal'
        >
          Design is a powerful tool that influences understanding and perception
          of your brand. Bring your products and services to life in a way that
          can simultaneously drive consumer demand and unite people around a
          shared objective.
        </Typography>
        <Blocks>
          <Block
            icon='/left.png'
            title='65% Increase'
            text='Online sales growth'
          />
          <Block
            icon='/right.png'
            title='50% Increase'
            text='Average business leads growth'
          />
        </Blocks>
      </Content>
    </Container>
  );
};
