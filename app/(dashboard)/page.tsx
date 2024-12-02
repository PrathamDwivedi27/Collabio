"use client"
import React from "react";
import EmptyOrg from "./_components/EmptyOrg";
import { useOrganization } from "@clerk/nextjs";
import BoardList from "./_components/board-list";

// Define the interface for the page props
interface DashboardPageProps {
  searchParams?: Record<string, string | undefined>;
}

const DashboardPage = ({ searchParams }: DashboardPageProps) => {
  const { organization } = useOrganization();

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList
          orgId={organization.id}
          query={searchParams as Record<string, string | undefined>} // Type assertion
        />
      )}
    </div>
  );
};


export default DashboardPage;
