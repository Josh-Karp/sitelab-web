import React, { useCallback, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import { FormGroup, MenuItem } from "@mui/material";
import { notify } from "../../../../modules/notifications/slice/NotificationSlice";
import { useDispatch } from "react-redux";

const WEB_DEVELOPMENT = [
  { value: "WordPress", label: "WordPress" },
  { value: "Front-end/HTML", label: "Front-end/HTML" },
  { value: "Shopify", label: "Shopify" },
  { value: "Others", label: "Others" },
];

const phoneValidation = /^[0-9]{3}[0-9]{3}[0-9]{4}$/;

const validationSchema = {
  name: yup.string().required("Required"),
  email: yup.string().email().required("Required"),
  phone: yup
    .string()
    .matches(phoneValidation, "Phone number is not valid")
    .required("Required"),
  checkbox: yup.array().required("Please select a service"),
  requirements: yup.string().required("Required"),
};

const initialValues = {
  name: "",
  email: "",
  phone: "",
  checkbox: [],
  requirements: "",
};

export const Contact = () => {
  const dispatch = useDispatch();

  const submitForm = useCallback(
    async (values, formActions) => {
      values.checkbox.filter((e) => e);

      try {
        const res = await fetch("/api/mail", {
          method: "post",
          body: JSON.stringify(values),
        });

        if (res.status !== 200) {
          throw Error(res.statusText);
        }

        dispatch(
          notify({
            message: "Enquiry form sent",
            variant: "success",
          })
        );
      } catch (error) {
        dispatch(
          notify({
            message: "Failed to send",
            variant: "error",
          })
        );
      } finally {
        formActions.resetForm();
        formActions.setSubmitting(false);
      }
    },
    [dispatch]
  );

  const StyledTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#ff4f6e",
      },
    },
    flex: "1 0 240px",
    div: {
      borderRadius: "10px",
      color: "#8993AD",
      fontFamily: "inherit",
      width: "100%",
    },
    label: {
      fontFamily: "inherit",
      color: "#8993AD",
      "&.Mui-focused": { color: "#ff4f6e" },
    },
    input: {
      padding: "8.5px 0px",
      width: "90%",
    },
  });

  const StyledCheckbox = styled(Checkbox)({
    "&.MuiCheckbox-root": {
      "&.Mui-checked": {
        color: "#ff4f6e",
      },
    },
  });

  const StyledButton = styled(Button)({
    padding: "1em 2em",
    fontWeight: "500",
    fontSize: "22px",
    lineHeight: "16px",
    backgroundColor: "#ff4f6e",
    marginTop: "2em",
    borderRadius: "14px",
    textTransform: "unset",

    "&:hover": {
      backgroundColor: "#ff4f6e",
      opacity: "0.8",
    },
  });

  const Webchildren = (setFieldValue) => {
    return (
      <Box
        sx={{
          textAlign: "start",
          alignItems: "flex-start",
          maxWidth: "15em",
          "& .MuiSelect-select": {
            width: "12ch",
            paddingTop: "10px",
            color: "#8993AD",
          },
          "> p": { marginBottom: "0.85em", fontSize: "14px" },
          div: {
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#ff4f6e",
              },
            },
          },
        }}
      >
        <p>What is your preferred web development technology/CMS?</p>
        <TextField
          required
          id="web-development-select"
          select
          onChange={(event) => {
            setFieldValue("checkbox.2", event.target.value);
          }}
          size="small"
        >
          {WEB_DEVELOPMENT.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    );
  };

  const SEOChildren = (setFieldValue) => {
    return (
      <Box
        sx={{
          textAlign: "start",
          alignItems: "flex-start",
          "& .MuiSelect-select": { width: "12ch", paddingTop: "10px" },
          "> p": { marginBottom: "0.85em", fontSize: "14px" },
          div: { borderRadius: "10px", flex: "unset" },
        }}
      >
        <p>Mention the website for which you need SEO</p>
        <StyledTextField
          required
          fullWidth
          id="seo"
          label="Text here"
          name="seo"
          size="small"
          onChange={(event) => {
            setFieldValue("checkbox.1", event.target.value);
          }}
          sx={{
            flex: "unset",
          }}
        />
      </Box>
    );
  };

  return (
    <Container
      component="div"
      maxWidth={false}
      sx={{
        paddingBlock: "100px",
        background: "var(--theme-light-border)",
        margin: "unset",
      }}
    >
      <CssBaseline />
      <h2>Get In Touch</h2>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={yup.object().shape(validationSchema)}
          onSubmit={submitForm}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            setFieldValue,
            resetForm,
          }) => (
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Box component="div" sx={{ flexFlow: "row wrap", gap: "2em" }}>
                <StyledTextField
                  required
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  size="small"
                  value={values.name}
                  onChange={handleChange("name")}
                  error={touched.name && Boolean(errors.name)}
                />
                <StyledTextField
                  required
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  size="small"
                  value={values.email}
                  onChange={handleChange("email")}
                  error={touched.email && Boolean(errors.email)}
                />
                <StyledTextField
                  required
                  name="phone"
                  label="Phone"
                  type="phone"
                  id="phone"
                  autoComplete="phone"
                  size="small"
                  value={values.phone}
                  onChange={handleChange("phone")}
                  error={touched.phone && Boolean(errors.phone)}
                />
              </Box>
              <FormGroup
                sx={{
                  flexFlow: "row wrap",
                  my: "2em",
                  alignItems: "flex-start",
                  gap: "2em",
                  span: {
                    fontFamily: "inherit",
                    color: "#8993AD",
                  },
                  ["@media (max-width:768px)"]: {
                    justifyContent: "flex-start",
                    flexFlow: "column wrap",
                  },
                }}
              >
                <FormControlLabel
                  control={<StyledCheckbox />}
                  label="Social Media Marketing"
                  name="smm"
                  onChange={(event) => {
                    const value = event.target.checked ? "ssm" : null;
                    setFieldValue("checkbox.0", value);
                  }}
                />
                <div style={{ alignItems: "flex-start" }}>
                  <FormControlLabel
                    label="SEO Services"
                    control={
                      <StyledCheckbox
                        name="seo"
                        onChange={(event) => {
                          const value = event.target.checked ? "seo" : null;
                          setFieldValue("checkbox.1", value);
                        }}
                        error={touched.seo && Boolean(errors.seo)}
                      />
                    }
                  />
                  {values.checkbox[1] ? SEOChildren(setFieldValue) : null}
                </div>
                <div style={{ alignItems: "flex-start" }}>
                  <FormControlLabel
                    label="Web Development Services"
                    control={
                      <StyledCheckbox
                        name="web"
                        onChange={(event) => {
                          const value = event.target.checked ? "web" : null;
                          setFieldValue("checkbox.2", value);
                        }}
                        error={touched.checkbox && Boolean(errors.checkbox)}
                      />
                    }
                  />
                  {values.checkbox[2] ? Webchildren(setFieldValue) : null}
                </div>
                <FormControlLabel
                  control={<StyledCheckbox />}
                  label="Other"
                  name="Other"
                  onChange={(event) => {
                    const value = event.target.checked ? "other" : null;
                    setFieldValue("checkbox.3", value);
                  }}
                />
              </FormGroup>
              <Box component="div" sx={{ flexFlow: "row", gap: "2em" }}>
                <StyledTextField
                  required
                  fullWidth
                  name="requirements"
                  label="Share your requirements"
                  type="text"
                  id="requirements"
                  size="small"
                  placeholder="(You can add links to your shareable materials if any)"
                  multiline
                  value={values.requirements}
                  onChange={handleChange("requirements")}
                  error={touched.requirements && Boolean(errors.requirements)}
                />
              </Box>
              <span className="form-error">
                {errors.checkbox && touched.checkbox && errors.checkbox}
              </span>
              <StyledButton type="submit" variant="contained">
                Submit
              </StyledButton>
            </Box>
          )}
        </Formik>
      </Box>
    </Container>
  );
};
