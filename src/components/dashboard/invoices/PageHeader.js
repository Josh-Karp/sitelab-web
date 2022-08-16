import { Grid, Typography, useTheme } from "@mui/material";

function PageHeader() {
  const theme = useTheme();

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {"Invoices"}
          </Typography>
          <Typography variant="subtitle2">
            {"All recent invoices can be found below"}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;
