"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  return <div>{JSON.stringify(data)}</div>;
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
