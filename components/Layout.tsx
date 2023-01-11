import React, { PropsWithChildren } from "react";
import { Box } from "@mui/material";
import Header from "./Header";

type Props = {};

function Layout({ children }: PropsWithChildren) {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  );
}

export default Layout;
