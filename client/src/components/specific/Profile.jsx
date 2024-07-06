/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { Avatar, Stack, Typography } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalenderIcon,
} from "@mui/icons-material";
import moment from "moment";

const Profile = () => {
  return (
    <Stack spacing={"1rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        sx={{
          width: 175,
          height: 175,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "4px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={"ascbhasbc"} />
      <ProfileCard
        heading={"Username"}
        text={"dhruvgupta"}
        Icon={<UserNameIcon />}
      />
      <ProfileCard heading={"Name"} text={"Dhruv Gupta"} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"Joined"}
        text={moment("2024-07-01T15:21:01.161Z").fromNow()}
        Icon={<CalenderIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && Icon}
    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color={"gray"} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
