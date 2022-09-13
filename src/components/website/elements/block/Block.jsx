import { Box, styled, Typography, useTheme } from "@mui/material";
import Image from "next/image";

export const Block = ({ icon, title, text }) => {
  const theme = useTheme();

  const Container = styled(Box)(
    ({ theme }) => `
      display: flex;
      flex-flow: row;
      row-gap: 3rem;
      max-width: 465px;
      align-items: center;
      `
  );

  return (
    <Container>
      <Box sx={{ mr: "1.5rem", flexShrink: 0 }}>
        <Image src={icon} alt='Icon' width={48} height={48} />
      </Box>
      <Box
        sx={{
          textAlign: "left",
          alignItems: "flex-start",
        }}
      >
        <Typography variant='h3' fontSize={24}>
          {title}
        </Typography>
        <Typography
          variant='p'
          color='text.secondary'
          fontWeight='normal'
          sx={{
            fontSize: {
              xs: `${theme.typography.pxToRem(12)}`,
              sm: `${theme.typography.pxToRem(16)}`,
            },
          }}
        >
          {text}
        </Typography>
      </Box>
    </Container>
  );
};
