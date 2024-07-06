import moment from "moment";

const fileFormat = (url = "") => {
  const fileExt = url.split(".").pop();

  if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg")
    return "video";

  if (fileExt === "mp3" || fileExt === "wav") return "audio";

  if (
    fileExt === "png" ||
    fileExt === "jpg" ||
    fileExt === "jpeg" ||
    fileExt === "gif"
  )
    return "image";

  return "file";
};

const transformImg = (url = "", width = 100) => url;

const getLast7Days = () => {
  const currDate = moment();
  const last7Days = [];

  for (let i = 0; i < 7; i++) {
    const dayDate = currDate.clone().subtract(1, "days").format("dddd");

    last7Days.unshift(dayDate);
  }

  return last7Days;
};

export { fileFormat, transformImg, getLast7Days };
