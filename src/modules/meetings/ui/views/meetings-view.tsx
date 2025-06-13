"use client";

import { DataTable } from "@/components/data-table";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data={data.items} columns={columns} />
    </div>
  );
};

export const MeetingsLoadingView = () => {
  return <LoadingState title="Loading Agents" description="please wait" />;
};

export const MeetingsErrorView = () => {
  return (
    <ErrorState
      title="Error loading agents"
      description="something went wrong"
    />
  );
};
