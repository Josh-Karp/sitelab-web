import { Box, styled, Typography, useTheme } from "@mui/material";
import Image from "next/image";

const Container = styled(Box)(
  ({ theme }) => `
    max-width: 340px;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1.5em;
    padding: 2em;
    background: #ffffff;
    filter: drop-shadow(1rem 1rem 1.5rem rgb(177 186 201 / 25%));
    border-radius: 10px;
    transition: transform 0.2s;
  
    &:hover {
      transform: scale(1.05);
    }
  
    @media (min-width: 768px) {
      margin-inline: 1em;
    }
  `
);

export const Card = ({ icon, title, text }) => {
  const theme = useTheme();
  return (
    <Container>
      <Image src={icon} alt='Icon' width={93} height={93} />
      <Typography
        variant='h3'
        sx={{
          fontSize: {
            xs: `${theme.typography.pxToRem(18)}`,
            sm: `${theme.typography.pxToRem(24)}`,
          },
          mb: 2,
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
      <Typography
        textAlign='center'
        sx={{
          fontSize: {
            xs: `${theme.typography.pxToRem(14)}`,
            sm: `${theme.typography.pxToRem(16)}`,
          },
        }}
        color='text.secondary'
        variant='p'
      >
        {text}
      </Typography>
    </Container>
  );
};
