import { Box, styled, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { Block } from "../../elements/block/Block";

const Container = styled(Box)(
  ({ theme }) => `
    padding: 100px 5%;
    display: flex;
    flex-flow: row wrap;
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

export const Success = () => {
  const theme = useTheme();
  return (
    <Container>
      <Image
        src='/success.png'
        alt='Success'
        width={581}
        height={515}
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
          Experienced & Skilled Designers
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
          Our dedicated team is our key to delivering a stress-free and superior
          quality working experience to our partners&apos;. So whether you want
          us to develop a web design from scratch, create a social media plan or
          assemble your brand&apos;s identity, we have the team strength and the
          right talent to get your work done seamlessly.
        </Typography>
        <Blocks>
          <Block
            icon='/left.png'
            title='20+'
            text='Skilled Web & Graphic Designers'
          />
          <Block icon='/right.png' title='10+' text='Years of Experience' />
        </Blocks>
      </Content>
    </Container>
  );
};
