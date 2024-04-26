import {
    Button,
    Container,
    styled,
    Typography,
    Grid,
    FormLabel,
    FormControl,
    Stack,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/reduxHooks";
import KeyValue from "../../../../../shared/keyValue";
import useFetchPlanTravaile from "../../../../hooks/useFetchPlanTravail";
import useFetchEmploys from "../../../../../GrantsEnCours/hooks/getResponsable";
import { getPlanTravail } from "../../../../../../redux/features/planTravail";
import { SectionNavigation } from "../../ListTacheEtObjectifs";
import useFetchTacheCle from "../../hooks/useFetchTacheEtObjectifs";
import { getTacheCle } from "../../../../../../redux/features/tachesEtObjectifs";
import useFetchProject from "../../../../../GrantsEnCours/hooks/getProject";

const DetailTacheCles = () => {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const { idT }: any = router.query;
    const { id }: any = router.query;

    const { tacheCle } = useAppSelector((state: any) => state.tacheCle)
    const fetchTacheCle = useFetchTacheCle();
    const fetchResponsable = useFetchEmploys();
    const { employees } = useAppSelector((state: any) => state.employe)
    const fetchProject = useFetchProject();
    const { projectList } = useAppSelector((state: any) => state.project);
    const fetchPlanTravail = useFetchPlanTravaile()
    const { planTravaillist } = useAppSelector((state: any) =>state.planTravail)

    useEffect(() => {
        getTacheCleDetails();
        fetchResponsable();
        fetchTacheCle()
        fetchProject();
        fetchPlanTravail();
    }, [idT])

    const getTacheCleDetails = () => {
        const args: any = {
            include: {
                planTravaile: true,
            }
        };
        dispatch(getTacheCle({ idT, args }));
    };
    const listResponsable: { id: string, name: any }[] = [];

    employees.forEach((element: any) => {
        let longueur: any = (tacheCle.responsable)?.length;
        let i = 0;
        while (i < longueur) {
            if (tacheCle.responsable![i] === element.id) {
                listResponsable.push({ id: element.surname, name: element.name })
            }
            i = i + 1
        }
    })
    // console.log("list respon :", listResponsable)
    return (
        <Container maxWidth="xl" sx={{ pb: 5 }}>
            <SectionNavigation
                direction='row'
                spacing={{ xs: 1, sm: 2, md: 4 }}
                justifyContent="space-between"
                sx={{ mb: 2 }}>
                <Link href={`/plan_travail/${id}/tachesCles`}>
                    <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
                        Retour
                    </Button>
                </Link>
                <Typography variant="h4" color="GrayText" style={{marginRight: "15px"}}>
                    Détail taches clés
                </Typography>
            </SectionNavigation>
            <DetailsContainer sx={{ backgroundColor: "#fff", pb: 5 }}>
                 <Grid container spacing={4} my={1}>
                 <Grid item xs={12} md={12}>
                 <FormLabel>
                        <span>Tache : </span>
                        <span style={{color: "black"}}>
                            {tacheCle?.tacheCle}
                        </span>
                    </FormLabel>
                 </Grid>
                </Grid>
                <Grid container spacing={4} my={1}>
                    <Grid item xs={12} md={12}>

                        <Stack direction="column" spacing={2}>
                            <span style={{ color: "black" }}>Tous les projets </span>
                            <FormLabel> <b style={{ color: "black" }}>  Titre Français : </b>
                                <span style={{ color: "black" }}>
                                    {projectList.find((e: any) => e.id === tacheCle.projet)?.titleFr}
                                </span>
                            </FormLabel>
                            <FormLabel> <b style={{ color: "black" }}>  Titre Anglais  : </b>
                                <span style={{ color: "black" }}>
                                    {projectList.find((e: any) => e.id === tacheCle.projet)?.titleEn}
                                </span>
                            </FormLabel>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container spacing={4} my={1}>
                    <Grid item xs={12} md={12}>
                        Responsables :
                        {
                            listResponsable.map((item: any) => (
                                <FormLabel>
                                    <Stack direction="row" spacing={2}>
                                        <b style={{ color: "black" }}>Nom et Prénoms : </b>
                                        <span style={{ color: "black" }}>
                                            {item.name} {item.id}</span>
                                    </Stack>
                                </FormLabel>
                            ))
                        }
                    </Grid>
                </Grid>
                <Grid container spacing={4} my={1}>
                  <Grid item xs={12} md={6}>
                    <FormLabel>
                        <span>Plan du travail : </span>
                        <span style={{color: "black"}}>{planTravaillist.find((e: any) =>e.id === tacheCle.planTravaileId)?.description}</span>
                    </FormLabel>
                  </Grid>
                </Grid>
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
