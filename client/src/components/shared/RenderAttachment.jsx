/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { FileOpen as FileOpenIcon } from "@mui/icons-material";
import { transformImg } from "../../lib/features";

const RenderAttachment = (file, url) => {
  switch (file) {
    case "video":
      return <video src={url} preload="none" width={"200px"} controls />;

    case "audio":
      return <audio src={url} preload="none" controls />;

    case "image":
      return (
        <img
          src={transformImg(url, 200)}
          alt="Attachment"
          width={"200px"}
          height={"150px"}
          style={{
            objectFit: "contain",
          }}
        />
      );

    default:
      return <FileOpenIcon />;
  }
};

export default RenderAttachment;
