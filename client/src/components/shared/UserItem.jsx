/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import {
  Avatar,
  Backdrop,
  IconButton,
  ListItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { lazy, memo, Suspense, useState } from "react";
import { transformImg } from "../../lib/features";
const ConfirmDialog = lazy(() => import("../dialogs/ConfirmDialog"));

const UserItem = ({
  user,
  handler,
  handlerIsLoading,
  isAdded = false,
  isMember = false,
  styling = {},
}) => {
  const [confirmDialog, setConfirmDialog] = useState(false);
  const { name, _id, avatar } = user;

  const openConfirmHandler = () => setConfirmDialog(true);
  const closeConfirmHandler = () => setConfirmDialog(false);

  const deleteHandler = () => {
    handler(_id);
    closeConfirmHandler();
  };

  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        {...styling}
      >
        <Avatar src={transformImg(avatar)} />

        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {name}
        </Typography>

        <IconButton
          size="small"
          sx={{
            bgcolor: isAdded ? "error.main" : "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: isAdded ? "error.dark" : "primary.dark",
            },
          }}
          disabled={handlerIsLoading}
        >
          {isAdded ? (
            <Tooltip title={"Remove Member"}>
              <RemoveIcon onClick={openConfirmHandler} />
            </Tooltip>
          ) : (
            <Tooltip title={isMember ? "Add Member" : "Add Friend"}>
              <AddIcon onClick={() => handler(_id)} />
            </Tooltip>
          )}
        </IconButton>

        {confirmDialog && (
          <Suspense fallback={<Backdrop open />}>
            <ConfirmDialog
              open={confirmDialog}
              handleClose={closeConfirmHandler}
              deleteHandler={deleteHandler}
              message={"Are you sure you want to remove this member?"}
            />
          </Suspense>
        )}
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
