/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { Menu } from "@mui/material";

const FileMenu = ({ anchorE1 }) => {
  return (
    <Menu anchorEl={anchorE1} open={false}>
      <div
        style={{
          width: "10rem",
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ab
        veniam commodi perferendis quam aliquid! Alias vel veniam, quia eius
        laboriosam adipisci voluptatem.
      </div>
    </Menu>
  );
};

export default FileMenu;
