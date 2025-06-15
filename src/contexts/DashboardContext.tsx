
import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { DashboardContextType, Case, ColumnId, Widget } from '@/types/dashboard';
import { mockCases } from '@/data/mockCases';
import { defaultCenterWidgets, defaultRightWidgets } from '@/data/defaultWidgets';

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [centerWidgets, setCenterWidgets] = useState<Widget[]>(defaultCenterWidgets);
  const [rightWidgets, setRightWidgets] = useState<Widget[]>(defaultRightWidgets);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [recentCases] = useState<Case[]>(mockCases);
  const [selectedCase, setSelectedCase] = useState<Case | null>(mockCases[0]);
  const [comparisonCase, setComparisonCase] = useState<Case | null>(null);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(prev => !prev);
  }, []);

  const selectCase = useCallback((caseId: string) => {
    const found = recentCases.find(c => c.id === caseId);
    if (found) {
      setSelectedCase(found);
      // Reset comparison case if it's the same as the selected case
      if (comparisonCase && comparisonCase.id === caseId) {
        setComparisonCase(null);
      }
    }
  }, [recentCases, comparisonCase]);

  const selectComparisonCase = useCallback((caseId: string | null) => {
    if (!caseId) {
      setComparisonCase(null);
      return;
    }
    
    const found = recentCases.find(c => c.id === caseId);
    if (found && (!selectedCase || found.id !== selectedCase.id)) {
      setComparisonCase(found);
    }
  }, [recentCases, selectedCase]);

  const moveWidget = useCallback((
    widgetId: string, 
    sourceColumn: ColumnId, 
    destinationColumn: ColumnId, 
    newPosition: number
  ) => {
    // Handle moving widgets between and within columns
    const sourceWidgets = sourceColumn === 'centerColumn' ? centerWidgets : rightWidgets;
    const targetWidgets = destinationColumn === 'centerColumn' ? centerWidgets : rightWidgets;
    
    const widgetIndex = sourceWidgets.findIndex(w => w.id === widgetId);
    if (widgetIndex === -1) return;
    
    const widget = {...sourceWidgets[widgetIndex]};
    
    // If moving within the same column
    if (sourceColumn === destinationColumn) {
      const updatedWidgets = [...sourceWidgets];
      updatedWidgets.splice(widgetIndex, 1);
      updatedWidgets.splice(newPosition, 0, {...widget, position: newPosition});
      
      // Update positions for all widgets
      const reorderedWidgets = updatedWidgets.map((w, idx) => ({...w, position: idx}));
      
      if (sourceColumn === 'centerColumn') {
        setCenterWidgets(reorderedWidgets);
      } else {
        setRightWidgets(reorderedWidgets);
      }
    } 
    // If moving between columns
    else {
      // Remove from source
      const updatedSourceWidgets = sourceWidgets.filter(w => w.id !== widgetId);
      
      // Add to destination
      const updatedTargetWidgets = [...targetWidgets];
      updatedTargetWidgets.splice(newPosition, 0, {...widget, position: newPosition});
      
      // Update positions for all widgets in both columns
      const reorderedSourceWidgets = updatedSourceWidgets.map((w, idx) => ({...w, position: idx}));
      const reorderedTargetWidgets = updatedTargetWidgets.map((w, idx) => ({...w, position: idx}));
      
      if (sourceColumn === 'centerColumn') {
        setCenterWidgets(reorderedSourceWidgets);
        setRightWidgets(reorderedTargetWidgets);
      } else {
        setRightWidgets(reorderedSourceWidgets);
        setCenterWidgets(reorderedTargetWidgets);
      }
    }
  }, [centerWidgets, rightWidgets]);

  const toggleWidgetEnabled = useCallback((widgetId: string, columnId: ColumnId) => {
    if (columnId === 'centerColumn') {
      setCenterWidgets(widgets => 
        widgets.map(widget => 
          widget.id === widgetId ? {...widget, enabled: !widget.enabled} : widget
        )
      );
    } else {
      setRightWidgets(widgets => 
        widgets.map(widget => 
          widget.id === widgetId ? {...widget, enabled: !widget.enabled} : widget
        )
      );
    }
  }, []);

  const resizeWidget = useCallback((widgetId: string, columnId: ColumnId, newSize: 'small' | 'medium' | 'large') => {
    if (columnId === 'centerColumn') {
      setCenterWidgets(widgets => 
        widgets.map(widget => 
          widget.id === widgetId ? {...widget, size: newSize} : widget
        )
      );
    } else {
      setRightWidgets(widgets => 
        widgets.map(widget => 
          widget.id === widgetId ? {...widget, size: newSize} : widget
        )
      );
    }
  }, []);

  return (
    <DashboardContext.Provider value={{
      centerWidgets,
      rightWidgets,
      sidebarCollapsed,
      selectedCase,
      recentCases,
      comparisonCase,
      toggleSidebar,
      moveWidget,
      toggleWidgetEnabled,
      resizeWidget,
      selectCase,
      selectComparisonCase
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

// Export the hook from here to maintain backward compatibility
export { useDashboard } from '@/hooks/useDashboard';
