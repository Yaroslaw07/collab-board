import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";

interface FooterProps {
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  isFavorite: boolean;
  onClick: () => void;
  disabled: boolean;
}

export const Footer = ({
  title,
  authorLabel,
  createdAtLabel,
  isFavorite,
  onClick,
  disabled,
}: FooterProps) => {
  return (
    <div className="relative bg-white p-3">
      <p className="text-[16px] font-medium truncate max-w-[calc(100%-20px)]">
        {title}
      </p>
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px]">
        {authorLabel} - {createdAtLabel}
      </p>
      <button
        disabled={disabled}
        onClick={() => {}}
        className={cn(
          "opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-[#0e766e] hover:scale-110",
          disabled && "cursor-not-allowed opacity-75"
        )}
      >
        <Heart
          className={cn(
            "h-4 w-4 ",
            isFavorite && "fill-[#0e766e] text-[#0e766e]"
          )}
        />
      </button>
    </div>
  );
};
