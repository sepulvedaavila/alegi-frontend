
import { useState } from 'react';
import { Widget, ColumnId } from '@/types/dashboard';
import { useDashboard } from '@/hooks/useDashboard';
import DraggableWidget from './DraggableWidget';
import { MoreHorizontal, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface WidgetContainerProps {
  columnId: ColumnId;
  widgets: Widget[];
  title: string;
  isComparison: boolean;
}

const WidgetContainer = ({ columnId, widgets, title, isComparison }: WidgetContainerProps) => {
  const { moveWidget } = useDashboard();
  const [isDragging, setIsDragging] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrop = (widgetId: string, position: number) => {
    moveWidget(widgetId, columnId, columnId, position);
  };

  const handleAddWidget = () => {
    setShowAddMenu(!showAddMenu);
    // This would normally open a dialog to add widgets
    toast("Widget management coming soon", {
      description: "This feature will allow adding and removing widgets",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        <div className="flex gap-2">
          <button 
            onClick={handleAddWidget}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            title="Add widget"
          >
            <Plus size={18} />
          </button>
          <button 
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            title="More options"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>
      <div className={`p-4 space-y-4 min-h-[200px] ${isDragging ? 'bg-blue-50' : ''}`}>
        {widgets
          .sort((a, b) => a.position - b.position)
          .map((widget) => (
            <DraggableWidget
              key={widget.id}
              widget={widget}
              columnId={columnId}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDrop={handleDrop}
              isComparison={isComparison}
            />
          ))}
      </div>
    </div>
  );
};

export default WidgetContainer;
