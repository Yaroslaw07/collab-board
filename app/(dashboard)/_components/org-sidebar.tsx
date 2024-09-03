"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { useSearchParams } from "next/navigation";

import { OrganizationSwitcher, useOrganization } from "@clerk/nextjs";
import { Banknote, LayoutDashboard, Star } from "lucide-react";
import { useAction, useQuery } from "convex/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { Badge } from "@/components/ui/badge";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const OrgSidebar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites") === "true";

  const { organization } = useOrganization();
  const isSubscribed = useQuery(api.subscriptions.getIsSubscribed, {
    orgId: organization?.id,
  });

  const portal = useAction(api.stripe.portal);
  const pay = useAction(api.stripe.pay);

  const [pending, setPending] = useState(false);

  const onClick = async () => {
    if (!organization?.id) return;
    setPending(true);

    try {
      const action = isSubscribed ? portal : pay;
      const redirectUrl = await action({ orgId: organization.id });

      window.location.href = redirectUrl;
    } catch {
      toast.error("Failed to redirect to payments");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="hidden lg:flex flex-col space-y-4 w-[206px] pl-5 pt-3">
      <Link href="/">
        <div className="flex items-center justify-center">
          <Image src="logo.svg" width={100} height={100} alt="Logo" />
          <span
            className={cn(
              "font-semibold text-primary text-2xl text-center",
              font.className
            )}
          >
            Collab Board
          </span>
          {isSubscribed && <Badge variant="secondary">PRO</Badge>}
        </div>
      </Link>
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
      <div className="space-y-1 w-full">
        <Button
          variant={favorites ? "ghost" : "secondary"}
          asChild
          size="lg"
          className="font-normal justify-start px-2 w-full"
        >
          <Link href="/">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Team Boards
          </Link>
        </Button>

        <Button
          variant={!favorites ? "ghost" : "secondary"}
          asChild
          size="lg"
          className="font-normal justify-start px-2 w-full"
        >
          <Link href={{ pathname: "/", query: { favorites: true } }}>
            <Star className="h-4 w-4 mr-2" />
            Favorite boards
          </Link>
        </Button>
        <Button
          onClick={onClick}
          disabled={pending}
          variant="ghost"
          size="lg"
          className="font-normal justify-start px-2 w-full"
        >
          <Banknote className="h-4 w-4 mr-2" />
          {isSubscribed ? "Payment settings" : "Upgrade"}
        </Button>
      </div>
    </div>
  );
};
