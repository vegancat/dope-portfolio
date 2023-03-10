import { useEffect, FormEvent, useMemo, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import _ from "lodash";
import Link from "next/link";
import iconBrokenNFTImage from "../public/icon-nft-broken-image.png";
import { useAccount, useNetwork } from "wagmi";
import {
  Box,
  Button,
  Select,
  TextField,
  MenuItem,
  SelectChangeEvent,
  Grid,
} from "@mui/material";
import { useRouter } from "next/router";
import Activity from "../components/Activity";
import Typography from "@mui/material/Typography";

type Props = {};

export default function Dashboard({}: Props) {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const router = useRouter();
  const [inputAddress, setInputAddress] = useState<string>(
    address ? address : ""
  );
  const [searchType, setSearchType] = useState("accounts");
  const [foundNFTs, setFoundNFTs] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  const handleSearchTypeChange = (event: SelectChangeEvent) => {
    setSearchType(event.target.value as string);
  };

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

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "4e02115c-3728-4e97-a0c0-93fd32327b6c",
      },
    };

    fetch(
      `https://api.nftport.xyz/v0/${searchType}/${inputAddress}?chain=${chainNameFormattedForAPI}&page_size=15&include=metadata`,
      options
    )
      .then((response) => response.json())
      .then((response) => setFoundNFTs(response.nfts))
      .catch((err) => console.error(err));

    const recentActivityOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "4e02115c-3728-4e97-a0c0-93fd32327b6c",
      },
    };

    fetch(
      `https://api.nftport.xyz/v0/transactions/${searchType}/${inputAddress}?chain=${chainNameFormattedForAPI}&page_size=20&type=all`,
      recentActivityOptions
    )
      .then((response) => response.json())
      .then((response) => setRecentActivity(response.transactions))
      .catch((err) => console.error(err));
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          maxWidth: "40rem",
          m: "auto",
        }}
        component="form"
        onSubmit={handleSearch}
      >
        <TextField
          sx={{ flexGrow: 1, mx: 1 }}
          type="text"
          placeholder="insert your account address"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
        />
        <Select
          value={searchType}
          label="Account Type"
          onChange={handleSearchTypeChange}
        >
          <MenuItem value="accounts">Account</MenuItem>
          <MenuItem value="nfts">NFT Collection</MenuItem>
        </Select>
        <Button sx={{ mx: 1 }} type="submit" variant="contained">
          Search
        </Button>
      </Box>

      <Grid sx={{ mt: 3, px: 2 }} container>
        {foundNFTs.map((nft) => {
          let nftImageUrl = iconBrokenNFTImage;

          if (!_.isNil(nft.metadata) && !_.isNil(nft.metadata.image)) {
            nftImageUrl = nft.metadata.image;
          }

          return (
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                p: 1,
                py: 2,
              }}
              onClick={() => {
                router.push(
                  `/nft?contractAddress=${nft.contract_address}&tokenId=${nft.token_id}`
                );
              }}
              key={nft.contract_address + nft.token_id}
              item
              xs={4}
            >
              <Image
                src={nftImageUrl}
                width={100}
                height={100}
                alt="NFT picture"
              />
              <Box sx={{ mt: 2 }}>{nft.name}</Box>
            </Grid>
          );
        })}
      </Grid>

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
