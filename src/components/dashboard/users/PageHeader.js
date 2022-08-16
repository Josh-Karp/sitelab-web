import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wait } from "src/utils/wait";
import { useAuth } from "src/hooks/useAuth";

import {
  styled,
  Grid,
  Dialog,
  DialogTitle,
  Box,
  Zoom,
  Typography,
  Button,
} from "@mui/material";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import CreateUserForm from "./actions/CreateUser";

import { fetchContacts } from "src/state/slices/contacts";
import { zoho } from "src/utils/zoho/authorize";
import { store } from "src/state/store";
import { notify } from "src/modules/notifications/slice/NotificationSlice";

function PageHeader() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleCreateUserOpen = () => {
    setOpen(true);
  };

  const handleCreateUserClose = () => {
    setOpen(false);
  };

  const submitForm = useCallback(
    async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
      try {
        const userCredential = await _createUserWithEmailAndPassword(
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();

        await axiosFirebase.put(`/user/update?idToken=${idToken}`, {
          displayName: `${first_name} ${last_name}`,
        });

        resetForm();
        setStatus({ success: true });
        setSubmitting(false);

        dispatch(
          notify({
            message: "Created user successfully.",
            variant: "success",
          })
        );
        setOpen(false);
        
      } catch (err) {
        console.error(err);
        setStatus({ success: false });
        setErrors({ submit: err.message });
        setSubmitting(false);

        dispatch(
          notify({
            message: "Failed to create user.",
            variant: "error",
          })
        );
      }
    },
    []
  );

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {"Users Management"}
          </Typography>
          <Typography variant="subtitle2">
            {
              "All aspects related to the app users can be managed from this page"
            }
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{
              mt: { xs: 2, sm: 0 },
            }}
            onClick={handleCreateUserOpen}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            {"Create user"}
          </Button>
        </Grid>
      </Grid>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleCreateUserClose}
      >
        <DialogTitle
          sx={{
            p: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            {"Add new user"}
          </Typography>
          <Typography variant="subtitle2">
            {
              "Fill in the fields below to create and add a new user to the site"
            }
          </Typography>
        </DialogTitle>
        <CreateUserForm
          onSubmit={submitForm}
          handleClose={handleCreateUserClose}
        />
      </Dialog>
    </>
  );
}

export default PageHeader;
