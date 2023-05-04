import {
  Avatar,
  Button,
  Divider,
  Icon,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAppSelector } from "../../../hooks/reduxHooks";
import useBasePath from "../../../hooks/useBasePath";

export const OneButtonLink = ({ page }: any) => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Fragment key={page.id}>
      <Link href={page.link}>
        <Button
          size="small"
          color="greymenu"
          /**
           * check if page.link is equal to the current route,
           * if equal the type of button is contained (active)
           * if not the button type is text (inactive)
           */
          variant={router.pathname === page.link ? "contained" : "text"}
          // onClick={handleCloseNavMenu}
          startIcon={<Icon>{page.icon}</Icon>}
          sx={{
            mx: 1,
            boxShadow: "none",
            color: router.pathname === page.link ? "" : theme.palette.grey[600],
            md: { my: 10 },
          }}
        >
          {page.name}
        </Button>
      </Link>
    </Fragment>
  );
};

export const OneButtonLinkWithItems = ({ page }: any) => {
  const router = useRouter();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment key={page.id}>
      <Button
        id="basic-button"
        size="small"
        color="greymenu"
        variant={router.pathname === page.link ? "contained" : "text"}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          mx: 1,
          boxShadow: "none",
          color: router.pathname === page.link ? "" : theme.palette.grey[600],
        }}
        startIcon={<Icon>{page.icon}</Icon>}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {page.name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {page.items.map((item: any, index: any) => (
          <span key={index}>
            <Link href={item.link}>
              <MenuItem onClick={handleClose}>{item.name}</MenuItem>
            </Link>
          </span>
        ))}
      </Menu>
    </Fragment>
  );
};

export const ButtonProfile = ({ page, handleClickLogout }: any) => {
  const user = useAppSelector((state) => state.auth.user);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  /**
   * Take all menu profile lists in the redux store
   */
  const menuProfile = useAppSelector((state) => state.menuprofile.value);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const basePaht = useBasePath();

  return (
    <>
      <Tooltip title="Ouvrir les paramètres">
        <IconButton onClick={handleClick}>
          <Avatar
            alt="Remy Sharp"
            src={
              user!.profileImageUrl
                ? `${apiUrl}${user!.profileImageUrl}`
                : `${basePaht}/images/Avatar.png`
            }
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {menuProfile.map((menu, index) =>
          menu.icon === "Avatar" ? (
            <span key={index}>
              <MenuItem
                onClick={
                  menu.link === "/logout"
                    ? () => {
                        handleClickLogout();
                      }
                    : () => {
                        false;
                      }
                }
              >
                <Avatar
                  src={
                    user!.profileImageUrl
                      ? `${apiUrl}${user!.profileImageUrl}`
                      : `${basePaht}/images/Avatar.png`
                  }
                />
                {menu.name}
              </MenuItem>
              {menu.divider && <Divider />}
            </span>
          ) : (
            <span key={index}>
              <MenuItem
                onClick={
                  menu.link === "/logout"
                    ? () => {
                        handleClickLogout();
                      }
                    : () => {
                        false;
                      }
                }
              >
                <ListItemIcon>
                  <Icon>{menu.icon}</Icon>
                </ListItemIcon>
                {menu.name}
              </MenuItem>
              {menu.divider && <Divider />}
            </span>
          )
        )}
      </Menu>
    </>
  );
};
