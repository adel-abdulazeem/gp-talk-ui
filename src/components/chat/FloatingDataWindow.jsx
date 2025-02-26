import { useState  } from 'react';
const FloatingDataWindow = ({ data, format }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 40, y: 40 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const renderContent = () => {
    switch (format) {
      case 'mermaid':
        return <div className="mermaid-diagram">{data}</div>;
      case 'code':
        return <pre className="p-4 bg-gray-800 text-white rounded"><code>{data}</code></pre>;
      case 'text':
        return <div className="p-4 whitespace-pre-wrap">{data}</div>;
      default:
        return <div className="p-4">{data}</div>;
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 ${
        isMinimized ? 'w-64 h-8' : 'w-[600px] h-[400px]'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 1000,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Window Header */}
      <div 
        className="flex justify-between items-center px-2 border-b border-gray-200 dark:border-gray-700 cursor-pointer"
        onMouseDown={handleMouseDown}
        onDoubleClick={() => setIsMinimized(!isMinimized)}
      >
        <h3 className="font-semibold dark:text-white">
           Preview
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            {isMinimized ? '🗖' : '🗕'}
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            ×
          </button>
        </div>
      </div>

      {/* Window Content */}
      {!isMinimized && (
        <div className="h-[calc(100%-40px)] overflow-auto">
          {renderContent()}
        </div>
      )}
    </div>
  );
};

export default FloatingDataWindow