import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { Badge, Link, Stack, styled, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import allMenu from "../../../config/menu";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { logout } from "../../../redux/features/auth/authSlice";
import {
  ButtonProfile,
  OneButtonLink,
  OneButtonLinkWithItems,
} from "./ButtonNav";
import { Fragment } from "react";
// import Link from "next/link";

const NavbarBackOffice = ({ matches }: any) => {
  const theme = useTheme();
  /**
   * Take all menu lists in the redux store
   */
  const navMenu = allMenu();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleClickLogout = () => {
    dispatch(logout({}));
    window.location.href = "/login";
  };

  return (
    <AppbarBackOffice position="static" elevation={0}>
      <ToolbarBackOffice variant="dense">
        <ListMenuContainer>
          <Link href="/">
            <IconBntNavBO aria-label="home">
              <HomeWorkIcon fontSize="inherit" />
            </IconBntNavBO>
          </Link>
          <Typography variant="h5" paddingX={2} color="GrayText">
            Suivis et évaluations
          </Typography>
          <ListPageContainer>
            {navMenu.map((page, index) =>
              page.items.length === 0 ? (
                <OneButtonLink page={page} key={index} />
              ) : (
                <OneButtonLinkWithItems page={page} key={index} />
              )
            )}
          </ListPageContainer>
        </ListMenuContainer>
        <MenuNavbarBo>
          <Tooltip title="Open notification" sx={{ mx: 4 }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge
                badgeContent={17}
                color="error"
                sx={{
                  ".MuiBadge-badge": {
                    top: 6,
                  },
                }}
              >
                <CircleNotificationsIcon fontSize="large" />
              </Badge>
            </IconButton>
          </Tooltip>
          <ButtonProfile handleClickLogout={handleClickLogout} />
        </MenuNavbarBo>
      </ToolbarBackOffice>
    </AppbarBackOffice>
  );
};

export default NavbarBackOffice;

const ListPageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
}));

const ListMenuContainer = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
}));

export const MenuNavbarBo = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}));

export const IconBntNavBO = styled(IconButton)(({ theme }) => ({
  // backgroundColor: theme.palette.common.white,
}));

export const AppbarBackOffice = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
}));

export const ToolbarBackOffice = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));
