import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import { Settings } from "lucide-react";

export const SettingsButton = () => {
  const { openOrganizationProfile } = useClerk();

  return (
    <Button
      variant="outline"
      onClick={() => openOrganizationProfile({ routing: "hash" })}
    >
      <Settings className="h-4 w-4 mr-2" />
      Org Settings
    </Button>
  );
};
