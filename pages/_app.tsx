import type { AppProps } from 'next/app'
import { Provider } from "react-redux";
import { store } from '../redux/store';
import ThemeProvider from '../context/themeProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
