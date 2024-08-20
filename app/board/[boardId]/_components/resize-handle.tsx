interface ResizeHandleProps {
  cursor: string;
  x: number;
  y: number;
  onPointerDown: (e: React.PointerEvent<SVGRectElement>) => void;
}

const HANDLE_WIDTH = 8;

const ResizeHandle: React.FC<ResizeHandleProps> = ({
  cursor,
  x,
  y,
  onPointerDown,
}) => {
  return (
    <rect
      className="fill-background stroke-1 stroke-blue-500"
      x={0}
      y={0}
      style={{
        cursor: cursor,
        width: `${HANDLE_WIDTH}px`,
        height: `${HANDLE_WIDTH}px`,
        transform: `translate(${x - HANDLE_WIDTH / 2}px, ${y - HANDLE_WIDTH / 2}px)`,
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        onPointerDown(e);
      }}
    />
  );
};

export default ResizeHandle;
