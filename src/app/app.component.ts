import { ParticipantFormComponent } from './participant/participant-form/participant-form.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';
import { EtitquetteComponent } from './etitquette/etitquette.component';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ParticipantFormComponent,EtitquetteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hbc';

  pdfContent: any;

  constructor(private sanitizer: DomSanitizer) {}
  generatePDF() {
    const doc = new jsPDF(
      {
        orientation: "landscape",
        unit: "in",
        format: 'a5'
      }
    );


    const elementToPrint = document.getElementById('elementToPrint');

    html2canvas(elementToPrint!).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = (canvas.height * pageWidth) / canvas.width;
      doc.text("Hello world!", 10, 10);
      doc.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
      doc.autoPrint({ variant: 'non-conform' });
      doc.save('pdf.pdf');
    });
  }

  //generation de l'etiquette
  generateEtiquette() {
    this.pdfContent = null;
    const doc = new jsPDF(
      {
        // orientation: "landscape",
        // unit: "in",
        // format: 'a4'
      }
    );


    const elementToPrint = document.getElementById('etiquettePrint');

    html2canvas(elementToPrint!).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = (canvas.height * pageWidth) / canvas.width;
      doc.text("Hello world!", 10, 10);
      doc.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);

      //this.pdfContent = this.sanitizer.bypassSecurityTrustResourceUrl(`data:application/pdf;base64,${btoa(doc.output())}`);
      //doc.autoPrint({ variant: 'non-conform' });

      const pdfDataUri = doc.output('datauristring');
      this.pdfContent = this.sanitizer.bypassSecurityTrustResourceUrl(pdfDataUri);
      //doc.save('pdf.pdf');
    });
  }

  viewPDF() {
    this.generatePDF();
  }

  generatePDF2() {

    const doc2 = new jsPDF();

    // Dimensions du tableau
    const tableWidth = 170;
    const rowHeight = 10;
    const columnWidth = tableWidth / data[0].length;

    // Écrire l'en-tête du tableau
    doc2.setFontSize(12);
    doc2.setFont('bold');
    doc2.text("Premier tableau", 10, 10);
    data[0].forEach((header, index) => {
      doc2.text(header.toString(), 20 + index * columnWidth, 20);
    });

    // Écrire les données du tableau
    doc2.setFontSize(10);
    //doc.setFont('normal');
    data.slice(1).forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        doc2.text(cell.toString(), 20 + columnIndex * columnWidth, 30 + (rowIndex + 1) * rowHeight);
      });
    });

    // Enregistrer le PDF
    doc2.save('tableau.pdf');

  }

  generatePDF3() {
    const doc = new jsPDF();

    // // Dimensions du tableau
    // const tableWidth = 170;
    // const rowHeight = 10;
    // const columnWidth = tableWidth / data[0].length;

    // // Écrire les données du tableau
    // doc.setFontSize(10);
    // doc.setFont('helvetica', 'normal');

    // data.forEach((row, rowIndex) => {
    //   if (rowIndex > 0 && (rowIndex - 1) % 28 === 0) { // Ajouter une nouvelle page tous les 28 lignes
    //     doc.addPage();
    //     doc.setFontSize(12);
    //     doc.setFont('helvetica', 'bold');
    //     data[0].forEach((header, index) => {
    //       doc.text(header.toString(), 20 + index * columnWidth, 20);
    //     });
    //     doc.setFontSize(10);
    //     doc.setFont('helvetica', 'normal');
    //   }

    //   row.forEach((cell, columnIndex) => {
    //     doc.text(cell.toString(), 20 + columnIndex * columnWidth, 30 + (rowIndex % 28) * rowHeight);
    //   });
    // });

    // Dimensions du tableau
    const tableWidth = 170;
    const rowHeight = 10;
    const columnWidth = tableWidth / data[0].length;

    // Écrire les données du tableau
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    data.forEach((row, rowIndex) => {
      if (rowIndex === 0) { // Écrire l'en-tête sur la première page
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        row.forEach((header, index) => {
          doc.text(header.toString(), 20 + index * columnWidth, 20);
        });
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
      }

      if (rowIndex > 0) {
        if ((rowIndex - 1) % 28 === 0) { // Ajouter une nouvelle page tous les 28 lignes
          doc.addPage();
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          data[0].forEach((header, index) => {
            doc.text(header.toString(), 20 + index * columnWidth, 20);
          });
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
        }

        row.forEach((cell, columnIndex) => {
          doc.text(cell.toString(), 20 + columnIndex * columnWidth, 30 + ((rowIndex - 1) % 28) * rowHeight);
        });
      }
    });

    // Enregistrer le PDF
    doc.save('tableau.pdf');
  }

  generatePDF4() {
    const doc = new jsPDF();

    // Dimensions du tableau
    const tableWidth = 170;
    const rowHeight = 10;
    const columnWidth = tableWidth / data[0].length;

    // Écrire les données du tableau
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    data.forEach((row, rowIndex) => {
      if (rowIndex === 0) { // Écrire l'en-tête sur la première page
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        row.forEach((header, index) => {
          doc.text(header.toString(), 20 + index * columnWidth, 20);
        });
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
      }

      if (rowIndex > 0) {
        if (rowIndex <= 22) { // Écrire les 5 premières lignes de données sur la première page
          row.forEach((cell, columnIndex) => {
            doc.text(cell.toString(), 20 + columnIndex * columnWidth, 30 + (rowIndex - 1) * rowHeight);
          });
        } else if ((rowIndex - 23) % 28 === 0) { // Ajouter une nouvelle page tous les 28 lignes (en commençant à la 6ème ligne)
          doc.addPage();
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          data[0].forEach((header, index) => {
            doc.text(header.toString(), 20 + index * columnWidth, 20);
          });
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          row.forEach((cell, columnIndex) => {
            doc.text(cell.toString(), 20 + columnIndex * columnWidth, 30);
          });
        } else {
          row.forEach((cell, columnIndex) => {
            doc.text(cell.toString(), 20 + columnIndex * columnWidth, 30 + ((rowIndex - 6) % 28) * rowHeight);
          });
        }
      }
    });

    // Enregistrer le PDF
    doc.save('tableau.pdf');
  }

  generatePDF6() {
    const doc = new jsPDF();

    doc.text("Liste des admin",10,10);

    autoTable(doc, {
      headStyles: {
        fillColor: [52, 73, 94], // Couleur de fond de l'en-tête
        textColor: 255, // Couleur du texte de l'en-tête
        fontSize: 12,
        fontStyle: 'bold',
      },

      head: [['Name', 'Prenom', 'Country']],
      body: data
    });

    const pdfDataUri = doc.output('datauristring');
      this.pdfContent = this.sanitizer.bypassSecurityTrustResourceUrl(pdfDataUri);
    // doc.save('table.pdf');
  }
}


// Données du tableau
const data = [

  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],
  ['John', 'Doe', 35],
  ['Jane', 'Doe', 32],
  ['Bob', 'Smith', 45],


];
