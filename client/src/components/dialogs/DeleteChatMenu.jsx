/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {
  Delete as DeleteIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import {
  Backdrop,
  Button,
  Menu,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAsyncMutation } from "../../hooks/hook";
import {
  useDeleteChatMutation,
  useLeaveGroupMutation,
} from "../../redux/api/api";
import { setIsDeleteMenu } from "../../redux/reducers/misc";
const ConfirmDialog = lazy(() => import("../dialogs/ConfirmDialog"));

const DeleteChatMenu = ({ dispatch, dltAnchor }) => {
  const navigate = useNavigate();
  const { isDeleteMenu, selectedDeleteChat } = useSelector(
    (state) => state.misc
  );

  const [deleteChat, isLoadingDeleteChat, deleteChatData] = useAsyncMutation(
    useDeleteChatMutation
  );
  const [leaveGroup, isLoadingLeaveGroup, leaveGroupData] = useAsyncMutation(
    useLeaveGroupMutation
  );

  const [confirmDialog, setConfirmDialog] = useState(false);
  let message = `Are you sure you want to `;
  if (selectedDeleteChat.groupChat) message += `Leave group?`;
  else message += `Delete chat?`;

  const openConfirmHandler = () => setConfirmDialog(true);
  const closeConfirmHandler = () => setConfirmDialog(false);

  const deleteHandler = (groupChat) => {
    closeHandler();
    closeConfirmHandler();
    if (!groupChat) deleteChat("Deleting Chat...", selectedDeleteChat.chatId);
    else leaveGroup("Leaving Group...", selectedDeleteChat.chatId);
  };

  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    dltAnchor.current = null;
  };

  useEffect(() => {
    if (deleteChatData || leaveGroupData) navigate("/");
  }, [deleteChatData, leaveGroupData, navigate]);

  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={dltAnchor.current}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      {isLoadingDeleteChat || isLoadingLeaveGroup ? (
        <Skeleton />
      ) : (
        <Button
          color="error"
          sx={{
            width: "11rem",
            padding: "0.5rem",
          }}
          onClick={openConfirmHandler}
        >
          {selectedDeleteChat.groupChat ? (
            <Stack direction={"row"} alignItems={"center"} spacing={"0.5rem"}>
              <ExitToAppIcon />
              <Typography>Leave Group</Typography>
            </Stack>
          ) : (
            <Stack direction={"row"} alignItems={"center"} spacing={"0.5rem"}>
              <DeleteIcon />  
              <Typography>Delete Chat</Typography>
            </Stack>
          )}
        </Button>
      )}

      {confirmDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDialog
            open={confirmDialog}
            handleClose={closeConfirmHandler}
            deleteHandler={() => deleteHandler(selectedDeleteChat.groupChat)}
            message={message}
          />
        </Suspense>
      )}
    </Menu>
  );
};

export default DeleteChatMenu;
