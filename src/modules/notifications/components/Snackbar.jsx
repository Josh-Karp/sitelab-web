import clsx from "clsx";
import PropTypes from "prop-types";
import React, { Fragment, useCallback } from "react";

import {
  IconButton,
  Snackbar as MUISnackbar,
  SnackbarContent,
} from "@mui/material";

import { CheckCircle, Close, Error, Info, Warning } from "@mui/icons-material";

import styles from "./Snackbar.module.css";
import { SNACKBAR_DURATION, SNACKBAR_TYPES } from "./SnackBarConstants";

const variantAutoHideDuration = {
  [SNACKBAR_DURATION.SUCCESS]: 10000,
  [SNACKBAR_DURATION.SUCCESSFIXED]: null,
  [SNACKBAR_DURATION.WARNING]: 4000,
  [SNACKBAR_DURATION.ERROR]: 6000,
  [SNACKBAR_DURATION.INFO]: 3000,
};

const iconMap = {
  [SNACKBAR_TYPES.SUCCESS]: CheckCircle,
  [SNACKBAR_TYPES.SUCCESSFIXED]: CheckCircle,
  [SNACKBAR_TYPES.WARNING]: Warning,
  [SNACKBAR_TYPES.ERROR]: Error,
  [SNACKBAR_TYPES.INFO]: Info,
};

export const Snackbar = ({
  className,
  message,
  onClose,
  open,
  variant,
  closeable,
  children,
  ...props
}) => {
  const Icon = iconMap[variant];

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  return (
    <MUISnackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={variantAutoHideDuration[variant]}
      onClose={onClose}
      role="alert"
    >
      <SnackbarContent
        className={clsx(styles[variant], className, styles.content)}
        aria-describedby={`${variant}-snackbar`}
        message={
          <span id="client-snackbar" className={styles.message}>
            <Icon className={clsx(styles.icon, styles.variant)} />
            {children}
          </span>
        }
        action={
          closeable && [
            <IconButton
              key="close"
              aria-label={`${variant}-snackbar-close`}
              color="inherit"
              className={styles.close}
              onClick={handleClose}
            >
              <Close className={styles.icon} />
            </IconButton>,
          ]
        }
        {...props}
      />
    </MUISnackbar>
  );
};

Snackbar.variants = SNACKBAR_TYPES;

Snackbar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  variant: PropTypes.oneOf([
    SNACKBAR_TYPES.SUCCESS,
    SNACKBAR_TYPES.SUCCESSFIXED,
    SNACKBAR_TYPES.WARNING,
    SNACKBAR_TYPES.ERROR,
    SNACKBAR_TYPES.INFO,
  ]).isRequired,
  closeable: PropTypes.bool,
};

Snackbar.defaultProps = {
  className: "",
  onClose: null,
  open: false,
  variant: SNACKBAR_TYPES.SUCCESS,
  closeable: true,
};
