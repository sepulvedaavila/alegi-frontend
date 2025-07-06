import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

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

// Define the type for case data to avoid TypeScript errors
interface CaseData {
  id?: string;
  title?: string;
  status?: string;
  confidence?: number;
  risk?: string;
  date?: string;
}

export const exportDashboardToCSV = (data: CaseData[] | CaseData | null | undefined, filename: string = 'dashboard') => {
  // We need to extract data from the dashboard to create a CSV
  // This is a simplified implementation that creates CSV with basic case information
  
  // Create CSV header row
  let csvContent = "Case ID,Title,Status,Confidence,Risk,Date\n";
  
  // Add case data row
  if (data && Array.isArray(data) && data.length > 0) {
    data.forEach(item => {
      const row = [
        item.id || '',
        item.title || '',
        item.status || '',
        item.confidence ? `${item.confidence}%` : '',
        item.risk || '',
        new Date().toISOString().split('T')[0]
      ].map(value => `"${value}"`).join(',');
      
      csvContent += row + '\n';
    });
  } else if (data && !Array.isArray(data)) {
    // Handle if data is a single object, not an array
    const item = data as CaseData;
    const row = [
      item.id || '',
      item.title || '',
      item.status || '',
      item.confidence ? `${item.confidence}%` : '',
      item.risk || '',
      new Date().toISOString().split('T')[0]
    ].map(value => `"${value}"`).join(',');
    
    csvContent += row + '\n';
  } else {
    // Add a placeholder row if no data
    csvContent += "\"No cases available\",\"No cases available\",\"No cases available\",\"No cases available\",\"No cases available\",\"" + new Date().toISOString().split('T')[0] + "\"\n";
  }
  
  // Create and download the CSV file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename.replace(/\s+/g, '_').toLowerCase()}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
