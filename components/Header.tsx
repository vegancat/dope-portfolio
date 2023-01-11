import React, { useMemo } from "react";
import { Avatar, Box, Button } from "@mui/material";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
  useEnsAvatar,
} from "wagmi";
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask";
import _ from "lodash";
import { pkShortener } from "../utils/helpers";

type Props = {};

const Header = (props: Props) => {
  const { address, isConnected, connector } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });
  const { disconnect } = useDisconnect();

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

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>Logo</Box>
      <Box sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!isConnected && (
            <Button
              onClick={async () => {
                connect();
              }}
              sx={{ marginRight: "1rem" }}
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
                <Button sx={{ marginRight: "1rem" }}>
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
                <Avatar sx={{ marginRight: "1rem" }} src="icon-polygon.png" />
              )}

              <Button onClick={() => disconnect()} sx={{ marginRight: "1rem" }}>
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
