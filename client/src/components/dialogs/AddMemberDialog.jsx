/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAddGroupMembersMutation,
  useMyFriendsQuery,
} from "../../redux/api/api";
import { setIsAddMember } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";

const AddMemberDialog = ({ chatId }) => {
  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);
  const { data, isLoading, isError, error } = useMyFriendsQuery(chatId);
  const [addGroupMembers, isLoadingAddGroupMembers] = useAsyncMutation(
    useAddGroupMembersMutation
  );

  const [selectedMembers, setSelectedMembers] = useState([]);

  useErrors([{ isError, error }]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currEle) => currEle !== id)
        : [...prev, id]
    );
  };

  const addMemberSubmitHandler = () => {
    addGroupMembers("Adding Members...", { chatId, members: selectedMembers });
    closeHandler();
  };

  const closeHandler = () => dispatch(setIsAddMember(false));

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"1rem"} width={"25rem"} spacing={"1rem"}>
        <DialogTitle textAlign={"center"}>Add Member(s)</DialogTitle>

        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : data?.friends?.length > 0 ? (
            data?.friends?.map((i) => (
              <UserItem
                key={i._id}
                user={i}
                isMember
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button onClick={closeHandler} color="error">
            Cancel
          </Button>
          <Button
            onClick={addMemberSubmitHandler}
            variant="contained"
            disabled={isLoadingAddGroupMembers}
          >
            Save Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
