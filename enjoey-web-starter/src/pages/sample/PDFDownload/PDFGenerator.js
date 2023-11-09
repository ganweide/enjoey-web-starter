import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const PdfGenerator = () => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  return (
    <div>
      <PDFViewer width="1000" height="600">
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>Date: {today}</Text>
              <Text>Amount: {100.00}</Text>
              <Text>Customer Name: {customer_name}</Text>
              <Text>Invoice Number: {invoice_number}</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default PdfGenerator;
