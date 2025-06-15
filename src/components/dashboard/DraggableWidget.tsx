
import { useRef } from 'react';
import { Widget, ColumnId } from '@/types/dashboard';
import { useDashboard } from '@/hooks/useDashboard';
import { cn } from '@/lib/utils';
import { GripVertical, X, Maximize2, Minimize2, MoreHorizontal } from 'lucide-react';
import WidgetContent from './WidgetContent';

interface DraggableWidgetProps {
  widget: Widget;
  columnId: ColumnId;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDrop: (widgetId: string, position: number) => void;
  isComparison: boolean;
}

const DraggableWidget = ({
  widget,
  columnId,
  onDragStart,
  onDragEnd,
  onDrop,
  isComparison
}: DraggableWidgetProps) => {
  const { toggleWidgetEnabled, resizeWidget } = useDashboard();
  const ref = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('widgetId', widget.id);
    e.dataTransfer.setData('sourceColumn', columnId);
    onDragStart();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const widgetId = e.dataTransfer.getData('widgetId');
    const sourceColumn = e.dataTransfer.getData('sourceColumn') as ColumnId;
    
    // Calculate the position based on the current widget's position
    const position = widget.position;
    
    // Only process if it's a different widget
    if (widgetId !== widget.id) {
      onDrop(widgetId, position);
    }
    
    onDragEnd();
  };

  const handleClose = () => {
    toggleWidgetEnabled(widget.id, columnId);
  };

  const handleResize = () => {
    const sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];
    const currentIndex = sizes.indexOf(widget.size);
    const nextSize = sizes[(currentIndex + 1) % sizes.length];
    resizeWidget(widget.id, columnId, nextSize);
  };

  // Determine height based on widget size
  const getWidgetHeight = () => {
    switch (widget.size) {
      case 'small': return 'min-h-[180px]';
      case 'medium': return 'min-h-[280px]';
      case 'large': return 'min-h-[400px]';
      default: return 'min-h-[280px]';
    }
  };

  return (
    <div
      ref={ref}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={onDragEnd}
      className={cn(
        "border border-gray-200 rounded-lg bg-white shadow-sm",
        getWidgetHeight()
      )}
    >
      <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center cursor-move bg-gray-50 rounded-t-lg">
        <div className="flex items-center">
          <GripVertical size={16} className="text-gray-400 mr-2" />
          <h3 className="text-sm font-medium text-gray-700">{widget.title}</h3>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={handleResize}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            title={widget.size === 'large' ? 'Shrink widget' : 'Enlarge widget'}
          >
            {widget.size === 'large' ? (
              <Minimize2 size={14} className="text-gray-500" />
            ) : (
              <Maximize2 size={14} className="text-gray-500" />
            )}
          </button>
          <button
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            title="More options"
          >
            <MoreHorizontal size={14} className="text-gray-500" />
          </button>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            title="Close widget"
          >
            <X size={14} className="text-gray-500" />
          </button>
        </div>
      </div>
      <div className="p-4 overflow-auto h-[calc(100%-40px)]">
        <WidgetContent type={widget.type} isComparison={isComparison} />
      </div>
    </div>
  );
};

export default DraggableWidget;
