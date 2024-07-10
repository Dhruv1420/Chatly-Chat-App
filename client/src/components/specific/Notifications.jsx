/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { Cancel, CheckCircle } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { setIsNotification } from "../../redux/reducers/misc";

const Notifications = () => {
  const { isNotification } = useSelector((state) => state.misc);
  const { data, isLoading, isError, error } = useGetNotificationsQuery();
  const dispatch = useDispatch();

  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    await acceptRequest("Accepting...", { requestId: _id, accept });
  };

  const closeHandler = () => dispatch(setIsNotification(false));

  useErrors([{ error, isError }]);

  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"35rem"}>
        <DialogTitle textAlign={"center"}>Notifications</DialogTitle>

        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.requests.length > 0 ? (
              data?.requests?.map(({ _id, sender }) => (
                <NotificationItem
                  sender={sender}
                  _id={_id}
                  key={_id}
                  handler={friendRequestHandler}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>No New Notifications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        minWidth={"25rem"}
      >
        <Avatar src={avatar} />

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

        <Stack direction={{ xs: "column", sm: "row" }}>
          <Button onClick={() => handler({ _id, accept: true })}>
            <CheckCircle />
          </Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            <Cancel />
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});
NotificationItem.displayName = "NotificationItem";

export default Notifications;
