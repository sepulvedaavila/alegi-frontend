import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

// Original dashboard export functions (for backward compatibility)
export const exportDashboardToPDF = async (element: HTMLElement, filename: string = 'dashboard') => {
  try {
    // Show a loading toast or indicator if available
    console.log('Starting PDF export...');
    
    // Set higher scale for better quality
    const scale = 2;
    
    // Calculate the full height of the element to ensure we capture everything
    const elemHeight = element.scrollHeight;
    const elemWidth = element.scrollWidth;
    
    console.log(`Element dimensions: ${elemWidth}x${elemHeight}`);
    
    // Save original overflow settings to restore later
    const originalOverflow = document.body.style.overflow;
    const originalHeight = document.body.style.height;
    
    // Temporarily set overflow to ensure we capture everything
    document.body.style.overflow = 'visible';
    document.body.style.height = 'auto';
    
    // Create canvas with full dashboard dimensions
    const canvas = await html2canvas(element, {
      scale: scale,
      useCORS: true, // To handle images from other domains
      logging: true, // Enable logging for debugging
      allowTaint: true,
      backgroundColor: '#f9fafb', // Match the background color
      height: elemHeight,
      width: elemWidth,
      windowHeight: elemHeight,
      windowWidth: elemWidth,
      scrollX: 0,
      scrollY: -window.scrollY, // Adjust for scroll position
      onclone: (clonedDoc) => {
        // Ensure the cloned document has proper dimensions
        const clonedElement = clonedDoc.body.querySelector('[data-dashboard-container]');
        if (clonedElement) {
          (clonedElement as HTMLElement).style.height = `${elemHeight}px`;
          (clonedElement as HTMLElement).style.width = `${elemWidth}px`;
          (clonedElement as HTMLElement).style.overflow = 'visible';
        }
        return clonedDoc;
      }
    });
    
    // Restore original overflow settings
    document.body.style.overflow = originalOverflow;
    document.body.style.height = originalHeight;
    
    console.log(`Canvas dimensions: ${canvas.width}x${canvas.height}`);
    
    // Calculate dimensions for PDF (the canvas is scaled, so we need to divide by scale)
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    console.log(`PDF image dimensions: ${imgWidth}x${imgHeight}`);
    
    // Create PDF document (A4 size)
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Add current date and time
    const now = new Date();
    const dateTimeStr = now.toLocaleString();
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Generated: ${dateTimeStr}`, 10, 10);
    
    // Add title
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`ALEGI - ${filename}`, 10, 20);
    
    // Handle multiple pages if content is too tall
    let position = 30; // Start position after the title
    const margin = 10;
    
    // Convert canvas to image
    const imgData = canvas.toDataURL('image/png');
    
    // If the image height is less than the page height, add it directly
    if (imgHeight < pageHeight - position - margin) {
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth - margin * 2, imgHeight);
      console.log('Added content to a single page');
    } else {
      // If the image is taller than a single page, split it across multiple pages
      let heightLeft = imgHeight;
      let pageNumber = 1;
      
      // Add image to first page
      pdf.addImage(
        imgData, 
        'PNG', 
        margin, 
        position, 
        imgWidth - margin * 2, 
        imgHeight
      );
      
      heightLeft -= (pageHeight - position - margin);
      
      console.log(`Page 1 added. Height left: ${heightLeft}`);
      
      // Add new pages if needed
      while (heightLeft > 0) {
        pageNumber++;
        position = margin; // Reset position for new page
        pdf.addPage();
        
        // Position is negative to show the part of the image that was cut off
        const nextPosition = -(pageHeight - margin) * (pageNumber - 1) + position + 20;
        
        pdf.addImage(
          imgData, 
          'PNG', 
          margin, 
          nextPosition, 
          imgWidth - margin * 2, 
          imgHeight
        );
        
        console.log(`Page ${pageNumber} added with position ${nextPosition}`);
        
        heightLeft -= (pageHeight - margin * 2);
      }
      
      console.log(`Total pages in PDF: ${pageNumber}`);
    }
    
    // Save PDF
    pdf.save(`${filename.replace(/\s+/g, '_').toLowerCase()}_${now.toISOString().split('T')[0]}.pdf`);
    console.log('PDF export completed successfully');
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const exportDashboardToCSV = (data: any[], filename: string) => {
  try {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${filename}.csv`);
  } catch (error) {
    console.error('Error generating CSV:', error);
    throw error;
  }
};

// Unified export utilities for the MVP features
export const exportUtils = {
  toPDF: async (elementId: string, filename: string) => {
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error(`Element with id "${elementId}" not found`);
      }
      
      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`${filename}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  },
  
  toCSV: (data: any[], filename: string) => {
    try {
      const csv = Papa.unparse(data);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, `${filename}.csv`);
    } catch (error) {
      console.error('Error generating CSV:', error);
      throw error;
    }
  },

  toExcel: (data: any[], filename: string) => {
    try {
      // For Excel export, we'll use CSV format which Excel can open
      const csv = Papa.unparse(data);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, `${filename}.xlsx`);
    } catch (error) {
      console.error('Error generating Excel file:', error);
      throw error;
    }
  }
};

// Widget-specific export functions
export const widgetExportUtils = {
  exportCaseAnalysis: (caseData: any, caseId: string) => {
    const exportData = {
      caseId,
      timestamp: new Date().toISOString(),
      analysis: caseData
    };
    
    const elementId = `case-analysis-${caseId}`;
    return exportUtils.toPDF(elementId, `case-analysis-${caseId}`);
  },

  exportPrecedentList: (precedents: any[], caseId: string) => {
    const csvData = precedents.map(precedent => ({
      'Case Name': precedent.caseName,
      'Citation': precedent.citation,
      'Relevance Score': precedent.relevanceScore,
      'Outcome': precedent.outcome,
      'Court': precedent.court,
      'Date': precedent.date,
      'Key Points': precedent.keyPoints.join('; ')
    }));
    
    return exportUtils.toCSV(csvData, `precedents-${caseId}`);
  },

  exportRiskReport: (riskData: any, caseId: string) => {
    const elementId = `risk-report-${caseId}`;
    return exportUtils.toPDF(elementId, `risk-assessment-${caseId}`);
  },

  exportCostEstimate: (costData: any, caseId: string) => {
    const csvData = [
      {
        'Strategy': costData.strategy,
        'Total Min': costData.totalEstimate.min,
        'Total Likely': costData.totalEstimate.likely,
        'Total Max': costData.totalEstimate.max,
        'Attorney Fees Min': costData.breakdown.attorneyFees.min,
        'Attorney Fees Max': costData.breakdown.attorneyFees.max,
        'Court Costs Min': costData.breakdown.courtCosts.min,
        'Court Costs Max': costData.breakdown.courtCosts.max,
        'Expert Witness Min': costData.breakdown.expertWitness.min,
        'Expert Witness Max': costData.breakdown.expertWitness.max,
        'Discovery Min': costData.breakdown.discovery.min,
        'Discovery Max': costData.breakdown.discovery.max,
        'Other Min': costData.breakdown.other.min,
        'Other Max': costData.breakdown.other.max
      }
    ];
    
    return exportUtils.toCSV(csvData, `cost-estimate-${caseId}`);
  }
};


