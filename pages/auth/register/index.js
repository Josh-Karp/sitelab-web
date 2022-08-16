import {
  Box,
  Card,
  Tooltip,
  Typography,
  Container,
  Alert,
  styled,
} from "@mui/material";
import Head from "next/head";
import { useAuth } from "src/hooks/useAuth";
import { RegisterUser } from "src/components/auth/register/RegisterForm";
// import Logo from "src/components/LogoSign";
import BaseLayout from "src/components/layouts/BaseLayout";
import Link from "src/components/__elements/Link";
import { useRouter } from "next/router";

const icons = {
  FirebaseAuth: "/static/images/logo/firebase.svg",
};

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
const BottomWrapper = styled(Box)(
  ({ theme }) => `
    padding: ${theme.spacing(3)};
    display: flex;
    align-items: center;
    justify-content: center;
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
    flex-direction: column;
    justify-content: center;
  `
);

function RegisterPage() {
  const router = useRouter();
  const { demo } = router.query;

  return (
    <>
      <Head>
        <title></title>
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
              }}
            >
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    mb: 1,
                  }}
                >
                  {"Create account"}
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{
                    mb: 3,
                  }}
                >
                  {"Fill in the fields below to sign up for an account."}
                </Typography>
              </Box>
              <RegisterUser />
              <Box mt={4}>
                <Typography
                  component="span"
                  variant="subtitle2"
                  color="text.primary"
                  fontWeight="bold"
                >
                  {"Already have an account?"}
                </Typography>{" "}
                <Link href="/auth/login">
                  <b>Sign in here</b>
                </Link>
              </Box>
            </Card>
            <BottomWrapper>
              <Box mb={3}>
                <Tooltip arrow placement="top" title="Firebase">
                  <CardImg>
                    <img
                      height={50}
                      alt="Firebase"
                      src={icons["FirebaseAuth"]}
                    />
                  </CardImg>
                </Tooltip>
              </Box>
            </BottomWrapper>
          </Wrapper>
        </TopWrapper>
      </MainContent>
    </>
  );
}

RegisterPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default RegisterPage;
