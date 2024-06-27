import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getGrantAdmin, getGrantAdminlist } from "../../redux/features/grantAdmin";
import { getGrantEncours, getGrantEncoursList } from "../../redux/features/grantEncours";
import { getReliquatGrantList } from "../../redux/features/reliquatGrants";
import { getPlanTravaillist } from "../../redux/features/planTravail";
import { getSitelist } from "../../redux/features/site";
const MONTH = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];
const getStatus = (s: any) => {
  switch (s) {
    case "PENDING":
      return "En attente";
    case "PAID":
      return "Payé";
    case "CANCELLED":
      return "Annulé";
    default:
      return "";
  }
};
export default function Counter() {
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const { grantAdminlist } = useAppSelector((state) => state.grantAdmin);
  const { reliquatGrantList } = useAppSelector((state) => state.reliquatGrant);
  const { sitelist } = useAppSelector((state) => state.site);
  const { planTravaillist } = useAppSelector((state) => state.planTravail);
  const dispatch = useAppDispatch();
  const fetchData = async () => {
    dispatch(getGrantAdminlist({}));
    dispatch(getGrantEncoursList({}));
    dispatch(getReliquatGrantList({}));
    dispatch(getPlanTravaillist({}));
    dispatch(getSitelist({}));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Stack direction={"column"} gap={2}>
      <Stack
        direction={"column"}
        gap={2}
        justifyContent={"center"}
      >
        <Stack
          direction={"column"}
          alignItems={"center"}
          padding={1}
          sx={{
            border: "1px solid #00C49F",
            borderRadius: 1,
            whiteSpace: "nowrap",
            width: 230,
          }}
        >
          <Typography variant={"caption"} fontWeight={"bolder"}>
             Grants
          </Typography>
          <Stack direction={"row"}  gap={2} width={"100%"} flexWrap={"wrap"}>
            <Stack flex={1} alignItems={"center"} justifyContent={"center"}>
              <Typography variant={"caption"} fontWeight={"bolder"}>
                En cours
              </Typography>
              <Typography sx={{ color: "#00C49F" }} variant={"h4"}>
                {grantEncoursList.length}
              </Typography>
            </Stack>
            <Stack flex={1} alignItems={"center"} justifyContent={"center"}>
              <Typography variant={"caption"} fontWeight={"bolder"}>
                Admin
              </Typography>
              <Typography sx={{ color: "#00C49F" }} variant={"h4"}>
                {grantAdminlist.length}
              </Typography>
            </Stack>
            <Stack flex={1} alignItems={"center"} justifyContent={"center"}>
              <Typography variant={"caption"} fontWeight={"bolder"}>
                Réliquats
              </Typography>
              <Typography sx={{ color: "#00C49F" }} variant={"h4"}>
                {reliquatGrantList.length}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          direction={"column"}
          alignItems={"center"}
          padding={1}
          sx={{
            border: "1px solid #0088FE",
            borderRadius: 1,
            whiteSpace: "nowrap",
            width: 230,
          }}
        >
          <Typography variant={"caption"} fontWeight={"bolder"}>
             PTA
          </Typography>
          <Stack direction={"row"}  gap={2} width={"100%"} flexWrap={"wrap"}>
            <Stack flex={1} alignItems={"center"} justifyContent={"center"}>
              <Typography variant={"caption"} fontWeight={"bolder"}>
                Site
              </Typography>
              <Typography sx={{ color: "#0088FE" }} variant={"h4"}>
                {sitelist.length}
              </Typography>
            </Stack>
            <Stack flex={1} alignItems={"center"} justifyContent={"center"}>
              <Typography variant={"caption"} fontWeight={"bolder"}>
                Plan
              </Typography>
              <Typography sx={{ color: "#0088FE" }} variant={"h4"}>
                {planTravaillist.length}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
