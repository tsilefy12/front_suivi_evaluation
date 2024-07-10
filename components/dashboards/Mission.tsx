import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { usePermitted } from "../../config/middleware";
import { useAppSelector } from "../../hooks/reduxHooks";
import useFetchEmploys from "../GrantsEnCours/hooks/getResponsable";
import useFetchMissionListe from "../home/Missions/hooks/useFetchMissionListe";
import { EmployeItem } from "../../redux/features/employe/employeSlice.interface";
import { MissionLocationItem } from "../../redux/features/missionLocation/missionLocationSlice.interface";
import { MissionItem } from "../../redux/features/mission/mission.interface";
export default function Mission() {
  const { missionListe } = useAppSelector((state) => state.mission);
  const fetchMissionListe = useFetchMissionListe();
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state) => state.employe);
  const validate = usePermitted();

  React.useEffect(() => {
    fetchMissionListe();
    fetchEmployes();
  }, []);
  return (
    <Stack
      padding={1}
      sx={{ border: "1px solid #efefef", borderRadius: 1, minHeight: 200 }}
    >
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        <img src="/images/icons/recrutement-en-ligne.png" />
        <Typography variant="h5" sx={{ whiteSpace: "nowrap" }}>
          Mission en cours
        </Typography>
      </Stack>
      <Stack direction={"column"} gap={2} padding={2}>
        <Table>
          <TableHead>
            <TableCell padding="none">Réf budget</TableCell>
            <TableCell padding="none">Responsable</TableCell>
            <TableCell padding="none">Lieu</TableCell>
            <TableCell padding="none">Fin</TableCell>
          </TableHead>
          <TableBody>
            {missionListe.map((row: MissionItem, index: any) => (
              <TableRow key={row.id}>
                <TableCell padding="none" sx={{ paddingY: 1 }}>
                  {row.RefBudget}
                </TableCell>
                <TableCell padding="none">
                  {`${
                    employees.find(
                      (e: EmployeItem) => e.id === row.missionManagerId
                    )?.name as string
                  } ${" "}
                      ${
                        employees.find(
                          (e: EmployeItem) => e.id === row.missionManagerId
                        )?.surname as string
                      } `}
                </TableCell>
                <TableCell padding="none">
                  {row.missionLocation!.map(
                    (l: MissionLocationItem) => l.district!
                  )}
                </TableCell>
                <TableCell padding="none"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>
    </Stack>
  );
}

function KeyValue({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) {
  return (
    <Stack direction={"row"} gap={1}>
      <Typography variant={"body2"} color={"GrayText"}>
        {label}
      </Typography>
      <Typography variant={"body2"} fontWeight={"bolder"}>
        {value ? value : "-"}
      </Typography>
    </Stack>
  );
}
