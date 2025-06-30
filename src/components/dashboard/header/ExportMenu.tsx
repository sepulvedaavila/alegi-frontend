import { useState, useRef, useEffect } from 'react';
import { Download, ChevronDown, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { exportDashboardToPDF, exportDashboardToCSV } from '@/utils/exportUtils';
import { useDashboard } from '@/contexts/DashboardContext';

interface ExportMenuProps {
  dashboardRef: React.RefObject<HTMLDivElement>;
}

const ExportMenu = ({ dashboardRef }: ExportMenuProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);
  const { recentCases } = useDashboard();

  const handleExportToPDF = async () => {
    if (!dashboardRef.current) return;
    
    setIsExporting(true);
    try {
      toast.loading('Exporting dashboard to PDF...');
      await exportDashboardToPDF(dashboardRef.current, 'Dashboard');
      toast.success('Dashboard exported to PDF successfully');
    } catch (error) {
      console.error('Error exporting dashboard:', error);
      toast.error('Failed to export dashboard');
    } finally {
      setIsExporting(false);
      setShowExportMenu(false);
    }
  };

  const handleExportToCSV = () => {
    setIsExporting(true);
    try {
      // Export all case data to CSV
      exportDashboardToCSV(recentCases, 'Dashboard');
      toast.success('Dashboard exported to CSV successfully');
    } catch (error) {
      console.error('Error exporting dashboard to CSV:', error);
      toast.error('Failed to export dashboard to CSV');
    } finally {
      setIsExporting(false);
      setShowExportMenu(false);
    }
  };

  // Close the export menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setShowExportMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={exportMenuRef}>
      <button
        onClick={() => setShowExportMenu(!showExportMenu)}
        disabled={isExporting}
        className="flex items-center px-3 py-1.5 rounded-md bg-alegi-blue text-white hover:bg-alegi-blue/90 transition-colors disabled:opacity-50"
      >
        <Download size={16} className="mr-1.5" />
        <span>Export</span>
        <ChevronDown size={14} className="ml-1" />
      </button>
      
      {showExportMenu && (
        <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <ul className="py-1">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-sm" onClick={handleExportToPDF}>
              <FileText size={14} className="mr-2" />
              PDF
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-sm" onClick={handleExportToCSV}>
              <FileText size={14} className="mr-2" />
              CSV
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExportMenu;
