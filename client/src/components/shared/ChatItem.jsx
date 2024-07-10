/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { memo } from "react";
import { Link } from "../styles/StyledComponents";
import AvatarCard from "./AvatarCard";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      sx={{
        padding: "0",
      }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0.7rem",
          gap: groupChat ? "2rem" : "1rem",
          backgroundColor: sameSender ? "rgba(0,0,0,0.2)" : "unset",
          color: sameSender ? "black" : "unset",
          position: "relative",
        }}
      >
        <AvatarCard avatar={avatar} />

        <Stack>
          <Typography>{name}</Typography>
          {newMessageAlert && (
            <Typography>{newMessageAlert.count} New Message</Typography>
          )}
        </Stack>

        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);
