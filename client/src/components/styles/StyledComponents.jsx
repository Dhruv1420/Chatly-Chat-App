/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { keyframes, Skeleton, styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import { grayColor, matBlack } from "../../constants/color";

const VisuallyHiddenInput = styled("input")({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

const Link = styled(LinkComponent)`
  text-decoration: none;
  color: black;
  padding: 1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const InputBox = styled("input")`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 3rem;
  border-radius: 1.5rem;
  background-color: ${grayColor};
`;

const SearchField = styled("input")`
  padding: 1rem 2rem;
  width: 20vmax;
  border: none;
  outline: none;
  border-radius: 1.5rem;
  background-color: ${grayColor};
  font-size: 1rem;
`;

const CurveButton = styled("button")`
  border-radius: 1.5rem;
  padding: 1rem 2rem;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${matBlack};
  color: white;
  font-size: 1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const bounce = keyframes`
  0% {transform: scale(1);}
  50% {transform: scale(1.5);}
  100% {transform: scale(1);}
`;

const BouncingSkeleton = styled(Skeleton)(() => ({
  animation: `${bounce} 1s infinite`,
}));

export {
  VisuallyHiddenInput,
  Link,
  InputBox,
  SearchField,
  CurveButton,
  BouncingSkeleton,
};
