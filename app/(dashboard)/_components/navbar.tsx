"use client";

import {
  OrganizationSwitcher,
  UserButton,
  useOrganization,
} from "@clerk/nextjs";

import { useTheme } from "next-themes";

import { ThemeOptions } from "@/components/theme/theme-options";
import { Button } from "@/components/ui/button";
import { getIconByCurrentTheme } from "@/lib/utils";

import { SearchInput } from "./search-input";
import { SettingsButton } from "./settings-button";
import { TabSeparator } from "@/app/board/[boardId]/_components/tab-separator";

export const Navbar = () => {
  const { organization } = useOrganization();
  const { theme } = useTheme();

  const ThemeIcon = getIconByCurrentTheme(theme!);

  return (
    <div className="flex items-center gap-x-2 px-6 py-2 ">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
      <div className="block lg:hidden flex-1">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "376px",
              },
              organizationSwitcherTrigger: {
                padding: "8px",
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                justifyContent: "space-between",
                backgroundColor: "#F9FAFB",
              },
            },
          }}
        />
      </div>
      <TabSeparator />
      <ThemeOptions side="bottom">
        <Button variant="outline">
          <ThemeIcon className=" h-5" />
        </Button>
      </ThemeOptions>
      {organization && <SettingsButton />}
      <TabSeparator />
      <UserButton />
    </div>
  );
};
