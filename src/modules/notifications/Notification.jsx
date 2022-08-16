import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Snackbar } from "./components/Snackbar";

export const Notification = () => {
  const [open, setOpen] = useState(true);
  const notification = useSelector(
    (state) => state.notificationsReducer.notification
  );

  useEffect(() => {
    setOpen(true);
  }, [notification]);

  const onCloseCallback = useCallback(
    (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    },
    [setOpen]
  );

  return (
    <>
      {notification && (
        <Snackbar
          onClose={onCloseCallback}
          open={open}
          variant={notification.variant}
          closeable={true}
        >
          {notification.message}
        </Snackbar>
      )}
    </>
  );
};
