import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useAuth } from "src/hooks/useAuth";
import { Slide } from "@mui/material";
import { notify } from "src/modules/notifications/slice/NotificationSlice";

export const Authenticated = (props) => {
  const { children } = props;
  const auth = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!auth.isAuthenticated) {
      router.push({
        pathname: "/auth/login",
        query: { backTo: router.asPath },
      });
    } else {
      setVerified(true);
    }
  }, [router.isReady]);

  if (!verified) {
    return null;
  }

  return <>{children}</>;
};

Authenticated.propTypes = {
  children: PropTypes.node,
};
