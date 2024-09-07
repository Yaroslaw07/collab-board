"use client";

import { ThemeOptions } from "@/components/theme/theme-options";
import { Button } from "@/components/ui/button";
import { getIconByCurrentTheme } from "@/lib/utils";
import { useTheme } from "next-themes";

const ThemeButton: React.FC = () => {
  const { theme } = useTheme();

  const Icon = getIconByCurrentTheme(theme!);

  return (
    <div className="absolute bottom-3 left-3 bg-background rounded-md p-1 shadow-md">
      <ThemeOptions side="right" sideOffset={10} align="end">
        <Button size="icon" variant="board">
          <Icon />
        </Button>
      </ThemeOptions>
    </div>
  );
};

export const ThemeButtonSkeleton = () => {
  return (
    <div className="absolute bottom-3 left-3 bg-background rounded-md p-1 w-12 h-12 shadow-md" />
  );
};

export default ThemeButton;
