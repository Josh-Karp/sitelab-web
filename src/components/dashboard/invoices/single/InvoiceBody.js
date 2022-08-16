import { useState } from "react";
import PropTypes from "prop-types";

import {
  Box,
  Typography,
  Card,
  Grid,
  Divider,
  Container,
  Tooltip,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TableContainer,
  styled,
  useTheme,
} from "@mui/material";

import { format } from "date-fns";
import numeral from "numeral";
import { useAuth } from "src/hooks/useAuth";
import Logo from "src/components/__elements/LogoSign";
import DownloadTwoToneIcon from "@mui/icons-material/DownloadTwoTone";
import PictureAsPdfTwoToneIcon from "@mui/icons-material/PictureAsPdfTwoTone";
import { useSelector } from "react-redux";
import { downloadPdf } from "src/utils/downloadPdf";

const DotLegend = styled("span")(
  ({ theme }) => `
    border-radius: 22px;
    width: ${theme.spacing(1.38)};
    height: ${theme.spacing(1.4)};
    display: inline-block;
    border: ${theme.colors.alpha.white[100]} solid 2px;
    margin-right: 4px;
`
);

const BoxWrapper = styled(Box)(
  ({ theme }) => `
  border-radius: ${theme.general.borderRadius};
  background: ${theme.colors.alpha.black[5]};
`
);

const TableWrapper = styled(Box)(
  ({ theme }) => `
  border: 1px solid ${theme.colors.alpha.black[10]};
  border-bottom: 0;
  margin: ${theme.spacing(4)} 0;
`
);

const LogoWrapper = styled(Box)(
  () => `
    width: '52px'
`
);

const InvoiceBody = ({ invoice }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const token = useSelector((state) => state.authReducer.accessToken);

  const handleDownload = () => {
    downloadPdf(token, invoice.invoice_id);
  };

  return (
    <Container maxWidth="lg">
      <Card
        sx={{
          p: 3,
          mb: 3,
        }}
      >
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h1" gutterBottom>
              {"Invoice"}
            </Typography>
            <Typography variant="h3" color="text.secondary">
              #{invoice?.invoice_number}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <LogoWrapper>
              <Logo />
            </LogoWrapper>
            <Typography variant="h5" fontWeight="normal">
              3 Bushwillow St
            </Typography>
            <Typography variant="h5" gutterBottom fontWeight="normal">
              Southdowns Estate
            </Typography>
            <Typography variant="h5" fontWeight="normal">
              Irene, South Africa
            </Typography>
          </Box>
        </Box>
        <Divider
          sx={{
            my: 4,
          }}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom>
              {"Invoice for"}:
            </Typography>
            <Typography
              sx={{
                pb: 2,
              }}
              variant="h5"
            >
              {invoice.customer_name}
            </Typography>
            <Typography variant="h5" fontWeight="normal">
              {invoice.billing_address?.street}
            </Typography>
            <Typography variant="h5" gutterBottom fontWeight="normal">
              {invoice.billing_address?.street2}
            </Typography>
            <Typography variant="h5" fontWeight="normal">
              {`${invoice.billing_address?.city}, ${invoice.billing_address?.country}`}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              spacing={4}
              justifyContent={{ xs: "flex-start", sm: "flex-end" }}
            >
              <Grid item>
                <Typography variant="subtitle2" gutterBottom>
                  {"Issued on"}:
                </Typography>
                <Typography
                  sx={{
                    pb: 2,
                  }}
                  variant="h5"
                >
                  {invoice.date}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2" gutterBottom>
                  {"Due on"}:
                </Typography>
                <Typography
                  sx={{
                    pb: 2,
                  }}
                  variant="h5"
                >
                  {invoice.due_date}
                </Typography>
              </Grid>
            </Grid>
            <BoxWrapper textAlign="right" mt={1} p={3}>
              <Typography component="span" variant="h4" fontWeight="normal">
                {"Balance due"}:{" "}
              </Typography>
              <Typography component="span" variant="h4">
                {`${invoice.currency_symbol} ${numeral(invoice.balance).format(
                  "0,0.00"
                )}`}
              </Typography>
            </BoxWrapper>
          </Grid>
        </Grid>

        <TableWrapper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{"Item"}</TableCell>
                  <TableCell>{"Qty"}</TableCell>
                  <TableCell>{"Price"}</TableCell>
                  <TableCell>{"Total"}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoice?.line_items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Typography
                        sx={{
                          pb: 1,
                        }}
                        noWrap
                      >
                        {item.name}
                      </Typography>
                      {item?.description
                        .split(/-/g)
                        .slice(1)
                        .map((line_item) => (
                          <Typography
                            sx={{
                              pl: 1,
                            }}
                            noWrap
                          >
                            <DotLegend
                              style={{
                                background: `${theme.colors.warning.main}`,
                              }}
                            />
                            {line_item}
                          </Typography>
                        ))}
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      {`${invoice.currency_symbol} ${numeral(item.rate).format(
                        "0,0.00"
                      )}`}
                    </TableCell>
                    <TableCell>
                      {`${invoice.currency_symbol} ${numeral(
                        item.item_total
                      ).format("0,0.00")}`}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={0} />
                  <TableCell colSpan={4} align="right">
                    <Typography
                      gutterBottom
                      variant="caption"
                      color="text.secondary"
                      fontWeight="bold"
                    >
                      {"Total"}:
                    </Typography>
                    <Typography variant="h3" fontWeight="bold">
                      {`${invoice.currency_symbol} ${numeral(
                        invoice.total
                      ).format("0,0.00")}`}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </TableWrapper>
        <Tooltip
          placement="top"
          arrow
          title="This functionality will be added in a future release!"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={4}
          >
            <Button
              disabled
              onClick={handleDownload}
              variant="contained"
              sx={{
                mx: 2,
              }}
              startIcon={<DownloadTwoToneIcon />}
            >
              {"Download PDF"}
            </Button>
            <Button
              disabled
              variant="outlined"
              sx={{
                mx: 2,
              }}
              startIcon={<PictureAsPdfTwoToneIcon />}
            >
              {"Preview PDF"}
            </Button>
          </Box>
        </Tooltip>
      </Card>
    </Container>
  );
};

InvoiceBody.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default InvoiceBody;
