import { useState, Ref, forwardRef } from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";
import numeral from "numeral";

import Link from "src/components/__elements/Link";
import Label from "src/components/__elements/Label";
import BulkActions from "./BulkActions";

import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Grid,
  Slide,
  Divider,
  Tooltip,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
  TextField,
  Button,
  Typography,
  Dialog,
  FormControl,
  Select,
  InputLabel,
  InputAdornment,
  styled,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import LaunchTwoToneIcon from "@mui/icons-material/LaunchTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { INVOICE_STATUS, STATUS_OPTIONS } from "src/constants";
import { applyFilters } from "src/utils/applyFilters";

const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);

const AvatarError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.lighter};
      color: ${theme.colors.error.main};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const getInvoiceStatusLabel = (invoiceStatus) => {
  const { text, color } = INVOICE_STATUS[invoiceStatus];

  return (
    <Label color={color}>
      <b>{text}</b>
    </Label>
  );
};

const applyPagination = (invoices, page, limit) => {
  return invoices.slice(page * limit, page * limit + limit);
};

const Invoices = ({ invoices }) => {
  const [selectedItems, setSelectedInvoices] = useState([]);

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    status: null,
  });

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleStatusChange = (e) => {
    let value = null;

    if (e.target.value !== "all") {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
  };

  const handleSelectAllInvoices = (event) => {
    setSelectedInvoices(
      event.target.checked ? invoices.map((invoice) => invoice.invoice_id) : []
    );
  };

  const handleSelectOneInvoice = (_event, invoiceId) => {
    if (!selectedItems.includes(invoiceId)) {
      setSelectedInvoices((prevSelected) => [...prevSelected, invoiceId]);
    } else {
      setSelectedInvoices((prevSelected) =>
        prevSelected.filter((id) => id !== invoiceId)
      );
    }
  };

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredInvoices = applyFilters(invoices, query, filters, "status", [
    "invoice_number",
  ]);
  const paginatedInvoices = applyPagination(filteredInvoices, page, limit);
  const selectedBulkActions = selectedItems.length > 0;
  const selectedSomeInvoices =
    selectedItems.length > 0 && selectedItems.length < invoices.length;
  const selectedAllInvoices = selectedItems.length === invoices.length;

  return (
    <>
      <Card
        sx={{
          p: 2,
          mb: 3,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid alignItems="center" container spacing={3}>
          <Grid item xs={12} lg={7} md={6}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                m: 0,
              }}
              onChange={handleQueryChange}
              placeholder={"Search by invoice number, ref..."}
              value={query}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} lg={5} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>{"Status"}</InputLabel>
              <Select
                value={filters.status || "all"}
                onChange={handleStatusChange}
                label={"Status"}
              >
                {STATUS_OPTIONS.map((statusOption) => (
                  <MenuItem key={statusOption.id} value={statusOption.id}>
                    {statusOption.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
      <Card>
        <Box pl={2} display="flex" alignItems="center">
          <Checkbox
            checked={selectedAllInvoices}
            indeterminate={selectedSomeInvoices}
            onChange={handleSelectAllInvoices}
          />
          {selectedBulkActions && (
            <Box flex={1} py={2} pl={1} pr={2}>
              <BulkActions />
            </Box>
          )}
          {!selectedBulkActions && (
            <Box
              flex={1}
              py={2}
              pl={1}
              pr={2}
              display={{ xs: "block", sm: "flex" }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography component="span" variant="subtitle1">
                  {"Showing"}:
                </Typography>{" "}
                <b>{paginatedInvoices.length}</b> <b>{"invoices"}</b>
              </Box>
              <TablePagination
                component="div"
                count={filteredInvoices.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 15]}
              />
            </Box>
          )}
        </Box>
        <Divider />

        {paginatedInvoices.length === 0 ? (
          <Typography
            sx={{
              py: 10,
            }}
            variant="h3"
            fontWeight="normal"
            color="text.secondary"
            align="center"
          >
            {"We couldn't find any invoices matching your search criteria"}
          </Typography>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{"Invoice #"}</TableCell>
                    <TableCell>{"Ref"}</TableCell>
                    <TableCell>{"Date"}</TableCell>
                    <TableCell>{"Amount"}</TableCell>
                    <TableCell>{"Status"}</TableCell>
                    <TableCell align="center">{"Actions"}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedInvoices.map((invoice) => {
                    const isInvoiceSelected = selectedItems.includes(
                      invoice.invoice_id
                    );
                    return (
                      <TableRow
                        hover
                        key={invoice.invoice_id}
                        selected={isInvoiceSelected}
                      >
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Checkbox
                              checked={isInvoiceSelected}
                              onChange={(event) =>
                                handleSelectOneInvoice(
                                  event,
                                  invoice.invoice_id
                                )
                              }
                              value={isInvoiceSelected}
                            />
                            <Box pl={1}>
                              <Typography noWrap variant="subtitle2">
                                {invoice?.invoice_number}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Typography variant="h5">
                              {invoice.reference_number}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>{invoice.date}</Typography>
                          <Typography noWrap variant="subtitle1">
                            {"Due:"} <b>{invoice.due_date}</b>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {`${invoice.currency_symbol} ${numeral(
                            invoice.total
                          ).format("0,0.00")}`}
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>
                            {getInvoiceStatusLabel(invoice.status)}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography noWrap>
                            <Tooltip title={"View"} arrow>
                              <IconButton
                                component={Link}
                                href={`/dashboard/invoices/${invoice.invoice_id}`}
                                color="primary"
                              >
                                <LaunchTwoToneIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box p={2}>
              <TablePagination
                component="div"
                count={filteredInvoices.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 15]}
              />
            </Box>
          </>
        )}
      </Card>
    </>
  );
};

Invoices.propTypes = {
  invoices: PropTypes.array.isRequired,
};

Invoices.defaultProps = {
  invoices: [],
};

export default Invoices;
