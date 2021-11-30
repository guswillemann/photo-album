import { AppProps } from 'next/app';
import { SettingsProvider } from '../src/contexts';
import '../src/styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SettingsProvider>
      <Component {...pageProps} />
    </SettingsProvider>
  );
}

export default MyApp
