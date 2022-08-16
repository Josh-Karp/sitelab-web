import {
  Breadcrumbs,
  Box,
  Grid,
  Typography,
  Tooltip,
  Button,
  Container,
  IconButton,
} from "@mui/material";
import Link from "src/components/__elements/Link";

import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import PropTypes from "prop-types";

const PageHeader = ({ invoice }) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Tooltip arrow placement="top" title={"Go back"}>
            <IconButton
              href="/dashboard/invoices"
              component={Link}
              color="primary"
              sx={{
                p: 2,
                mr: 2,
              }}
            >
              <ArrowBackTwoToneIcon />
            </IconButton>
          </Tooltip>
          <Box>
            <Typography variant="h3" component="h3" gutterBottom>
              #{invoice?.invoice_number}
            </Typography>
            <Breadcrumbs maxItems={2} aria-label="breadcrumb">
              <Link color="inherit" href="/dashboard">
                {"Dashboard"}
              </Link>
              <Link color="inherit" href="/dashboard/invoices">
                {"Invoices"}
              </Link>
              <Typography color="text.primary">
                {invoice?.invoice_number}
              </Typography>
            </Breadcrumbs>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

PageHeader.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default PageHeader;
