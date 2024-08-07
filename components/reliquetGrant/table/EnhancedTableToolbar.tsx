import React from "react";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { EnhancedTableToolbarProps } from "./type-variable";
import { TextField, Stack, Typography, InputAdornment } from "@mui/material";
import { selectedItemsLabel } from "../../../config/table.config";
import { Search } from "@mui/icons-material";

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, filtre, setFiltre } = props;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} {" " + selectedItemsLabel}
        </Typography>
      ) : (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{
            flex: "1 1 100%",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" id="tableTitle" component="div">
            Liste des reliquats Grants
          </Typography>
          <TextField
            variant="outlined"
            id="search"
            name="search"
            placeholder="Recherche"
            size="small"
            value={filtre}
            onChange={(e) => setFiltre(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search sx={{ color: "GrayText", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
