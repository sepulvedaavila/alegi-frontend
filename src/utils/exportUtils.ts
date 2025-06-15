import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
    csvContent += "\"No data\",\"No data\",\"No data\",\"No data\",\"No data\",\"" + new Date().toISOString().split('T')[0] + "\"\n";
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
