import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../utils/theme";
import createEmotionCache from "../utils/createEmotionCache";
import { configureChains } from "@wagmi/core";
import { WagmiConfig, createClient } from "wagmi";
import { polygon, mainnet, goerli } from "@wagmi/core/chains";
import { alchemyProvider } from "@wagmi/core/providers/alchemy";
import { publicProvider } from "@wagmi/core/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import Layout from "../components/Layout";
import { SnackbarProvider } from "notistack";

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli, polygon],
  [
    alchemyProvider({ apiKey: "WT-uEeVsH8a5IClWZ-4i0gnhiOzyQSk2" }),
    alchemyProvider({ apiKey: "NYItrtM-yhuM1OxrKHftltRwF0RFJrxl" }),
    alchemyProvider({ apiKey: "1lWz10kgVkgxAtieME6FBXCArpqkrITN" }),
    publicProvider(),
  ]
);

const wagmiClient = createClient({
  autoConnect: true,
  provider: provider,
  connectors: [new MetaMaskConnector({ chains })],
  webSocketProvider: webSocketProvider,
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <WagmiConfig client={wagmiClient}>
          <SnackbarProvider maxSnack={3}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SnackbarProvider>
        </WagmiConfig>
      </ThemeProvider>
    </CacheProvider>
  );
}
