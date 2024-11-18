"use client";
import React from "react";
import EmptyOrg from "./_components/EmptyOrg";
import { useOrganization } from "@clerk/nextjs";
import BoardList from "./_components/board-list";

// Define the interface for the page props
interface DashboardPageProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

const DashboardPage = ({ searchParams }: DashboardPageProps) => {
  const { organization } = useOrganization();


  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {/* Use JSON.stringify for debugging, but ensure the access is properly structured */}
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList
          orgId={organization.id}
          query={searchParams}
        />
      )}
    </div>
  );
};

export default DashboardPage;
