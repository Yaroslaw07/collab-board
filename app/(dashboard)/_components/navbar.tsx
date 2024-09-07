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
    <div className="flex items-center gap-x-2 px-6 py-2">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
      <div className="block lg:hidden flex-1 w-full">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              },
              organizationSwitcherTrigger:
                "p-[8px] w-[100%] rounded-md border-2 shadow-sm justify-between items-center border-[#0F172A] ",
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
