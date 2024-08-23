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
import { Document, Page, pdf, View, Text } from "@react-pdf/renderer";

const AddFileTechnique = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;
  const fetchRapportTechnique = useFetchRapportTechnique();
  const { rapportTechniqueList } = useAppSelector(
    (state) => state.rapportTechnique
  );
  const [data, setData] = useState<any>([]);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    const dataRapportTechnique = async () => {
      await fetchRapportTechnique();
    };
    dataRapportTechnique();
  }, [fetchRapportTechnique]);

  useEffect(() => {
    const temp = [
      ...rapportTechniqueList.filter((f) => f.missionId === id),
    ].reverse();
    setData(temp[0]);
  }, [id, rapportTechniqueList]);

  const Documents = ({ pieceJointe }: { pieceJointe: string }) => (
    <Document>
      <Page size="A4">
        <View>
          <Text>{pieceJointe}</Text> {/* Replace with actual content */}
        </View>
      </Page>
    </Document>
  );

  const clickPDF = async () => {
    try {
      const pdfBlob = await pdf(
        <Documents pieceJointe={data.pieceJointe} />
      ).toBlob();
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(pdfBlob);
      downloadLink.download = "Rapport.pdf";
      downloadLink.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

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
                <Button
                  variant="outlined"
                  color="info"
                  sx={{
                    "&:hover": {
                      backgroundColor: "info.main",
                      color: "white",
                    },
                  }}
                  onClick={clickPDF}
                >
                  Télécharger
                </Button>
                <FormLabel>{data?.pieceJointe}</FormLabel>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddFileTechnique;
