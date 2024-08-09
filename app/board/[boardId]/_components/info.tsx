"use client";

export const Info = () => {
  return (
    <div className="absolute top-2 left-2 bg-background rounded-md px-1.5 h-12 flex items-center shadow-md">
      Board information
      {/* TODO: Information about the board */}
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-background rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
  );
};
