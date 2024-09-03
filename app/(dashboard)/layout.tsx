import { auth, clerkClient } from "@clerk/nextjs/server";
import { Navbar } from "./_components/navbar";
import { OrgSidebar } from "./_components/org-sidebar";
import { Sidebar } from "./_components/sidebar";
import { Metadata } from "next";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className="h-full px-1 py-1">
      <Sidebar />
      <div className="pl-[60px] h-full">
        <div className="flex h-full">
          <OrgSidebar />
          <div className="h-full flex-1">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export async function generateMetadata(): Promise<Metadata> {
  const { orgId } = auth();

  if (!orgId) {
    return {
      title: "No organization's dashboard",
      description: "Dashboard for no organization",
    };
  }

  const client = clerkClient();

  const org = await client.organizations.getOrganization({
    organizationId: orgId,
  });

  return {
    title: `${org.name}'s Dashboard`,
    description: `Dashboard for ${org.name} with collection of boards`,
  };
}

export default DashboardLayout;
