import '@/styles/globals.css'
import { StoreProvider } from '@/utils/Store';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

const clientSideEmotionCache = createCache({ key: 'css' });

function App({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
  return (
    <CacheProvider value={emotionCache}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </CacheProvider>
  )
}

export default App;
