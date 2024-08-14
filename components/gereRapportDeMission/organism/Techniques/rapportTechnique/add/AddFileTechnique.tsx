import { Button, Container, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import OSFileUpload from "../../../../../shared/input/OSFileUpload";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/reduxHooks";
import { createFile } from "../../../../../../redux/features/file/fileSlice";
import { createRapportTechnique } from "../../../../../../redux/features/rapportTechnique";
import { useRouter } from "next/router";


const AddFileTechnique = () => {
    const dispatch = useAppDispatch();
    const {rapportFinance} = useAppSelector((state) => state.rapportFinance);
    const router = useRouter();
    const {id} = router.query;
    // const {} = useAppSelecto((state) =>state.file);
    const handleSubmit = async (values: any) => {
        values.missionId = id;
        try {
            if (values.pieceJointe && values.pieceJointe.name !== null) {
                const formData = new FormData();
                formData.append("file", values.pieceJointe);
                const { images } = await dispatch(
                  createFile(formData)
                ).unwrap();
                values.pieceJointe = images[0].url;
              }
              await dispatch(createRapportTechnique(values)).unwrap();
        } catch (e) {
          console.log(e);
        }
      };
  return (
      <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
        <Formik
          initialValues={{
            pieceJointe: null,
          }}
          onSubmit={(values: any, action: any) => {
            handleSubmit(values);
            action.resetForm();
          }}
        >
            {(formikProps) =>(
                <Form>
                    <Stack direction="column" gap={2}>
                    <OSFileUpload name="pieceJointe" label="Pièce jointe" />
                    <Button variant="contained" type="submit">
                        Enregistrer
                    </Button>
                    </Stack>
                </Form>
            )}
        </Formik>
      </Container>
  );
};

export default AddFileTechnique;