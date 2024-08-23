import { Button, Container, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import OSFileUpload from "../../../../../shared/input/OSFileUpload";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import { createFile } from "../../../../../../redux/features/file/fileSlice";
import { createRapportTechnique } from "../../../../../../redux/features/rapportTechnique";
import { useRouter } from "next/router";
import useFetchRapportTechnique from "../hooks/useFetchRapportTechnique";
import { useEffect, useState } from "react";
import { FormLabel } from "@mui/material";

const AddFileTechnique = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;
  const fetchRapportTechnique = useFetchRapportTechnique();
  const { rapportTechniqueList } = useAppSelector(
    (state) => state.rapportTechnique
  );
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchRapportTechnique();
  }, []);

  const temp = [
    ...rapportTechniqueList.filter((f) => f.missionId == id),
  ].reverse();
  const data = temp[0];
  console.log(data);
  const handleSubmit = async (values: any) => {
    values.missionId = id;
    try {
      if (values.pieceJointe && values.pieceJointe.name !== null) {
        const formData = new FormData();
        formData.append("file", values.pieceJointe);
        const { images } = await dispatch(createFile(formData)).unwrap();
        values.pieceJointe = images[0].url;
        setDownloadUrl(images[0].url);
      }
      await dispatch(createRapportTechnique(values)).unwrap();
      fetchRapportTechnique();
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
        {(formikProps) => (
          <Form>
            <Stack direction="column" gap={2}>
              <OSFileUpload name="pieceJointe" label="Pièce jointe" />
              <Button variant="contained" type="submit">
                Enregistrer
              </Button>
              {rapportTechniqueList
                .filter((f) => f.missionId == id)
                .map((m) => (
                  <Stack direction="row" gap={2}>
                    <Button
                      variant="outlined"
                      color="info"
                      component="a"
                      href={m.pieceJointe}
                      download
                    >
                      Télécharger
                    </Button>
                    <FormLabel>{m.pieceJointe}</FormLabel>
                  </Stack>
                ))}
            </Stack>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddFileTechnique;
