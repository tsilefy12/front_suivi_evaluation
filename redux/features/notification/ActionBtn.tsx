import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { closeSnackbar } from "./notificationSlice";
import CloseIcon from "@mui/icons-material/Close";

export const ActionBtn = (key: any) => {
  const dispatch = useDispatch();
  return (
    <IconButton
      aria-label="close"
      color="inherit"
      sx={{ p: 0.5 }}
      onClick={() => {
        dispatch(closeSnackbar({ key }));
      }}
    >
      <CloseIcon />
    </IconButton>
  );
};
