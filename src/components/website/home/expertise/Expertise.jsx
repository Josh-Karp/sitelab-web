import { Box, Grid, styled, Typography, useTheme } from "@mui/material";
import { Card } from "../../elements/card/Card";

export const Expertise = () => {
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
          {"Our Expertise"}
        </Typography>
        <Typography variant='p' color='text.secondary' fontWeight='normal'>
          {
            "We take pride in our ability to deliver quality designs in a timely manner."
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
            icon='/seo.png'
            title='Priority Design Assistance'
            text='We provide our partners assistance on a priority basis in case of emergency design requirements, even if it requires jumping the queue.'
          />
        </Grid>
        <Grid item>
          <Card
            icon='/design.png'
            title='Clean, Simple & Unique
          Designs'
            text='Simple, minimal, and effective - our design mantra. There is a lot more to simple designs than what you may think and imagine. Bold, clean, and simple designs draw attention.'
          />
        </Grid>
        <Grid item>
          <Card
            icon='/responsive.png'
            title='Adapting, Designing &
          Delivering'
            text='We adapt and design digital assets based on the templates provided by our partners’. Our designers will produce the rest of the assests accustomed to your speciﬁc requirements and brand guidelines.'
          />
        </Grid>
      </Grid>
    </Container>
  );
};
