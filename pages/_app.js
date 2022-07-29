import "../styles/globals.scss";

import { createStore } from "../components/store";
import { Provider } from "react-redux";
import { Notification } from "../modules/notifications/Notification";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const store = createStore();

  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
      <Notification />
    </Provider>
  );
}
