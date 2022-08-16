import * as yup from "yup";
import { useRouter } from "next/router";
import { Formik } from "formik";

import Link from "src/components/__elements/Link";

import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  TextField,
  Box,
  Typography,
  CircularProgress,
  styled,
} from "@mui/material";
import { useAuth } from "src/hooks/useAuth";
import { useRefMounted } from "src/hooks/useRefMounted";
import { useCallback } from "react";
import { notify } from "src/modules/notifications/slice/NotificationSlice";
import { useDispatch } from "react-redux";
import { AuthError } from "src/components/__errors/auth/AuthErrors";
import axiosFirebase from "src/utils/firebase/axiosFirebase";

const ImgWrapper = styled("img")(
  ({ theme }) => `
    margin-right: ${theme.spacing(1)};
`
);

export const RegisterUser = (props) => {
  const dispatch = useDispatch();
  const { _createUserWithEmailAndPassword, _signInWithGoogle, _getIdToken } =
    useAuth();
  const isMountedRef = useRefMounted();
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    terms: true,
    submit: null,
  };

  const validationShape = {
    email: yup
      .string()
      .email("The email provided should be a valid email address")
      .max(255)
      .required("The email field is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(255)
      .required("The password field is required"),
    terms: yup
      .boolean()
      .oneOf([true], "You must agree to our terms and conditions"),
    first_name: yup
      .string()
      .max(255)
      .required("The first name field is required"),
    last_name: yup
      .string()
      .max(255)
      .required("The last name field is required"),
  };

  const handleSubmit = useCallback(
    async (values, helpers) => {
      const { email, password, first_name, last_name } = values;
      try {
        const userCredential = await _createUserWithEmailAndPassword(
          email,
          password
        );

        const { uid } = userCredential.user;

        await axiosFirebase.put(`/user/claims?uid=${uid}`, {
          role: "customer",
        });

        await axiosFirebase.put(`/user?uid=${uid}`, {
          displayName: `${first_name} ${last_name}`,
        });

        await _getIdToken();

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
    },
    [AuthError]
  );

  const handleGoogleClick = async () => {
    try {
      await _signInWithGoogle();

      dispatch(
        notify({
          message: "Signed in successfully.",
          variant: "success",
        })
      );
    } catch (err) {
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

  return (
    <Box {...props}>
      <Button
        fullWidth
        onClick={handleGoogleClick}
        size="large"
        variant="outlined"
      >
        <ImgWrapper alt="Google" src="/static/images/logo/google.svg" />
        Register with Google
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
        validationSchema={yup.object().shape(validationShape)}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              error={Boolean(touched.first_name && errors.first_name)}
              fullWidth
              helperText={touched.first_name && errors.first_name}
              label={"First name"}
              name="first_name"
              margin="normal"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.first_name}
              variant="outlined"
            />
            <TextField
              error={Boolean(touched.last_name && errors.last_name)}
              fullWidth
              helperText={touched.last_name && errors.last_name}
              label={"Last name"}
              name="last_name"
              margin="normal"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.last_name}
              variant="outlined"
            />
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
              margin="dense"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
              variant="outlined"
            />
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
                <Typography variant="body2">
                  {"I accept the"}{" "}
                  <Link href="#">{"terms and conditions"}</Link>.
                </Typography>
              }
            />
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
              {"Create account"}
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};
