/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import { transformImg } from "../../lib/features";

const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup
        max={max}
        sx={{
          position: "relative",
        }}
      >
        <Box width={"5rem"} height={"3rem"}>
          {avatar.map((i, index) => (
            <Avatar
              key={Math.random() * 100}
              src={transformImg(i)}
              alt={`Avatar ${index}`}
              style={{
                width: "3rem",
                height: "3rem",
                position: "absolute",
                marginLeft: `${index+0.5}rem`,
              }}
            />
          ))}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;
