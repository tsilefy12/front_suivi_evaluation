import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import {
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  styled,
  TableHead,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddAutreInfoAuto from "../add/addAutreInfoAuto";
import { useRouter } from "next/router";
import { useConfirm } from "material-ui-confirm";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import useFetchVehicleList from "../hooks/useFetchVehicleList";
import {
  deleteVehicle,
  editVehicle,
} from "../../../../../../redux/features/vehicle";
import { VehicleItem } from "../../../../../../redux/features/vehicle/vehicleSlice.interface";

const ListAutreInfoAuto = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const router = useRouter();
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const { idfile }: any = router.query;
  const { vehicleList } = useAppSelector((state) => state.vehicle);
  const usefetchVehicleListe = useFetchVehicleList();

  React.useEffect(() => {
    usefetchVehicleListe();
  }, [router.query]);

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer Vehicule de mission",
      description: "Voulez-vous vraiment supprimer cet Vehicule ?",
      cancellationText: "Annuler",
      confirmationText: "Supprimer",
      cancellationButtonProps: {
        color: "warning",
      },
      confirmationButtonProps: {
        color: "error",
      },
    })
      .then(async () => {
        await dispatch(deleteVehicle({ id }));
        usefetchVehicleListe();
      })
      .catch(() => {});
  };
  const handleClickEdit = async (id: any) => {
    await dispatch(editVehicle({ id }));
    handleClickOpen();
  };

  return (
    <Container>
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <MyTableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Assurance</TableCell>
                  <TableCell align="left">Visite technique</TableCell>
                  <TableCell align="left">
                    Voiture de location ou privé?
                  </TableCell>
                  <TableCell align="left">Ceinture de securite</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vehicleList.map((row: VehicleItem) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.insuranceVehicle}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.technicalVisitVehicle}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.vehicleType}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.safetyBeltVehicle}
                    </TableCell>
                    <TableCell align="right">
                      <BtnActionContainer
                        direction="row"
                        justifyContent="right"
                      >
                        <IconButton
                          color="primary"
                          aria-label="Modifier"
                          component="span"
                          onClick={() => handleClickEdit(row.id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="warning"
                          aria-label="Supprimer"
                          component="span"
                          onClick={() => {
                            handleClickDelete(row.id);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </BtnActionContainer>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </MyTableContainer>
        </Box>
      </Box>
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        <Button variant="text" color="info" onClick={handleClickOpen}>
          Ajouter
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <AddAutreInfoAuto handleClose={handleClose} />
        </Dialog>
      </SectionNavigation>
    </Container>
  );
};

export default ListAutreInfoAuto;

const MyTableContainer = styled(Stack)(({ theme }) => ({
  borderRadius: 20,
  background: "#fff",
  // bottom: 2,
}));
export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({
  paddingTop: "20px",
}));
