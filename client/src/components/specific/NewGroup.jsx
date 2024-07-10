import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { useMyFriendsQuery, useNewGroupMutation } from "../../redux/api/api";
import { setIsNewGroup } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";

const NewGroup = () => {
  const { isNewGroup } = useSelector((state) => state.misc);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { data, isError, error, isLoading, refetch } = useMyFriendsQuery();
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const groupName = useInputValidation("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const errors = [{ isError, error }];
  useErrors(errors);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  const selectFriendHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((curr) => curr !== id) : [...prev, id]
    );
  };

  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");
    if (selectedMembers.length < 2)
      return toast.error("Please Select Atleast 2 Members");

    newGroup("Creating Group...", {
      name: groupName.value,
      members: selectedMembers,
    });

    closeHandler();
  };

  const closeHandler = () => dispatch(setIsNewGroup(false));

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} width={"30rem"} spacing={"1rem"}>
        <DialogTitle textAlign={"center"} variant="h5">
          New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />

        {data?.friends.length > 0 ? (
          <Typography paddingLeft={"1rem"} variant="body1">
            Members
          </Typography>
        ) : (
          <Typography paddingLeft={"1rem"} variant="body1">
            No Friends Yet
          </Typography>
        )}

        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((user) => (
              <UserItem
                user={user}
                key={user._id}
                handler={selectFriendHandler}
                isAdded={selectedMembers.includes(user._id)}
              />
            ))
          )}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button
            variant="text"
            color="error"
            size="large"
            onClick={closeHandler}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={submitHandler}
            disabled={isLoadingNewGroup}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
