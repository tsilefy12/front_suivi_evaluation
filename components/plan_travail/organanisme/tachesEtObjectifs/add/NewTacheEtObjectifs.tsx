import { Form, FormikProps } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, Button, Divider, FormControl, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, styled } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';

import { ArrowBack } from '@mui/icons-material';
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks';
import OSTextField from '../../../../shared/input/OSTextField';
import useFetchEmploys from '../../../../GrantsEnCours/hooks/getResponsable';
import { getStatuslist } from '../../../../../redux/features/status';
import OSSelectField from '../../../../shared/select/OSSelectField';
import OSDatePicker from '../../../../shared/date/OSDatePicker';
import { EmployeItem } from '../../../../../redux/features/employe/employeSlice.interface';
import AddNewTacheEtObjectifs from './AddNewTacheEtObjectifs';

const NewTacheEtObjectifs = ({ formikProps, valuesArticle, setValuesArticle, setIdDelete }: { formikProps: FormikProps<any>, valuesArticle: any, setValuesArticle: any, setIdDelete: any }) => {
    const dispatch = useAppDispatch();
    const route = useRouter();
    const [idValues, setIdValues] = useState<any>()

    const { statuslist } = useAppSelector((state) => state.status)
    const { employees } = useAppSelector((state: any) => state.employe)

    const { isEditing, tacheEtObjectif } = useAppSelector((state) => state.tacheEtObjectifs);
    const fetchEmployes = useFetchEmploys();

    const fetchUtilsData = () => {
        fetchEmployes();
        dispatch(getStatuslist({}))
    };

    useEffect(() => {
        fetchUtilsData();
    }, []);

    const [selectedEmployes, setSelectedEmployes] = useState<EmployeItem[]>(
        isEditing
            ? employees.filter((employee: any) =>
                tacheEtObjectif?.participantsId?.includes(employee.id!)
            )
            : []
    );
    return (
        <Form>
            <NavigationContainer>
                <SectionNavigation>
                    <Stack flexDirection={"row"}>
                        <Button
                            color="info"
                            variant="text"
                            startIcon={<ArrowBack />}
                            onClick={() => {
                                route.back()
                                formikProps.resetForm();
                            }}
                        >
                            Retour
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<Check />}
                            sx={{ marginInline: 3 }}
                            type="submit"
                        >
                            {isEditing ? "Modifier" : "Enregistrer"}
                        </Button>
                        <Button
                            variant="text"
                            color="warning"
                            size="small"
                            type="reset"
                            startIcon={<Close />}
                            onClick={() => {
                                formikProps.resetForm();
                            }}
                        >
                            Annuler
                        </Button>
                    </Stack>
                    <Typography variant="h4">
                        {isEditing ? "Modifier" : "Ajouter"} Tâche et objectifs
                    </Typography>
                </SectionNavigation>
                <Divider />
            </NavigationContainer>
            <FormContainer spacing={2}>
                <Stack
                    direction="row"
                    sx={{
                        flex: "1 1 100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h6" id="tableTitle" component="div">
                        Tache et Objectifs
                    </Typography>
                </Stack>
                <Stack direction="column" spacing={2}>
                    <Stack direction="row" spacing={2}>
                        <OSTextField
                            fullWidth
                            id="outlined-basic"
                            label="S/N"
                            variant="outlined"
                            name="sn"
                        />
                        <OSTextField
                            fullWidth
                            id="outlined-basic"
                            label=" Tâche clés"
                            variant="outlined"
                            name="keyTasks"
                        />
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <OSTextField
                            fullWidth
                            id="outlined-basic"
                            label="Timeframe"
                            variant="outlined"
                            name="timeFrame"
                        />
                        <OSTextField
                            fullWidth
                            id="outlined-basic"
                            label="Resultat attendus"
                            variant="outlined"
                            name="expectedResult"
                        />
                        <OSTextField
                            fullWidth
                            id="outlined-basic"
                            label="Ressources "
                            variant="outlined"
                            name="resources"
                        />
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <OSSelectField
                            fullWidth
                            id="outlined-basic"
                            label="Responsable"
                            options={employees}
                            dataKey="name"
                            valueKey="id"
                            variant="outlined"
                            name="responsableId"
                        />
                        <Autocomplete
                            fullWidth
                            multiple
                            id="tags-standard"
                            options={employees}
                            getOptionLabel={(employee: any) =>
                                `${employee.name} ${employee.surname}` as string
                            }
                            value={selectedEmployes}
                            onChange={(event, newValue) => {
                                setSelectedEmployes(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    id="outlined-basic"
                                    label="Sélectionnez participant"
                                    variant="outlined"
                                />
                            )}
                        />
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <OSTextField
                            fullWidth
                            id="outlined-basic"
                            label="Notes"
                            variant="outlined"
                            name="notes"
                        />
                        <OSSelectField
                            fullWidth
                            id="outlined-basic"
                            options={statuslist}
                            dataKey="status"
                            valueKey="id"
                            label="Status"
                            variant="outlined"
                            name="statusId"
                        />
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <OSDatePicker
                            fullWidth
                            id="outlined-basic"
                            label="Date début"
                            variant="outlined"
                            value={formikProps.values.startDate!}
                            onChange={(value: any) => formikProps.setFieldValue("startDate", value)}
                            name="startDate"
                        />
                        <OSDatePicker
                            fullWidth
                            id="outlined-basic"
                            label="Date fin"
                            variant="outlined"
                            value={formikProps.values.endDate!}
                            onChange={(value: any) => formikProps.setFieldValue("endDate", value)}
                            name="endDate"
                        />
                    </Stack>
                </Stack>
            </FormContainer>
            <Box>
                <FormContainer spacing={2}>
                    <Stack
                        direction="row"
                        sx={{
                            flex: "1 1 100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h6" id="tableTitle" component="div">
                            Objectifs annuels
                        </Typography>
                    </Stack>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Titre objectifd</TableCell>
                                    <TableCell align="left">année</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {valuesArticle?.map((item: any, index: any) => (
                                    <TableRow
                                        key={index}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{item.objectiveTitle}</TableCell>
                                        <TableCell align="left">{item.year} Ar</TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{ width: 150, background: "#F5F5F5" }}
                                        >
                                            <Stack
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="center"
                                                spacing={2}
                                            >
                                                <IconButton
                                                    color="warning"
                                                    aria-label="Supprimer"
                                                    component="span"
                                                    size="small"
                                                    onClick={() => {
                                                        formikProps.setFieldValue('objectiveTitle', item.objectiveTitle);
                                                        formikProps.setFieldValue('year', item.year);
                                                        setIdValues(item.id)
                                                    }}
                                                >
                                                    <EditIcon color="primary" />
                                                </IconButton>
                                                <IconButton
                                                    color="warning"
                                                    aria-label="Supprimer"
                                                    component="span"
                                                    size="small"
                                                    onClick={() => {
                                                        setIdDelete((prev: any[]) => {
                                                            let temp = [...prev]
                                                            temp.push({
                                                                id: item.id
                                                            })
                                                            return temp
                                                        })
                                                        setValuesArticle((prev: any[]) => {
                                                            let temp = [...prev]
                                                            temp.splice(index, 1)
                                                            return temp
                                                        })
                                                    }}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow
                                    key="index"
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <FormControl fullWidth>
                                            <OSTextField
                                                id="objectiveTitle"
                                                label="Titre objectifs"
                                                name="objectiveTitle"
                                                type="text"
                                            />
                                        </FormControl>
                                    </TableCell>
                                    <TableCell align="left">
                                        <FormControl fullWidth>
                                            <OSTextField
                                                id="yar"
                                                label="Année"
                                                name="year"
                                                type="number"
                                                min="0"
                                            />
                                        </FormControl>
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ width: 150, background: "#F5F5F5" }}
                                    >
                                        <Stack
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            spacing={2}
                                        >
                                            <IconButton
                                                type="button"
                                                onClick={() => {
                                                    const objectiveTitle = formikProps.values.objectiveTitle;
                                                    const year = formikProps.values.year;
                                                    if (objectiveTitle.trim()) {
                                                        if (idValues) {
                                                            setValuesArticle((prev: any[]) => {
                                                                let temp = [...prev.map((ValId) => {
                                                                    if (ValId.id === idValues) {
                                                                        return {
                                                                            id: idValues,
                                                                            objectiveTitle,
                                                                            year
                                                                        }
                                                                    }
                                                                    return ValId
                                                                })]
                                                                return temp
                                                            })
                                                        } else {
                                                            setValuesArticle((prev: any[]) => {
                                                                let temp = [...prev]
                                                                temp.push({
                                                                    objectiveTitle,
                                                                    year
                                                                })
                                                                return temp
                                                            })
                                                        }
                                                        formikProps.setFieldValue('objectiveTitle', '');
                                                        formikProps.setFieldValue('year', 0);
                                                    }

                                                }}
                                            >
                                                <Check color="primary" />
                                            </IconButton>
                                            <IconButton
                                                type="button"
                                                onClick={() => {
                                                    formikProps.setFieldValue('objectiveTitle', '');
                                                    formikProps.setFieldValue('year', 0);
                                                }}
                                            >
                                                <Close />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </FormContainer>
            </Box>
            <AddNewTacheEtObjectifs selectedEmployes={selectedEmployes} />
        </Form>
    )
}

export default NewTacheEtObjectifs;

const FormContainer = styled(Stack)(({ theme }) => ({
    padding: 30,
    borderRadius: 20,
    background: "#fff",
    marginBottom: 30,
}));

const NavigationContainer = styled(Stack)(({ theme }) => ({
    flexDirection: "column",
    marginBottom: theme.spacing(2),
    flex: 1,
    width: "100%",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: "5px",
}));