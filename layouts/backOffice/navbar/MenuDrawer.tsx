import {
  Icon,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Collapse,
  List,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Link from "next/link";
import { useRouter } from "next/router";

export const ListItemDrawer = ({ page }: any) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <ListItem disablePadding key={page.id}>
      <Link href={page.link}>
        <ListItemButton
          sx={{
            backgroundColor:
              router.pathname === page.link ? theme.palette.common.white : "",
          }}
        >
          <ListItemIcon>
            <Icon>{page.icon}</Icon>
          </ListItemIcon>
          <ListItemText primary={page.name} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export const ListItemWhiteChildrenDrawer = ({ page }: any) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const router = useRouter();
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <Icon>{page.icon}</Icon>
          </ListItemIcon>
          <ListItemText primary={page.name} />
          <ListItemIcon sx={{ ml: 2 }}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        sx={{ backgroundColor: theme.palette.grey[300] }}
      >
        {page.items.map((item: any, index: any) => (
          <Fragment key={item.id}>
            <List component="span" disablePadding>
              <Link href={item.link}>
                <ListItemButton
                  sx={{
                    ml: 4,
                    backgroundColor:
                      router.pathname === item.link
                        ? theme.palette.common.white
                        : "",
                  }}
                >
                  <FiberManualRecordIcon fontSize="small" color="disabled" />
                  <Typography variant="body2" sx={{ ml: 2 }} color="GrayText">
                    {item.name}
                  </Typography>
                </ListItemButton>
              </Link>
            </List>
          </Fragment>
        ))}
      </Collapse>
    </>
  );
};
