import Head from "next/head";

import { useState, useCallback, useEffect } from "react";

import SidebarLayout from "src/components/layouts/SidebarLayout";
import { Authenticated } from "src/components/__elements/Authenticated";

import Footer from "src/components/__elements/Footer";
import PageTitleWrapper from "src/components/__elements/PageTitleWrapper";

import { Grid } from "@mui/material";
import { useRefMounted } from "src/hooks/useRefMounted";

import { invoicesApi } from "src/__mocks/invoices";

import InvoiceBody from "src/components/dashboard/invoices/single/InvoiceBody";
import PageHeader from "src/components/dashboard/invoices/single/PageHeader";
import { zoho } from "src/utils/zoho/authorize";
import { wrapper } from "src/state/store";
import { useDispatch } from "react-redux";
import { fetchInvoice } from "src/state/slices/invoice";

function InvoicePage({ invoice }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!invoice) {
      dispatch(
        notify({
          message: "Failed to fetch invoices.",
          variant: "error",
        })
      );
    }
  }, []);

  return (
    <>
      <Head>
        <title>Invoice Details</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader invoice={invoice} />
      </PageTitleWrapper>
      <Grid
        sx={{ px: 4 }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12}>
          <InvoiceBody invoice={invoice} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

InvoicePage.getLayout = (page) => (
  <Authenticated>
    <SidebarLayout>{page}</SidebarLayout>
  </Authenticated>
);

export const getServerSideProps = zoho({
  callback: async (_, store, query) => {
    const { dispatch, getState } = store;

    await dispatch(fetchInvoice(query.invoiceId));

    return {
      props: {
        invoice: getState().invoiceReducer.invoice,
      },
    };
  },
});

export default InvoicePage;
