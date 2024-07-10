import { CircleNotifications } from "@mui/icons-material";
import {
  Badge,
  IconButton,
  Link,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { logout } from "../../redux/features/auth";
import { ButtonProfile } from "../../layouts/backOffice/navbar/ButtonNav";

export default function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleClickLogout = () => {
    dispatch(logout({}));
    router.push("/login");
  };
  return (
    <Stack
      width={"100%"}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ background: (theme) => theme.palette.grey[300], padding: 1 }}
    >
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        <Link href="/">
          <img
            src="/images/logo/logo.png"
            style={{ cursor: "pointer", width: "60px", height: "50px" }}
          />
        </Link>
        <Typography variant="body2" color={"GrayText"}>
          Tableau de bord
        </Typography>
      </Stack>
      <Typography variant="h6">Suivi et évaluation</Typography>
      <MenuNavbarBo>
        <Tooltip title="Pas de notification" sx={{ mx: 2 }}>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge
              badgeContent={0}
              color="error"
              sx={{
                ".MuiBadge-badge": {
                  top: 6,
                },
              }}
            >
              <CircleNotifications fontSize="large" />
            </Badge>
          </IconButton>
        </Tooltip>
        <ButtonProfile handleClickLogout={handleClickLogout} />
      </MenuNavbarBo>
    </Stack>
  );
}
const MenuNavbarBo = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}));
