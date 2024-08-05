import React from 'react';
import jsPDF from 'jspdf';
import { FaDownload } from 'react-icons/fa';

const Receipt = ({ sale }) => {
  const handleDownload = () => {
    const doc = new jsPDF();

    // Add logo image using a public URL
    const logoURL = './logo.jpg'; // Replace with your image URL
    const imgWidth = 70; // Set the desired width
    const imgHeight = 50; // Set the desired height
    const pageWidth = doc.internal.pageSize.getWidth();
    const imgX = (pageWidth - imgWidth) / 2;

    doc.addImage(logoURL, 'JPEG', imgX, 10, imgWidth, imgHeight);
    doc.setFont('Arial')
    // Center business info
    doc.setFontSize(18);
    const businessText = 'East Cantoment Pharmacy';
    const businessTextWidth = doc.getTextWidth(businessText);
    const businessTextX = (pageWidth - businessTextWidth) / 2;
    doc.text(businessText, businessTextX, imgHeight + 20);

    // Add additional business info
    doc.setFontSize(12);
    const additionalInfo = [
      'Accra, Near Tudu - Greater Accra, GS-0243-3433',
      '+233246383833',
      'info@eastcantoment@gmail.com',
      'https://ecpl.com.gh/s1/'
    ];
    additionalInfo.forEach((text, index) => {
      const textWidth = doc.getTextWidth(text);
      const textX = (pageWidth - textWidth) / 2;
      doc.text(text, textX, imgHeight + 30 + (index * 10));
    });

    // Add customer info
    doc.text(`Customer Name: ${sale.customerName}`, 10, imgHeight + 70);
    doc.text(`Phone: ${sale.phoneNumber}`, 10, imgHeight + 80);
    doc.text(`Email: ${sale.email}`, 10, imgHeight + 90);

    // Add sale details
    doc.setFontSize(16);
    doc.text(`Receipt #: ${sale._id}`, 10, imgHeight + 110);
    doc.text(`Date: ${new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(sale.date))}`, 10, imgHeight + 120);

    // Table header
    doc.setFontSize(12);
    doc.text('Medicine', 10, imgHeight + 140);
    doc.text('Unit Price', 70, imgHeight + 140);
    doc.text('Quantity', 120, imgHeight + 140);
    doc.text('Total', 170, imgHeight + 140);


    // Table body
    const startY = imgHeight + 150;
    doc.text(sale.name, 10, startY);
    doc.text(`GH¢${sale.unitPrice.toFixed(2)}`, 70, startY);
    doc.text(sale.quantity.toString(), 120, startY);
    doc.text(`GH¢${(sale.unitPrice * sale.quantity).toFixed(2)}`, 170, startY);

    // Total
    doc.text(`Total: GH¢${(sale.unitPrice * sale.quantity).toFixed(2)}`, 10, startY + 20);

    // Footer
    doc.text('Thank you for your purchase! This receipt is generated automatically and does not require a signature.', 10, startY + 40);

    doc.save(`receipt_${sale._id}.pdf`);
  };

  return (
    <button onClick={handleDownload} title="Download receipt">
      <FaDownload className="text-green-500 hover:text-green-300 cursor-pointer" />
    </button>
  );
};

export default Receipt;
