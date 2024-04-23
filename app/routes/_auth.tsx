import { Outlet } from "@remix-run/react";

import { Box, Flex, Grid } from "@radix-ui/themes";

import { PanelBackgroundImage } from "~/shared/components/panel-background-image";

export default function AccountIndex() {
  return (
    <Box width="auto" height="100vh">
      <Grid columns={{ initial: "1", lg: "2" }} gap="0">
        <Flex
          align="center"
          justify="center"
          position="relative"
          height={{ initial: "100vh" }}
          py={{ initial: "7", xs: "9", sm: "100px" }}
          px={{ initial: "4", sm: "6" }}
          style={{
            boxShadow: "var(--shadow-3)",
          }}
        >
          <Flex
            align="center"
            justify="center"
            overflow="hidden"
            position="absolute"
            inset="0"
          >
            <PanelBackgroundImage id="1" width="1000px" height="1000px" />
          </Flex>
          <Outlet />
        </Flex>
        <Box
          style={{
            background: "var(--color-background)",
          }}
          height={{ initial: "100vh" }}
        ></Box>
      </Grid>
    </Box>
  );
}
