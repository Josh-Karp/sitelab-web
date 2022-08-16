import React, { useEffect, useState } from "react";
import useSWR from "swr";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";

import { useAuth } from "src/hooks/useAuth";
import { notify } from "src/modules/notifications/slice/NotificationSlice";
import Loader from "src/components/__elements/Loader";
import { ROLES } from "src/constants";
import axiosZoho from "src/utils/zoho/axiosZoho";

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

function SetClaimsForm({ onSubmit, handleClose }) {
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
    role: "",
    company: {
      name: "",
      id: "",
    },
  };

  const validationShape = {
    role: yup.string(),
    company: yup.object(),
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
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <DialogContent
            dividers
            sx={{
              px: 3,
              py: 6,
            }}
          >
            {contacts ? (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    options={ROLES}
                    onChange={(event, value) => {
                      setFieldValue("role", value?.value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        onChange={handleChange}
                        value={values?.role}
                        label={"User role"}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    options={contacts}
                    onChange={(event, value) => {
                      setFieldValue("company", {
                        name: value?.company_name,
                        id: value?.contact_id,
                      });
                    }}
                    getOptionLabel={(options) => options.company_name}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        onChange={handleChange}
                        value={values?.company}
                        label={"Company"}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            ) : (
              <Loader size="md" />
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
              {"Update"}
            </Button>
          </DialogActions>
        </form>
      )}
    </Formik>
  );
}

export default SetClaimsForm;
