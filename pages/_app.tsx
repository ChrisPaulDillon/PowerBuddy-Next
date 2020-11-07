import { Box } from "@chakra-ui/core";
import React, { Component } from "react";

const MyApp = ({ Component }) => {
  return (
    <Box>
      hi this is shared
      <Component compo />
    </Box>
  );
};

export default MyApp;
