import {
  Container,
  Typography,
  Tooltip,
  Stack,
  IconButton,
  Badge,
  styled,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import React, { Fragment, useState } from "react";
import {
  AppbarBackOffice,
  ToolbarBackOffice,
  IconBntNavBO,
  MenuNavbarBo,
} from "./NavbarBackOffice";
import Drawer from "@mui/material/Drawer";
import { ButtonProfile } from "./ButtonNav";
import MenuIcon from "@mui/icons-material/Menu";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { useAppSelector } from "../../../hooks/reduxHooks";

import { ListItemDrawer, ListItemWhiteChildrenDrawer } from "./MenuDrawer";

const NavbarMobile = ({ matches }: any) => {
  /**
   * Take all menu lists in the redux store
   */
  const navMenu = useAppSelector((state) => state.menu.value);
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();

  const toogleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      setOpenDrawer(false);
    }
    setOpenDrawer(!openDrawer);
  };

  return (
    <AppbarBackOffice position="static">
      <Container maxWidth="xl">
        <ToolbarBackOffice variant="dense">
          <Stack flexDirection="row" alignItems="center">
            <IconBntNavBO onClick={toogleDrawer} aria-label="home">
              <MenuIcon fontSize="inherit" />
            </IconBntNavBO>
            <NavMobileTypo
              variant="h5"
              sx={{ xs: { display: "none" } }}
              paddingX={2}
              color="GrayText"
            >
              Suivis et évaluations
            </NavMobileTypo>
          </Stack>
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
            <ButtonProfile />
          </MenuNavbarBo>
        </ToolbarBackOffice>
      </Container>
      <Drawer
        open={openDrawer}
        onClose={toogleDrawer}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.grey[300],
          },
        }}
      >
        <MenuDrawerContainer>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeWorkIcon fontSize="inherit" />
              </ListItemIcon>
              <ListItemText primary="Accueil" />
            </ListItemButton>
          </ListItem>
          {navMenu.map((page, index) =>
            page.items.length === 0 ? (
              <Fragment key={page.id}>
                <ListItemDrawer page={page} />
              </Fragment>
            ) : (
              <Fragment key={page.id}>
                <ListItemWhiteChildrenDrawer page={page} />
              </Fragment>
            )
          )}
        </MenuDrawerContainer>
      </Drawer>
    </AppbarBackOffice>
  );
};

export default NavbarMobile;

const NavMobileTypo = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const MenuDrawerContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  minHeight: "100%",
  paddingTop: theme.spacing(2),
  paddingLeft: theme.spacing(0),
  paddingBottom: theme.spacing(2),
  paddingRight: theme.spacing(0),
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
}));
