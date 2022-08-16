import * as yup from "yup";
import { useRouter } from "next/router";
import { Formik } from "formik";
import { useAuth } from "../../../hooks/useAuth";
import { useRefMounted } from "src/hooks/useRefMounted";
import Link from "src/components/__elements/Link";

import {
  Box,
  Button,
  Divider,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  CircularProgress,
  styled,
} from "@mui/material";

import { notify } from "src/modules/notifications/slice/NotificationSlice";
import { useDispatch } from "react-redux";
import { AuthError } from "src/components/__errors/auth/AuthErrors";
import { setUser, setUserClaims } from "src/state/slices/contact";

const ImgWrapper = styled("img")(
  ({ theme }) => `
    margin-right: ${theme.spacing(1)};
`
);

const validationSchema = {
  email: yup
    .string()
    .email("The email provided should be a valid email address")
    .max(255)
    .required("The email field is required"),
  password: yup.string().max(255).required("The password field is required"),
  terms: yup
    .boolean()
    .oneOf([true], "You must agree to our terms and conditions"),
};

const initialValues = {
  email: "",
  password: "",
  terms: true,
  submit: null,
};

export const LoginForm = (props) => {
  const dispatch = useDispatch();
  const { _signInWithEmailAndPassword, _signInWithGoogle } = useAuth();
  const isMountedRef = useRefMounted();
  const router = useRouter();

  const handleGoogleClick = async () => {
    try {
      const userCredentials = await _signInWithGoogle();

      dispatch(
        setUserClaims(userCredentials.user?.reloadUserInfo?.customAttributes)
      );

      dispatch(
        notify({
          message: "Signed in successfully.",
          variant: "success",
        })
      );

      if (isMountedRef()) {
        const backTo = router.query.backTo || "/dashboard/invoices";
        router.push(backTo);
      }
    } catch (err) {
      console.error(err);
      const { message, varaint } = AuthError(err);

      if (message && varaint) {
        dispatch(
          notify({
            message: message,
            variant: varaint,
          })
        );
      }
    }
  };

  const submitForm = async (values, helpers) => {
    const { email, password } = values;
    try {
      await _signInWithEmailAndPassword(email, password);

      dispatch(
        notify({
          message: "Signed in successfully.",
          variant: "success",
        })
      );

      if (isMountedRef()) {
        const backTo = router.query.backTo || "/dashboard/invoices";
        router.push(backTo);
      }
    } catch (err) {
      console.error(err);
      const { message, varaint } = AuthError(err);

      if (message && varaint) {
        dispatch(
          notify({
            message: message,
            variant: varaint,
          })
        );
      }

      if (isMountedRef()) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  };

  return (
    <Box {...props}>
      <Button
        fullWidth
        onClick={handleGoogleClick}
        size="large"
        variant="outlined"
      >
        <ImgWrapper alt="Google" src="/static/images/logo/google.svg" />
        {"Sign in with Google"}
      </Button>
      <Divider
        sx={{
          mt: 4,
          mb: 2,
        }}
      >
        {"or"}
      </Divider>
      <Formik
        initialValues={initialValues}
        validationSchema={yup.object().shape(validationSchema)}
        onSubmit={submitForm}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          handleBlur,
          isSubmitting,
          errors,
          touched,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              label={"Email address"}
              placeholder={"Your email address here..."}
              margin="normal"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              label={"Password"}
              placeholder={"Your password here..."}
              margin="normal"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
              variant="outlined"
            />
            <Box
              alignItems="center"
              display={{ xs: "block", md: "flex" }}
              justifyContent="space-between"
            >
              <Box display={{ xs: "block", md: "flex" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.terms}
                      name="terms"
                      color="primary"
                      onChange={handleChange}
                    />
                  }
                  label={
                    <>
                      <Typography variant="body2">
                        {"I accept the"}{" "}
                        <Link href="#">{"terms and conditions"}</Link>.
                      </Typography>
                    </>
                  }
                />
              </Box>
              <Link href="/auth/recover-password">
                <b>{"Lost password?"}</b>
              </Link>
            </Box>
            {Boolean(touched.terms && errors.terms) && (
              <FormHelperText error>{errors.terms}</FormHelperText>
            )}
            <Button
              sx={{
                mt: 3,
              }}
              color="primary"
              startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
              disabled={isSubmitting}
              size="large"
              fullWidth
              type="submit"
              variant="contained"
            >
              {"Sign in"}
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};
