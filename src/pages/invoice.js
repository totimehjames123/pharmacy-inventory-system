import React from 'react';
import jsPDF from 'jspdf';

const SimplePDFPage = () => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Hello world!', 10, 10);
    doc.save('sample.pdf');
  };

  return (
    <div>
      <h1>Generate a Simple PDF</h1>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default SimplePDFPage;
