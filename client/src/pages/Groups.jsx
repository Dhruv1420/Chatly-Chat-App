/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackSpaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Suspense, lazy, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LayoutLoader } from "../components/layout/Loaders";
import AvatarCard from "../components/shared/AvatarCard";
import UserItem from "../components/shared/UserItem";
import { Link } from "../components/styles/StyledComponents";
import { matBlack } from "../constants/color";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import {
  useChatDetailsQuery,
  useDeleteChatMutation,
  useMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "../redux/api/api";
import { setIsAddMember } from "../redux/reducers/misc";

const ConfirmDialog = lazy(() => import("../components/dialogs/ConfirmDialog"));
const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAddMember } = useSelector((state) => state.misc);
  const { user } = useSelector((state) => state.auth);

  const myGroups = useMyGroupsQuery("");
  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );
  const [renameGroup, isLoadingRenameGroup] = useAsyncMutation(
    useRenameGroupMutation
  );
  const [removeGroupMember, isLoadingRemoveGroupMember] = useAsyncMutation(
    useRemoveGroupMemberMutation
  );
  const [deleteChat, isLoadingDeleteChat] = useAsyncMutation(
    useDeleteChatMutation
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [updatedGroupName, setUpdatedGroupName] = useState("");
  const [members, setMembers] = useState([]);

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];
  useErrors(errors);

  useEffect(() => {
    if (groupDetails.data) {
      setGroupName(groupDetails.data.chat.name);
      setUpdatedGroupName(groupDetails.data.chat.name);
      setMembers(groupDetails.data.chat.members);
    }

    return () => {
      setGroupName("");
      setUpdatedGroupName("");
      setMembers([]);
      setIsEdit(false);
    };
  }, [groupDetails.data]);

  useEffect(() => {
    if (myGroups.data) {
      myGroups.refetch();
    }
  }, []);

  const navigateBack = () => navigate("/");
  const handleMobile = () => setIsMobileMenuOpen((prev) => !prev);
  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const updateGroupName = () => {
    setIsEdit(false);
    renameGroup("Updating Group Name...", {
      chatId,
      name: updatedGroupName,
    });
  };

  const openConfirmHandler = () => setConfirmDialog(true);
  const closeConfirmHandler = () => setConfirmDialog(false);
  const openAddMemberHandler = () => dispatch(setIsAddMember(true));

  const deleteHandler = () => {
    deleteChat("Deleting Chat...", chatId);
    closeConfirmHandler();
    navigate("/groups");
  };

  const removeMemberhandler = (userId) => {
    removeGroupMember("Removing Member...", { chatId, userId });
  };

  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setUpdatedGroupName(`Group Name ${chatId}`);
    }

    return () => {
      setGroupName("");
      setUpdatedGroupName("");
      setIsEdit(false);
    };
  }, [chatId]);

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <Tooltip title="Menu">
          <IconButton onClick={handleMobile}>
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Tooltip title="Back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: matBlack,
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackSpaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={updatedGroupName}
            onChange={(e) => setUpdatedGroupName(e.target.value)}
          />
          <IconButton onClick={updateGroupName} disabled={isLoadingRenameGroup}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton
            onClick={() => setIsEdit(true)}
            disabled={isLoadingRenameGroup}
          >
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <Stack
      direction={{
        sm: "row",
        xs: "column-reverse",
      }}
      spacing={"1rem"}
      p={{
        xs: "1rem",
        sm: "1rem",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="large"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={openConfirmHandler}
        disabled={isLoadingDeleteChat}
      >
        Delete Group
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openAddMemberHandler}
        disabled={isLoadingDeleteChat}
      >
        Add Member
      </Button>
    </Stack>
  );

  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
      >
        <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
          backgroundColor: "rgba(0,0,0,0.1)",
        }}
      >
        {IconBtns}

        {!groupName ? (
          <Typography p={"5rem"} variant="h5" textAlign={"center"}>
            Select a Group to Edit
          </Typography>
        ) : (
          <>
            {GroupName}
            <Typography
              margin={"1rem"}
              alignSelf={"center"}
              variant="h6"
            >
              Members
            </Typography>

            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
              height={"50vh"}
              overflow={"auto"}
            >
              {isLoadingRemoveGroupMember ? (
                <CircularProgress />
              ) : (
                members?.map((i) => {
                  if (i._id.toString() !== user._id.toString()) {
                    return (
                      <UserItem
                        key={i._id}
                        user={i}
                        isAdded
                        styling={{
                          boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                          padding: "1rem 2rem",
                          borderRadius: "1rem",
                        }}
                        handler={removeMemberhandler}
                      />
                    );
                  }
                })
              )}
            </Stack>

            {ButtonGroup}
          </>
        )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      )}

      {confirmDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDialog
            open={confirmDialog}
            handleClose={closeConfirmHandler}
            deleteHandler={deleteHandler}
            message={"Are you sure you want to delete this group?"}
          />
        </Suspense>
      )}

      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupsList
          myGroups={myGroups?.data?.groups}
          chatId={chatId}
          w={"50vw"}
        />
      </Drawer>
    </Grid>
  );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack
    width={w}
    sx={{
      backgroundColor: "#ffdcda",
      height: "100vh",
    }}
  >
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem key={group._id} group={group} chatId={chatId} />
      ))
    ) : (
      <Typography textAlign={"center"} padding={"1rem"}>
        No Groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} spacing={"3rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});
GroupListItem.displayName = "GroupListItem";

export default Groups;
