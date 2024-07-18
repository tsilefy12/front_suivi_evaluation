import React from "react";
import { Flare, Print } from "@mui/icons-material";
import { Button } from "@mui/material";
import {
  Document,
  StyleSheet,
  Page,
  pdf,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";

const PrintPdf = () => {
  const pdfDocument = (
    <Document>
      <Page size="A4">
        <View>
          <View
            style={{
              paddingTop: 40,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              paddingLeft: 10,
              paddingRight: 20,
            }}
          >
            <Image
              style={styles.logo}
              src={`/logistique/images/logo/MV_logo.png`}
            />
            <Text
              style={{
                border: 1.5,
                paddingTop: 5,
                paddingBottom: 13,
                width: "65%",
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                color: "#D2691E",
                fontWeight: "bold",
                backgroundColor: "rgb(164, 199, 84)",
              }}
            >
              Validation rapport de mission
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: 35,
              fontSize: 12,
              paddingTop: 20,
            }}
          >
            <Text style={{ paddingBottom: 3 }}>Titre : Rapport de mission</Text>
            <Text style={{ paddingBottom: 3 }}>
              Type : Mission (ou Administration)
            </Text>
            <Text style={{ paddingBottom: 3 }}>Référence budget : </Text>
            <Text style={{ paddingBottom: 3 }}>
              Gestionnaires : (nom et prénoms séparé par un , ou ; ou - )
            </Text>
            <Text style={{ paddingBottom: 3 }}>Du …………….. au ……………..</Text>
            <Text>Description :</Text>
          </View>
        </View>
        <View
          style={{
            paddingTop: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              width: "100%",
              color: "black",
              fontWeight: "bold",
              fontSize: 15,
              paddingBottom: 5,
            }}
          >
            RÉSUMÉ DES DEPENSES PREVUES
          </Text>
          <View style={{ paddingLeft: 35, paddingRight: 35 }}>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCellHeader}>Grant</Text>
                </View>
                <View style={styles.tableCol}>
                  <View style={styles.flexColumn}>
                    <Text style={[styles.tableCellHeader]}>Ligne</Text>
                    <Text style={[styles.tableCellHeader, styles.flexEnd]}>
                      budgétaire
                    </Text>
                  </View>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCellHeader}>Dépenses prévus</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCellHeader}>Budget de dépense</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCellHeader}>Différence</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCellHeader}>Remarques</Text>
                </View>
              </View>
              {/* Table Body */}
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Grant 1</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Ligne 1</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>1000</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>900</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>100</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Note</Text>
                </View>
              </View>
              {/* Table Body */}
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.colMerged]}>
                  <Text style={styles.tableCellColaps}>TOTAL BUDGET REÇU</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingle]}>
                  <Text style={styles.tableCell}>1000</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingle]}>
                  <Text style={styles.tableCell}>900</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingle]}>
                  <Text style={styles.tableCell}>100</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingle]}>
                  <Text style={styles.tableCell}>Note</Text>
                </View>
              </View>
              {/* Table Body */}
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.colMerged]}>
                  <Text style={styles.tableCellColaps}>DÉPENSE TOTAL</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingle]}>
                  <Text style={styles.tableCell}>1000</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingle]}>
                  <Text style={styles.tableCell}>900</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingle]}>
                  <Text style={styles.tableCell}>100</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingle]}>
                  <Text style={styles.tableCell}>Note</Text>
                </View>
              </View>
              {/* Table Body */}
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.colMerged]}>
                  <Text style={styles.tableCellColaps}>RESTE</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingle]}>
                  <Text style={styles.tableCell}>1000</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingle]}>
                  <Text style={styles.tableCell}>900</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingle]}>
                  <Text style={styles.tableCell}>100</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingle]}>
                  <Text style={styles.tableCell}>Note</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ paddingTop: 10 }}>
          <Text
            style={{
              textAlign: "center",
              width: "100%",
              color: "black",
              fontWeight: "bold",
              fontSize: 15,
              paddingBottom: 5,
            }}
          >
            VALIDATION
          </Text>
          <View style={{ paddingLeft: 35, paddingRight: 35 }}>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCellHeader}>Poste</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCellHeader}>Signature</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCellHeader}>Date</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCellHeader}>Lieu</Text>
                </View>
              </View>
              {/* Table Body */}
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.colMergedTBValidated]}>
                  <Text style={styles.tableCellTBValidated}>
                    Élaboré par : (nom et prénoms)
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCell}>Poste 1</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCell}>Signature 1</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCell}>Date 1</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCell}>Lieu 1</Text>
                </View>
              </View>
              {/* Table Body */}
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.colMergedTBValidated]}>
                  <Text style={styles.tableCellTBValidated}>
                    Vérificateur financier : (nom et prénoms)
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCell}>Poste 1</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCell}>Signature 1</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCell}>Date 1</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCell}>Lieu 1</Text>
                </View>
              </View>
              {/* Table Body */}
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.colMergedTBValidated]}>
                  <Text style={styles.tableCellTBValidated}>
                    Validateur financier : (nom et prénoms)
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCell}>Poste 1</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCell}>Signature 1</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCell}>Date 1</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCell}>Lieu 1</Text>
                </View>
              </View>
              {/* Table Body */}
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.colMergedTBValidated]}>
                  <Text style={styles.tableCellTBValidated}>
                    Vérificateur technique : (nom et prénoms)
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCell}>Poste 1</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCell}>Signature 1</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCell}>Date 1</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCell}>Lieu 1</Text>
                </View>
              </View>
              {/* Table Body */}
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.colMergedTBValidated]}>
                  <Text style={styles.tableCellTBValidated}>
                    Payé par : (nom et prénoms)
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCell}>Poste 1</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCell}>Signature 1</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCell}>Date 1</Text>
                </View>
                <View style={[styles.tableCol, styles.colSingleTBValidated]}>
                  <Text style={styles.tableCell}>Lieu 1</Text>
                </View>
              </View>
              {/* Add more rows as needed */}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  const clickPDF = async () => {
    const pdfBlob = await pdf(pdfDocument).toBlob();
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = "test.pdf";
    downloadLink.click();
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Print />}
        onClick={clickPDF}
      >
        Imprimer
      </Button>
    </>
  );
};

export default PrintPdf;

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
    textAlign: "center",
  },
  tableCol: {
    width: "20%", // Ajustement pour correspondre à la longueur souhaitée
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  tableCellColaps: {
    margin: 5,
    fontSize: 10,
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  colMerged: {
    width: "40%", // 16.6% * 2
  },
  colSingle: {
    width: "20%",
  },
  colMergedTBValidated: {
    width: "100%", // 20% * 2
  },
  colSingleTBValidated: {
    width: "100%",
  },
  tableCellTBValidated: {
    margin: 5,
    fontSize: 10,
    textAlign: "left",
  },
  flexEnd: {
    marginTop: -4,
  },
  logo: {
    width: 80,
    height: 70,
  },
});
