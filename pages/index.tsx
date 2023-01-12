import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import _ from "lodash";
import { Inter } from "@next/font/google";
import { useAccount, useNetwork } from "wagmi";
import { Box } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!_.isNil(chain) && (
        <>
          <Box>connected to {chain.network + " " + chain.id}</Box>
          <Box>Home Page</Box>

          <Link href="/dashboard">Dashboard</Link>
          <Link href="/collection">Collection</Link>
          <Link href="/explore">Explore</Link>
          <Link href="/livestream">Live Stream</Link>
        </>
      )}
    </>
  );
}
