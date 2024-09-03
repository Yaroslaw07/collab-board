"use client";

import {
  OrganizationSwitcher,
  UserButton,
  useOrganization,
} from "@clerk/nextjs";
import { SearchInput } from "./search-input";
import { SettingsButton } from "./settings-button";
import { ThemeOptions } from "@/components/theme/theme-options";
import { Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const { organization } = useOrganization();

  return (
    <div className="flex items-center gap-x-2 px-6 py-2">
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
      {organization && <SettingsButton />}
      <ThemeOptions side="bottom">
        <Button variant="outline">
          <Sun className="h-4 w-4" />
        </Button>
      </ThemeOptions>
      <div className="w-1" />
      <UserButton />
    </div>
  );
};
