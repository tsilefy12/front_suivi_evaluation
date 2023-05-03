import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import ThemeProvider from "../context/themeProvider";
import { ConfirmProvider } from "material-ui-confirm";
import AuthProvider from "../redux/features/auth/AuthProvider";
import NotificationProvider from "../redux/features/notification/NotificationProvider";
import { SnackbarProvider } from "notistack";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ConfirmProvider>
          <AuthProvider>
            <SnackbarProvider>
              <NotificationProvider></NotificationProvider>
              <Component {...pageProps} />
            </SnackbarProvider>
          </AuthProvider>
        </ConfirmProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
