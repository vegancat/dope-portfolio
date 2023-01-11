import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import _ from "lodash";
import Link from "next/link";

import { useAccount, useNetwork } from "wagmi";
import { Box, Button } from "@mui/material";

type Props = {};

export default function Dashboard({}: Props) {
  return (
    <Box>
      <Box>input for address</Box>
      <Box>search type (collection/address)</Box>
      <Button>Search</Button>

      <Box>Content found</Box>
    </Box>
  );
}
