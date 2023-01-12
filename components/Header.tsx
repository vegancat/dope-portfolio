import React, { useMemo } from "react";
import { Avatar, Box, Button } from "@mui/material";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
  useEnsAvatar,
  useNetwork,
} from "wagmi";
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask";
import _ from "lodash";
import { pkShortener } from "../utils/helpers";
import Image from "next/image";
import logo from "../public/icons8-portfolio-64.png";
import ethIcon from "../public/icons8-ethereum-96.png";
import { useRouter } from "next/router";

type Props = {};

const Header = (props: Props) => {
  const { chain } = useNetwork();
  const { address, isConnected, connector } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const chainLogo = useMemo(() => {
    if (_.isNil(chain)) return;

    if (chain.id === 137) {
      return "icon-polygon.png";
    } else {
      return "icons8-ethereum-96.png";
    }
  }, [chain]);

  const {
    data: ensName,
    isError: ensNameError,
    isLoading: ensNameLoading,
  } = useEnsName({
    address,
  });

  const {
    data: ensAvatar,
    isError: ensAvatarError,
    isLoading: ensAvatarLoading,
  } = useEnsAvatar({
    address,
  });

  // Todo: conditional logos and content for connected chains
  return (
    <Box
      sx={{
        maxWidth: "70rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mx: "auto",
        mb: 4,
      }}
    >
      <Box
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Image
          onClick={() => router.push("/")}
          src={logo}
          width={50}
          height={50}
          alt="logo"
        />
      </Box>
      <Box sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!isConnected && (
            <Button
              onClick={async () => {
                connect();
              }}
              sx={{ marginRight: "1rem" }}
              variant="contained"
            >
              Connect
            </Button>
          )}
          {isConnected && (
            <>
              {!_.isNil(ensName) && (
                <Button sx={{ marginRight: "1rem" }}>{ensName}</Button>
              )}
              {_.isNil(ensName) && (
                <Button sx={{ marginRight: "1rem" }} variant="outlined">
                  {
                    // address is available because we are connected
                  }
                  {pkShortener(address!, 3)}
                </Button>
              )}

              {!_.isNil(ensAvatar) && (
                <Avatar sx={{ marginRight: "1rem" }} src={ensAvatar} />
              )}
              {_.isNil(ensAvatar) && (
                <Avatar sx={{ marginRight: "1rem" }} src={chainLogo} />
              )}

              <Button
                variant="contained"
                onClick={() => disconnect()}
                sx={{ marginRight: "1rem" }}
              >
                Disconnect
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
