/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useState } from "react";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currEle) => currEle !== id)
        : [...prev, id]
    );
  };

  const addMemberSubmitHandler = () => {
    closeHandler();
  };

  const closeHandler = () => {
    setMembers([]);
    setSelectedMembers([]);
  };

  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={"1rem"} width={"25rem"} spacing={"1rem"}>
        <DialogTitle textAlign={"center"}>Add Member(s)</DialogTitle>

        <Stack>
          {members.length > 0 ? (
            members.map((i) => (
              <UserItem
                key={i._id}
                user={i}
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
          <Button onClick={addMemberSubmitHandler} variant="contained">
            Save Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
