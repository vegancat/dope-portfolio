import { Box, Grid } from "@mui/material";
import Image from "next/image";
import React from "react";
import saleIcon from "../public/icons8-cash-in-hand-96.png";
import transferIcon from "../public/icons8-data-transfer-100.png";
import delistIcon from "../public/icons8-remove-tag-64.png";
import mintIcon from "../public/icons8-coin-96.png";
import Link from "next/link";
import explorerIcon from "../public/icons8-explorer-block-64.png";
import { pkShortener } from "../utils/helpers";
import { useAccount } from "wagmi";

type Props = {
  activity: any;
};

const Activity = ({ activity }: Props) => {
  const { address } = useAccount();

  const pkProcessor = (rawPk: string) => {
    if (rawPk == address) {
      return "You";
    } else {
      return pkShortener(rawPk);
    }
  };

  let activityIcon = null;
  switch (activity.type) {
    case "sale":
      activityIcon = (
        <Image src={saleIcon} width={40} height={40} alt="sale icon" />
      );
      break;

    case "transfer":
      activityIcon = (
        <Image src={transferIcon} width={40} height={40} alt="transfer icon" />
      );
      break;

    case "cancel_list":
      activityIcon = (
        <Image src={delistIcon} width={40} height={40} alt="cancel list icon" />
      );
      break;

    case "mint":
      activityIcon = (
        <Image src={mintIcon} width={40} height={40} alt="mint icon" />
      );
      break;

    default:
      activityIcon = (
        <Image src={transferIcon} width={40} height={40} alt="transfer icon" />
      );
      break;
  }

  let body = null;

  switch (activity.type) {
    case "sale":
      body = (
        <>
          <Box>{pkProcessor(activity.seller_address)}</Box>
          <Box>{"-->"}</Box>
          <Box>{pkProcessor(activity.buyer_address)}</Box>
        </>
      );
      break;

    case "transfer":
      body = (
        <>
          <Box>{pkProcessor(activity.transfer_from)}</Box>
          <Box>{"-->"}</Box>
          <Box>{pkProcessor(activity.transfer_to)}</Box>
        </>
      );
      break;

    case "cancel_list":
      body = <Box>{pkProcessor(activity.lister_address)}</Box>;

    case "mint":
      body = <Box>{pkProcessor(activity.owner_address)}</Box>;
    default:
      body = (
        <>
          <Box>someone</Box>
          <Box>{"-->"}</Box>
          <Box>someone</Box>
        </>
      );
      break;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "40rem",
        m: "auto",
      }}
    >
      <Box>{activityIcon}</Box>
      <Box
        sx={{ flexGrow: 1, display: "flex", justifyContent: "space-around" }}
      >
        {body}
      </Box>
      <Box>
        <Link
          href={`https://etherscan.io/tx/${activity.transaction_hash}`}
          target="_blank"
        >
          <Image
            src={explorerIcon}
            width={20}
            height={20}
            alt="explorer icon"
          />
        </Link>
      </Box>
    </Box>
  );
};

export default Activity;
