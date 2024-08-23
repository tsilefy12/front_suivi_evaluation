import { Button, Container, Stack, FormLabel } from "@mui/material";
import { Form, Formik } from "formik";
import OSFileUpload from "../../../../../shared/input/OSFileUpload";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import { createFile } from "../../../../../../redux/features/file/fileSlice";
import { createRapportFinance } from "../../../../../../redux/features/rapportFinance";
import { useRouter } from "next/router";
import useFetchRapportFinance from "../hooks/useFetchRapportFinance";
import { useEffect, useState } from "react";
import { Document, Page, pdf, View, Text } from "@react-pdf/renderer";

const AddFile = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;
  const fetchRapportFinance = useFetchRapportFinance();
  const { rapportFinanceList } = useAppSelector(
    (state) => state.rapportFinance
  );

  const dataRapportFinance = async () => {
    await fetchRapportFinance();
  };
  useEffect(() => {
    dataRapportFinance();
  }, []);

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const temp = [
      ...rapportFinanceList.filter((f) => f.missionId === id),
    ].reverse();
    setData(temp[0]);
  }, [id, rapportFinanceList]);

  const handleSubmit = async (values: any) => {
    values.missionId = id;
    try {
      if (values.pieceJointe && values.pieceJointe.name !== null) {
        const formData = new FormData();
        formData.append("file", values.pieceJointe);
        const { images } = await dispatch(createFile(formData)).unwrap();
        values.pieceJointe = images[0].url;
      }
      await dispatch(createRapportFinance(values)).unwrap();
      fetchRapportFinance();
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
                {data?.pieceJointe && (
                  <Button
                    variant="outlined"
                    color="info"
                    component="a"
                    href={data.pieceJointe}
                    download="Rapport financier.pdf"
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
                <FormLabel>{data?.pieceJointe}</FormLabel>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddFile;
