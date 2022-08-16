// import "../src/styles/globals.scss";

import ThemeProvider from "src/theme/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import createEmotionCache from "src/createEmotionCache";

import { useEffect, useState } from "react";
import { store, wrapper } from "src/state/store";
import { CacheProvider } from "@emotion/react";
import { Provider as ReduxProvider } from "react-redux";
import { AuthConsumer, AuthProvider } from "src/context/FirebaseAuthContext";
import { SidebarProvider } from "src/context/SidebarContext";
import { Notification } from "src/modules/notifications/Notification";

import Loader from "src/components/__elements/Loader";
import { Router } from "next/router";

import { injectStore } from "src/utils/zoho/axiosZoho";
injectStore(store);

const clientSideEmotionCache = createEmotionCache();

function App({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
  const [loading, setLoading] = useState(false);
  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };

    const end = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <ReduxProvider store={store}>
        <SidebarProvider>
          <ThemeProvider>
            <AuthProvider>
              <CssBaseline />
              <AuthConsumer>
                {(auth) =>
                  !auth.isInitialized | loading ? (
                    <Loader />
                  ) : (
                    getLayout(<Component {...pageProps} />)
                  )
                }
              </AuthConsumer>
              <Notification />
            </AuthProvider>
          </ThemeProvider>
        </SidebarProvider>
      </ReduxProvider>
    </CacheProvider>
  );
}

export default wrapper.withRedux(App);
