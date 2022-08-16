import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import useSWR from "swr";

import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  styled,
  TextField,
} from "@mui/material";

import CloudUploadTwoToneIcon from "@mui/icons-material/CloudUploadTwoTone";
import { notify } from "src/modules/notifications/slice/NotificationSlice";
import { useDispatch } from "react-redux";
import Loader from "src/components/__elements/Loader";
import { ROLES } from "src/constants";
import axiosZoho from "src/utils/zoho/axiosZoho";

const Input = styled("input")({
  display: "none",
});

const AvatarWrapper = styled(Box)(
  ({ theme }) => `
  
      position: relative;
  
      .MuiAvatar-root {
        width: ${theme.spacing(16)};
        height: ${theme.spacing(16)};
      }
  `
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
      position: absolute;
      width: ${theme.spacing(6)};
      height: ${theme.spacing(6)};
      bottom: -${theme.spacing(2)};
      right: -${theme.spacing(2)};
  
      .MuiIconButton-root {
        border-radius: 100%;
        background: ${theme.colors.primary.main};
        color: ${theme.palette.primary.contrastText};
        box-shadow: ${theme.colors.shadows.primary};
        width: ${theme.spacing(6)};
        height: ${theme.spacing(6)};
        padding: 0;
    
        &:hover {
          background: ${theme.colors.primary.dark};
        }
      }
  `
);

const getContacts = async (url) => {
  const response = await axiosZoho.get("api/zoho/contacts");
  return response.data?.contacts;
};

function CreateUserForm({ onSubmit, handleClose }) {
  const dispatch = useDispatch();
  const { data: contacts, error } = useSWR("api/zoho/contacts", getContacts);

  if (error) {
    dispatch(
      notify({
        message: "Failed to fetch contacts.",
        variant: "error",
      })
    );
  }

  const initialValues = {
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    submit: null,
  };

  const validationShape = {
    username: yup.string().max(255).required("The username field is required"),
    first_name: yup
      .string()
      .max(255)
      .required("The first name field is required"),
    last_name: yup
      .string()
      .max(255)
      .required("The last name field is required"),
    email: yup
      .string()
      .email("The email provided should be a valid email address")
      .max(255)
      .required("The email field is required"),
    password: yup.string().max(255).required("The password field is required"),
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={yup.object().shape(validationShape)}
      onSubmit={onSubmit}
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
        <form onSubmit={handleSubmit}>
          <DialogContent
            dividers
            sx={{
              p: 3,
              minHeight: "300px",
            }}
          >
            {contacts ? (
              <Grid container spacing={3}>
                <Grid item xs={12} lg={7}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(touched.first_name && errors.first_name)}
                        fullWidth
                        helperText={touched.first_name && errors.first_name}
                        label={"First name"}
                        name="first_name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.first_name}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={Boolean(touched.last_name && errors.last_name)}
                        fullWidth
                        helperText={touched.last_name && errors.last_name}
                        label={"Last name"}
                        name="last_name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.last_name}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={touched.email && errors.email}
                        label={"Email address"}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="email"
                        value={values.email}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Autocomplete
                        disablePortal
                        options={contacts}
                        getOptionLabel={(options) => options.company_name}
                        renderInput={(params) => (
                          <TextField fullWidth {...params} label={"Company"} />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Autocomplete
                        disablePortal
                        options={ROLES}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            {...params}
                            label={"User role"}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={Boolean(touched.password && errors.password)}
                        fullWidth
                        margin="normal"
                        helperText={touched.password && errors.password}
                        label={"Password"}
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values.password}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={5} justifyContent="center">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                    mt={3}
                  >
                    <AvatarWrapper>
                      <Avatar
                        variant="rounded"
                        // alt={user.name}
                        // src={user.avatar}
                      />
                      <ButtonUploadWrapper>
                        <Input
                          accept="image/*"
                          id="icon-button-file"
                          name="icon-button-file"
                          type="file"
                        />
                        <label htmlFor="icon-button-file">
                          <IconButton component="span" color="primary">
                            <CloudUploadTwoToneIcon />
                          </IconButton>
                        </label>
                      </ButtonUploadWrapper>
                    </AvatarWrapper>
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <Loader />
            )}
          </DialogContent>
          <DialogActions
            sx={{
              p: 3,
            }}
          >
            <Button color="secondary" onClick={handleClose}>
              {"Cancel"}
            </Button>
            <Button
              type="submit"
              startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
              disabled={Boolean(errors.submit) || isSubmitting}
              variant="contained"
            >
              {"Add new user"}
            </Button>
          </DialogActions>
        </form>
      )}
    </Formik>
  );
}

export default CreateUserForm;
