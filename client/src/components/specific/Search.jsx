/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useLazySearchUserQuery,
  useMyProfileQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";

const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);
  const [searchUser] = useLazySearchUserQuery();
  const { data, isError, error, isLoading } = useMyProfileQuery();
  const [sendFriendRequest, isLoadingFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );
  const dispatch = useDispatch();

  const search = useInputValidation("");
  const [users, setUsers] = useState([]);

  useErrors([{ isError, error }]);

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request...", { userId: id });
  };

  const handleClose = () => dispatch(setIsSearch(false));

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value, searchUser]);

  return (
    <Dialog open={isSearch} onClose={handleClose}>
      <Stack p={"2rem"} direction={"column"} maxWidth={"35rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List sx={{ minWidth: "25rem" }}>
          {isLoading ? (
            <Skeleton />
          ) : users.length > 0 ? (
            users.map((user) => {
              if (user._id !== data?.user._id) {
                return (
                  <UserItem
                    user={user}
                    key={user._id}
                    handler={addFriendHandler}
                    handlerIsLoading={isLoadingFriendRequest}
                  />
                );
              }
            })
          ) : (
            <Typography textAlign={"center"}>No More Users</Typography>
          )}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
