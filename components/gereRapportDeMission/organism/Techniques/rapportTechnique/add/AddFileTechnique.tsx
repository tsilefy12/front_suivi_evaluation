import { Button, Container, Stack, FormLabel } from "@mui/material";
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

const AddFileTechnique = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;
  const fetchRapportTechnique = useFetchRapportTechnique();
  const { rapportTechniqueList } = useAppSelector(
    (state) => state.rapportTechnique
  );

  const dataRapportTechnique = async () => {
    await fetchRapportTechnique();
  };

  useEffect(() => {
    dataRapportTechnique();
  }, []);

  const [data, setData] = useState<any>([]);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    const temp = [
      ...rapportTechniqueList.filter((f) => f.missionId === id),
    ].reverse();
    setData(temp[0]);
    if (temp[0]?.pieceJointe) {
      setDownloadUrl(temp[0].pieceJointe);
    }
  }, [id, rapportTechniqueList]);

  const handleSubmit = async (values: any) => {
    values.missionId = id;
    try {
      if (values.pieceJointe && values.pieceJointe.name) {
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

  // Télécharger le fichier PDF
  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "file.zip");
      document.body.appendChild(link);
      link.click();

      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
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
              <Stack direction="row" gap={2}>
                {downloadUrl && (
                  <Button
                    variant="outlined"
                    color="info"
                    component="a"
                    onClick={handleDownload}
                    sx={{
                      "&:hover": {
                        backgroundColor: "info.main",
                        color: "white",
                      },
                    }}
                  >
                    Télécharger
                  </Button>
                )}
                {downloadUrl && (
                  <FormLabel sx={{ wordBreak: "break-word" }}>
                    <a
                      href={downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {downloadUrl}
                    </a>
                  </FormLabel>
                )}
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddFileTechnique;
