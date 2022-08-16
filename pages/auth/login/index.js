import Head from "next/head";
import { useRouter } from "next/router";
import BaseLayout from "../../../src/components/layouts/BaseLayout";
import { LoginForm } from "../../../src/components/auth/login/LoginForm";
// import Logo from "src/components/LogoSign";
import Link from "src/components/__elements/Link";

import {
  Box,
  Card,
  Tooltip,
  Typography,
  Container,
  Alert,
  styled,
} from "@mui/material";

const CardImg = styled(Card)(
  ({ theme }) => `
    width: 90px;
    height: 80px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: ${theme.colors.alpha.white[100]};
    margin: 0 ${theme.spacing(1)};
    border: 1px solid ${theme.colors.alpha.black[10]};
    transition: ${theme.transitions.create(["all"])};

    &:hover {
      border-color: ${theme.colors.primary.main};
    }
`
);

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
`
);

const TopWrapper = styled(Box)(
  () => `
  display: flex;
  width: 100%;
  flex: 1;
  padding: 20px;
`
);

const Wrapper = styled(Container)(
  () => `
    display: flex;
    align-items: center;
  `
);

function LoginPage() {
  const router = useRouter();
  const { demo } = router.query;

  return (
    <>
      <Head>
        <title>SiteLab Login</title>
      </Head>
      <MainContent>
        <TopWrapper>
          <Wrapper maxWidth="sm">
            {/* <Logo /> */}
            <Card
              sx={{
                mt: 3,
                px: 4,
                pt: 5,
                pb: 3,
                width: "100%",
              }}
            >
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    mb: 1,
                  }}
                >
                  {"Sign in"}
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{
                    mb: 3,
                  }}
                >
                  {"Fill in the fields below to sign into your account."}
                </Typography>
              </Box>
              <LoginForm />
              <Box my={4}>
                <Typography
                  component="span"
                  variant="subtitle2"
                  color="text.primary"
                  fontWeight="bold"
                >
                  {"Don’t have an account, yet?"}
                </Typography>{" "}
                <Link href="/auth/register">
                  <b>Sign up here</b>
                </Link>
              </Box>
            </Card>
          </Wrapper>
        </TopWrapper>
      </MainContent>
    </>
  );
}

LoginPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default LoginPage;
