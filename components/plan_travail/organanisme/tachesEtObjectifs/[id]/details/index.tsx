import {
  Button,
  Container,
  styled,
  Typography,
  Grid,
  FormLabel,
  FormControl,
  Stack,
  TableRow,
  TableHead,
  TableCell,
  Table,
  TableBody,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import KeyValue from "../../../../../shared/keyValue";
import useFetchPlanTravaile from "../../../../hooks/useFetchPlanTravail";
import useFetchEmploys from "../../../../../GrantsEnCours/hooks/getResponsable";
import { getPlanTravail } from "../../../../../../redux/features/planTravail";
import { SectionNavigation } from "../../ListTacheEtObjectifs";
import useFetchTacheCle from "../../hooks/useFetchTacheEtObjectifs";
import useFetchProject from "../../../../../GrantsEnCours/hooks/getProject";
import { getTacheEtObjectifs } from "../../../../../../redux/features/tachesEtObjectifs";
import { TacheEtObjectifItem } from "../../../../../../redux/features/tachesEtObjectifs/tacheETObjectifs.interface";
import useFetchMissionListe from "../../../../../home/Missions/hooks/useFetchMissionListe";
import Moment from "react-moment";
import useFetchStatus from "../../../../../configurations/status/hooks/useFetchStatus";
import useFetchStagiaire from "../../../../../GrantsEnCours/hooks/getStagiaire";
import useFetchPrestataire from "../../../../../GrantsEnCours/hooks/getPrestataire";

const DetailTacheCles = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { idT }: any = router.query;
  const { id }: any = router.query;

  const { tacheEtObjectif, tacheEtObjectifList } = useAppSelector(
    (state: any) => state.tacheEtObjectifs
  );
  const fetchTacheCle = useFetchTacheCle();
  const fetchResponsable = useFetchEmploys();
  const { employees } = useAppSelector((state: any) => state.employe);
  const fetchStatus = useFetchStatus();
  const { statuslist } = useAppSelector((state: any) => state.status);
  const fetchStagiaire = useFetchStagiaire();
  const { interns } = useAppSelector((state: any) => state.stagiaire);
  const fetchPrestataire = useFetchPrestataire();
  const { prestataireListe } = useAppSelector(
    (state: any) => state.prestataire
  );
  const data = async () => {
    await fetchResponsable();
    await fetchTacheCle();
    await fetchStatus();
    await fetchStagiaire();
    await fetchPrestataire();
    await getTacheCleDetails();
  };
  useEffect(() => {
    data();
  }, [idT]);

  const getTacheCleDetails = () => {
    const args: any = {
      include: {
        planTravaile: true,
      },
    };
    dispatch(getTacheEtObjectifs({ idT, args }));
  };
  const listResponsable: { id: string; name: any }[] = [];

  employees.forEach((element: any) => {
    let longueur: any = tacheEtObjectif.responsable?.length;
    let i = 0;
    while (i < longueur) {
      if (tacheEtObjectif.responsable![i] === element.id) {
        listResponsable.push({ id: element.surname, name: element.name });
      }
      i = i + 1;
    }
  });
  const formatOptions = (options: any) => {
    return options.map((option: any) => ({
      id: option.id,
      name: option.name,
      surname: option.surname,
    }));
  };

  const allOptions = [
    ...formatOptions(employees),
    ...formatOptions(interns),
    ...formatOptions(prestataireListe),
  ];
  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <SectionNavigation
        direction="row"
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Link href={`/plan_travail/${id}/tachesEtObjectifs`}>
          <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
            Retour
          </Button>
        </Link>
        <Typography
          variant="h4"
          color="GrayText"
          style={{ marginRight: "15px" }}
        >
          Détail tâche clés
        </Typography>
      </SectionNavigation>
      <DetailsContainer sx={{ backgroundColor: "#fff", pb: 5 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S/N</TableCell>
              <TableCell>Date début</TableCell>
              <TableCell>Date fin</TableCell>
              <TableCell>Tâche clé</TableCell>
              <TableCell>Time frame</TableCell>
              <TableCell>Ressources</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Participants</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tacheEtObjectifList
              .filter((e: any) => e.id === idT)
              .slice()
              .map((row: TacheEtObjectifItem, index: any) => (
                <TableRow>
                  <TableCell>{row.sn}</TableCell>
                  <TableCell>
                    <Moment format="DD/MM/yyyy">{row.startDate}</Moment>
                  </TableCell>
                  <TableCell>
                    <Moment format="DD/MM/yyyy">{row.endDate}</Moment>
                  </TableCell>
                  <TableCell>{row.keyTasks}</TableCell>
                  <TableCell>{row.expectedResult}</TableCell>
                  <TableCell>{row.resources}</TableCell>
                  <TableCell>{row.notes}</TableCell>
                  <TableCell>
                    {statuslist.find((e: any) => e.id === row.statusId)?.status}
                  </TableCell>
                  <TableCell>
                    <FormControl
                      sx={{
                        height: row.participantsId!.length <= 2 ? "auto" : 70,
                        overflow: "auot",
                      }}
                    >
                      {allOptions
                        .filter((e: any) => row.participantsId!.includes(e.id))
                        .map((e: any) => (
                          <Stack
                            key={e.id}
                            gap={2}
                          >{`${e.name} ${e.surname}`}</Stack>
                        ))}
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </DetailsContainer>
    </Container>
  );
};

export default DetailTacheCles;

const DetailsContainer = styled("div")(({ theme }) => ({
  padding: 30,
  border: "1px solid #E0E0E0",
  borderRadius: 20,
}));
