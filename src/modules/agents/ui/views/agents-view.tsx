"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { DataTable } from "../components/data-table";
import { columns } from "@/modules/agents/ui/components/columns";

export const AgentsView = () => {
  const trpc = useTRPC();
  // Data can never be null when using useSuspenseQuery. Therefore no need to rely on isLoading or isError
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export const AgentsLoadingView = () => {
  return <LoadingState title="Loading Agents" description="please wait" />;
};

export const AgentsErrorView = () => {
  return (
    <ErrorState
      title="Error loading agents"
      description="something went wrong"
    />
  );
};
