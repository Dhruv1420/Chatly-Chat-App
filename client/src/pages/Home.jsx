/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { Box, Typography } from "@mui/material";
import AppLayout from "../components/layout/AppLayout";
import { grayColor } from "../constants/color";

const Home = () => {
  return (
    <Box bgcolor={grayColor} height={"100%"}>
      <Typography p={"2rem"} variant="h5" textAlign={"center"}>
        Select a Friend to Chat
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
