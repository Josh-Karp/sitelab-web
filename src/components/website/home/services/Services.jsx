import { Box, Grid, styled, Typography, useTheme } from "@mui/material";
import { Card } from "../../elements/card/Card";

export const Services = () => {
  const theme = useTheme();

  const Container = styled(Box)(
    ({ theme }) => `
    display: flex;
    flex-flow: column wrap;
    padding: 100px 5%;
    row-gap: 85px;
    margin-inline: auto;
    background-color: ${theme.colors.alpha.white[50]};
  }
  `
  );

  return (
    <Container>
      <Box
        sx={{
          alignSelf: {
            xs: "center",
            sm: "center",
          },
          textAlign: {
            xs: "left",
            sm: "center",
          },
          maxWidth: "650px",
        }}
      >
        <Typography
          variant='h1'
          sx={{
            fontSize: {
              xs: `${theme.typography.pxToRem(32)}`,
              sm: `${theme.typography.pxToRem(42)}`,
            },
            marginBottom: "0.25em",
          }}
        >
          {"Development To Marketing"}
        </Typography>
        <Typography
          variant='p'
          color='text.secondary'
          fontWeight='normal'
          sx={{
            fontSize: {
              sm: `${theme.typography.pxToRem(16)}`,
            },
          }}
        >
          {
            "We offer services across all major online marketing domains and niches"
          }
        </Typography>
      </Box>
      <Grid
        container
        alignItems='stretch'
        justifyContent='center'
        rowSpacing={4}
        columnSpacing={{ xs: 4 }}
      >
        <Grid item>
          <Card
            icon='/award.png'
            title='Marketing & Strategy'
            text='It goes without saying but without a proper plan or strategy, you’re throwing darts in the dark.'
          />
        </Grid>
        <Grid item>
          <Card
            icon='/design.png'
            title='Branding & Creative'
            text='We’ll help you communicate your brand messaging through visual elements, from graphic design to full-on video production.'
          />
        </Grid>
        <Grid item>
          <Card
            icon='/app.png'
            title='Web Development'
            text='Interactive, innovative, eye-catching websites to grow your business like never before.'
          />
        </Grid>
      </Grid>
    </Container>
  );
};
