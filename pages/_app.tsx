import { AppProps } from 'next/app';
import { SEO } from '../src/components';
import { SettingsProvider } from '../src/contexts';
import '../src/styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SettingsProvider>
      <SEO />
      <Component {...pageProps} />
    </SettingsProvider>
  );
}

export default MyApp
