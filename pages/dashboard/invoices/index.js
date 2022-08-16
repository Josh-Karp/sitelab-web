import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { useDispatch } from "react-redux";

import PageTitleWrapper from "src/components/__elements/PageTitleWrapper";
import { Authenticated } from "src/components/__elements/Authenticated";
import Footer from "src/components/__elements/Footer";
import PageHeader from "src/components/dashboard/invoices/PageHeader";
import Invoices from "src/components/dashboard/invoices/Invoices";
import Statistics from "src/components/dashboard/invoices/Statistics";
import SidebarLayout from "src/components/layouts/SidebarLayout";

import { notify } from "src/modules/notifications/slice/NotificationSlice";
import { zoho } from "src/utils/zoho/authorize";
import { fetchInvoices } from "src/state/slices/invoices";
import { fetchContact } from "src/state/slices/contact";

import { Grid } from "@mui/material";

function InvoicesPage({ invoices, contact }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!invoices) {
      dispatch(
        notify({
          message: "Failed to fetch invoices.",
          variant: "error",
        })
      );
    }

    if (!contact) {
      dispatch(
        notify({
          message: "Failed to fetch contact.",
          variant: "error",
        })
      );
    }
  }, []);

  return (
    <>
      <Head>
        <title>Invoices</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
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
          <Statistics contact={contact} />
        </Grid>
        <Grid item xs={12}>
          <Invoices invoices={invoices} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

InvoicesPage.getLayout = (page) => (
  <Authenticated>
    <SidebarLayout>{page}</SidebarLayout>
  </Authenticated>
);

export const getServerSideProps = zoho({
  callback: async (_, store) => {
    const { dispatch, getState } = store;

    const { userClaims } = store.getState().contactReducer;
    const { company } = JSON.parse(userClaims);

    await dispatch(fetchInvoices(company.id));
    await dispatch(fetchContact(company.id));

    return {
      props: {
        invoices: getState().invoicesReducer.invoices,
        contact: getState().contactReducer.contact,
      },
    };
  },
});

export default InvoicesPage;
