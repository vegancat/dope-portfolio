import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import _ from "lodash";
import Link from "next/link";
import { useAccount, useNetwork } from "wagmi";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import iconBrokenNFTImage from "../public/icon-nft-broken-image.png";
import Activity from "../components/Activity";

type Props = {};

export default function Nft({}: Props) {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const router = useRouter();
  const [fetchedNftData, setFetchedNftData] = useState<any>({});
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  const { contractAddress, tokenId } = router.query;

  const chainNameFormattedForAPI = useMemo(() => {
    if (_.isNil(chain)) {
      return "ethereum";
    }

    switch (chain.id) {
      case 1:
        return "ethereum";
      case 5:
        return "goerli";
      case 137:
        return "polygon";

      default:
        return "ethereum";
    }
  }, [chain]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "4e02115c-3728-4e97-a0c0-93fd32327b6c",
      },
    };

    fetch(
      `https://api.nftport.xyz/v0/nfts/${contractAddress}/${tokenId}?chain=${chainNameFormattedForAPI}&refresh_metadata=false`,
      options
    )
      .then((response) => response.json())
      .then((response) => setFetchedNftData(response))
      .catch((err) => console.error(err));

    const activityOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "4e02115c-3728-4e97-a0c0-93fd32327b6c",
      },
    };

    fetch(
      `https://api.nftport.xyz/v0/transactions/nfts/${contractAddress}/${tokenId}?chain=${chainNameFormattedForAPI}`,
      activityOptions
    )
      .then((response) => response.json())
      .then((response) => setRecentActivity(response.transactions))
      .catch((err) => console.error(err));
  }, [chainNameFormattedForAPI, contractAddress, tokenId]);

  let nftImageUrl = iconBrokenNFTImage;
  let nftName = "Not provided";
  let nftContractName = "Not provided";
  let nftSymbol = "Not provided";

  if (
    !_.isNil(fetchedNftData.nft) &&
    !_.isNil(fetchedNftData.nft.metadata) &&
    !_.isNil(fetchedNftData.nft.metadata.image)
  ) {
    nftImageUrl = fetchedNftData.nft.metadata.image;
  }
  if (
    !_.isNil(fetchedNftData.nft) &&
    !_.isNil(fetchedNftData.nft.metadata) &&
    !_.isNil(fetchedNftData.nft.metadata.name)
  ) {
    nftName = fetchedNftData.nft.metadata.name;
  }
  if (!_.isNil(fetchedNftData.contract)) {
    nftContractName = fetchedNftData.contract.name;
    nftSymbol = fetchedNftData.contract.symbol;
  }

  const image = (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
      }}
      item
      xs={4}
    >
      <Image src={nftImageUrl} width={100} height={100} alt="NFT picture" />
      <Box>{nftName}</Box>
    </Grid>
  );
  return (
    <Box>
      <Box>{image}</Box>
      <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
        <Box sx={{ mx: 2 }}>Collection: {nftContractName}</Box>
        <Box>Token ID: {tokenId}</Box>
      </Box>

      <Typography textAlign="center" sx={{ mt: 10, mb: 2 }}>
        Recent Activities
      </Typography>
      <Box>
        {recentActivity.map((activity) => {
          return (
            <Activity key={activity.transaction_hash} activity={activity} />
          );
        })}
      </Box>
    </Box>
  );
}
