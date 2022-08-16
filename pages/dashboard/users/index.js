import { useState, useEffect, useCallback } from "react";

import { adminAuth } from "src/utils/firebaseAdmin";

import Head from "next/head";

import { Authenticated } from "src/components/__elements/Authenticated";
import PageTitleWrapper from "src/components/__elements/PageTitleWrapper";
import SidebarLayout from "src/components/layouts/SidebarLayout";
import Footer from "src/components/__elements/Footer";

import PageHeader from "src/components/dashboard/users/PageHeader";
import Users from "src/components/dashboard/users/Users";

import { Grid } from "@mui/material";

function UsersPage({ users }) {
  return (
    <>
      <Head>
        <title>Users</title>
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
          <Users users={users} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

UsersPage.getLayout = (page) => (
  <Authenticated>
    <SidebarLayout>{page}</SidebarLayout>
  </Authenticated>
);

export async function getServerSideProps() {
  const res = await adminAuth.listUsers(1000);
  const users = JSON.stringify(res.users)

  return {
    props: {
      users: JSON.parse(users),
    },
  };
}

export default UsersPage;
