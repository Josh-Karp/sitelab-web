import { Box, Card, Grid, Typography, styled } from "@mui/material";
import numeral from "numeral";
import Text from "src/components/__elements/Text";

const DotInfo = styled("span")(
  ({ theme }) => `
    border-radius: 22px;
    background: ${theme.colors.info.main};
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`
);

const DotPending = styled("span")(
  ({ theme }) => `
    border-radius: 22px;
    background: ${theme.colors.warning.main};
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`
);

function Statistics({ contact }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card
          sx={{
            px: 3,
            py: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box
            display="flex"
            flex={1}
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h2">{contact.company_name}</Typography>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{
            height: "100%",
            px: 3,
            py: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",
                mr: 2,
              }}
            >
              <DotPending />
              {"Outstanding"}
            </Typography>
            <Typography variant="h3">
              {`${contact.currency_symbol} ${numeral(
                contact.outstanding_receivable_amount
              ).format("0,0.00")}`}
            </Typography>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{
            height: "100%",
            px: 3,
            py: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",
                mr: 2,
              }}
            >
              <DotInfo />
              {"Credit"}
            </Typography>
            <Typography variant="h3">
              {`${contact.currency_symbol} ${numeral(
                contact.unused_credits_receivable_amount
              ).format("0,0.00")}`}
            </Typography>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Statistics;
