import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuContentProps,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeOptionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
}

export const ThemeOptions = ({
  children,
  side = "bottom",
  sideOffset = 12,
}: ThemeOptionsProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // Prevents mismatched rendering

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        align="start"
        className="w-50"
      >
        {/* Light Theme */}
        <DropdownMenuItem
          className="p-3 cursor-pointer"
          onClick={() => setTheme("light")}
        >
          <Sun className="h-4 w-4 mr-2" />
          Light
        </DropdownMenuItem>

        {/* Dark Theme */}
        <DropdownMenuItem
          className="p-3 cursor-pointer"
          onClick={() => setTheme("dark")}
        >
          <Moon className="h-4 w-4 mr-2" />
          Dark
        </DropdownMenuItem>

        {/* Device Theme */}
        <DropdownMenuItem
          className="p-3 cursor-pointer"
          onClick={() => setTheme("system")}
        >
          <Monitor className="h-4 w-4 mr-2" />
          Device
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
