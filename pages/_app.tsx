import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.less'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp
