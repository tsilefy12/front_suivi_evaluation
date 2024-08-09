// GrantsListPDF.js
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { Button } from "@mui/material";
import { Download } from "@mui/icons-material";

// Define styles for your PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 20,
  },
  table: {
    display: "flex",
    width: "auto",
    margin: "10px 0",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    padding: 5,
    flex: 1,
  },
  header: {
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
  cell: {
    textAlign: "center",
  },
});

const GrantsListPDF = ({ data }: any) => {
  const pdfDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.header]}>
              <Text style={styles.cell}>Deadline</Text>
            </View>
            <View style={[styles.tableCell, styles.header]}>
              <Text style={styles.cell}>Grant Code</Text>
            </View>
            <View style={[styles.tableCell, styles.header]}>
              <Text style={styles.cell}>Bailleur</Text>
            </View>
            <View style={[styles.tableCell, styles.header]}>
              <Text style={styles.cell}>Project Title</Text>
            </View>
            <View style={[styles.tableCell, styles.header]}>
              <Text style={styles.cell}>Titre du Projet</Text>
            </View>
            <View style={[styles.tableCell, styles.header]}>
              <Text style={styles.cell}>Start</Text>
            </View>
            <View style={[styles.tableCell, styles.header]}>
              <Text style={styles.cell}>End</Text>
            </View>
            <View style={[styles.tableCell, styles.header]}>
              <Text style={styles.cell}>Amount</Text>
            </View>
            <View style={[styles.tableCell, styles.header]}>
              <Text style={styles.cell}>Currency</Text>
            </View>
            <View style={[styles.tableCell, styles.header]}>
              <Text style={styles.cell}>Status</Text>
            </View>
            <View style={[styles.tableCell, styles.header]}>
              <Text style={styles.cell}>MV Lead</Text>
            </View>
            <View style={[styles.tableCell, styles.header]}>
              <Text style={styles.cell}>Validation Technique</Text>
            </View>
            <View style={[styles.tableCell, styles.header]}>
              <Text style={styles.cell}>Verification Financiere</Text>
            </View>
            <View style={[styles.tableCell, styles.header]}>
              <Text style={styles.cell}>Validation Financiere</Text>
            </View>
          </View>
          {data.map((row: any, index: any) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCell}>
                <Text>{row.deadline}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.code}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.bailleur}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.projectTitle}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.titleFr}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.startDate}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.endDate}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.amount}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.currency}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.status}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.mvLead}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.validationTechnique}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.verificationFinanciere}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.validationFinanciere}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
  const clickPDF = async () => {
    const pdfBlob = await pdf(pdfDocument).toBlob();
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = "Grants_Monitoring.pdf";
    downloadLink.click();
  };
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Download />}
        onClick={clickPDF}
      >
        PDF
      </Button>
    </>
  );
};

export default GrantsListPDF;
