import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Container, Dialog, DialogActions, DialogContentText, DialogTitle, FormLabel, MenuItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { BodySection, SectionNavigation } from "../../ListTacheEtObjectifs";
import { useRouter } from "next/router";
import useFetchObjectifsAnnuel from "./hooks/useFetchObjectifAnnuel";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/reduxHooks";
import React, { useState } from "react";
import useFetchSite from "../../../../../configurations/site/hooks/useFetchSite";
import OSTextField from "../../../../../shared/input/OSTextField";
import { updateSite } from "../../../../../../redux/features/site";
import { Form, Formik } from "formik";
import { position } from "polished";


const ListSite = () => {
    const router = useRouter()
    const { id }: any = router.query;
    const { idT }: any = router.query;
    const fetchObjectifAnnuel = useFetchObjectifsAnnuel();
    const { objectifsAnnuelList } = useAppSelector((state: any) => state.objectifsAnnuels)
    const fetchSite = useFetchSite();
    const { sitelist, isEditing, site } = useAppSelector((state: any) => state.site);
    const dispatch: any = useAppDispatch();
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        fetchObjectifAnnuel();
        fetchSite();
    }, [router.query])

    const tempObjectifAnnuel = objectifsAnnuelList.filter((e: any) => e.taskAndObjectiveId === idT);
    //    console.log("tempObjectif :", tempObjectifAnnuel)
    const Choix = [
        { id: 1, name: 1 },
        { id: 0, name: 0 }
    ]

    const [test, setTest]: any = React.useState("");
    const [valeur, setValeur]: any = React.useState("");
    console.log("val :", test)
    const click = () => {
        if (test == 1 || test == 0) {
            console.log("OK")
            setOpen(true)
        }
    }
    const handleSubmit = async (values: any) => {
        try {
            await dispatch(
              updateSite({
                id: valeur!,
                site: {
                    ...site,
                    but: (test).toString(),
                    objectifAnnuelId: idT!
                }
              })
            );
         setOpen(false);
        } catch (error) {
          console.log("error", error);
        }
      };
    return (
        <>
            <Container maxWidth="xl">
                <SectionNavigation direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    justifyContent="space-between"
                    sx={{ mb: 2 }}>
                    <Stack flexDirection={"row"}>
                        <Link href={`/plan_travail/${id}/tachesEtObjectifs`}>
                            <Button color="info" variant="text" startIcon={<ArrowBack />}>
                                Retour
                            </Button>
                        </Link>
                    </Stack>
                    <Typography variant="h4" color="GrayText">
                        Liste des sites
                    </Typography>

                </SectionNavigation>
                <BodySection>
                    <Box sx={{ width: "100%" }}>
                        <Paper sx={{ width: "100%", mb: 2 }}>
                            <TableContainer>
                                <Table sx={{ padding: 2 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                sx={{ position: "fixed", left: 40, fontSize: "1.2em", zIndex: 10 }}>Objectif annuel</TableCell>
                                            {sitelist.map((s: any) => (
                                                <TableCell
                                                    key={s.id}
                                                    align="left"
                                                    sx={{ paddingLeft: 25 }}
                                                >
                                                    {s.lieu}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tempObjectifAnnuel.map((oba: any, yearIndex: any) => (
                                            <TableRow key={oba.id}>
                                                <TableCell sx={{ position: "fixed", left: 60, marginTop: 1, fontSize: "1.5em", backgroundColor: "#e0e0e0", zIndex: 4 }}>
                                                    {oba.year}
                                                </TableCell>
                                                {sitelist.map((s: any, siteIndex: any) => (
                                                    <TableCell key={s.id} sx={{ paddingLeft: sitelist.length >= 5 ? 22 : 0 }} align="right">
                                                        <TextField
                                                            fullWidth
                                                            select
                                                            id={`outlined-basic-${s.id!}`}
                                                            variant="outlined"
                                                            value={test[yearIndex + 1] && test[yearIndex + 1][siteIndex + 1]}
                                                            onChange={(e: any) => {
                                                                const selectedValue = parseInt(e.target.value);
                                                                setTest(selectedValue);
                                                                setValeur(s.id)
                                                            }}
                                                            name="but"
                                                            onClick={() => click()}
                                                            sx={{display: (s.objectifAnnuelId !=null && s.objectifAnnuelId === idT) ? 'none': 'block'}}
                                                        >
                                                            {Choix.map((c: any) => (
                                                                <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                                                            ))}
                                                        </TextField>
                                                        
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Box>
                </BodySection >
                <Formik
                    enableReinitialize
                    initialValues={
                        isEditing
                            ? site
                            : {
                                but: isEditing ? site?.but : "",
                                objectifAnnuelId: isEditing ? site?.objectifAnnuelId : "",
                            }
                    }
                    onSubmit={(value: any, action: any) => {
                        handleSubmit(value);
                        action.resetForm();
                    }}
                >
                    {(formikProps) => {
                        return (
                            <Form>
                                <Dialog
                                    open={open}
                                    sx={styleDialog}
                                >
                                    <DialogContentText>{test}</DialogContentText>
                                    <DialogActions>
                                     <Stack direction={"row"} spacing={2}>
                                     <Button onClick={() => setOpen(false)}>Annuler</Button>
                                        <Button type="button" onClick={formikProps.submitForm}>Enregistrer</Button>
                                     </Stack>
                                    </DialogActions>
                                </Dialog>
                            </Form>
                        )
                    }}
                </Formik>
            </Container >

        </>
    );
};

export default ListSite;

// export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
// export const SectionNavigation = styled(Stack)(({ theme }) => ({}));

// export const BodySection = styled(Box)(({ }) => ({
//     borderRadius: 20,
//     backgroundColor: "white",
//     marginBlock: 16,
// }));
// const FormContainer = styled(Stack)(({ theme }) => ({
//     width: "100%",
//     marginBottom: theme.spacing(3),
//     padding: 30,
//     borderRadius: 20,
//     background: "#fff",
//     border: `1px solid ${theme.palette.grey[100]}`,
//     marginTop: 14,
// }));

// const NavigationContainer = styled(Stack)(({ theme }) => ({
//     flexDirection: "column",
//     marginBottom: theme.spacing(2),
//     flex: 1,
//     width: "100%",
// }));
const styleDialog = {
    position: "fixed",
    left: 50,
    top: 0
}

