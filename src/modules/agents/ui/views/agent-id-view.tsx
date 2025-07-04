"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useState } from "react";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { AgentIdViewHeader } from "../components/agent-id-view-header";
import { GeneratedAvatar } from "@/components/ui/generate-avatar";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateAgentDialog } from "../components/update-agent-dialog";
import { MeetingFromAgentDialog } from "@/modules/meetings/ui/components/create-meeting-from-agent-dialog";
import { Button } from "@/components/ui/button";

interface Props {
  agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);
  const [isMeetingFromAgentDialogOpen, setMeetingFromAgentDialogOpen] =
    useState(false);

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
        //TODO: invalidate free tier usage
        router.push("/agents");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    `The following action will remove ${data.meetingsCount} associated meetings`
  );

  const handleRemoveAgent = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeAgent.mutateAsync({ id: agentId });
  };

  return (
    <>
      <RemoveConfirmation />
      <UpdateAgentDialog
        open={updateAgentDialogOpen}
        onOpenChange={setUpdateAgentDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <AgentIdViewHeader
          agentId={agentId}
          agentName={data.name}
          onEdit={() => setUpdateAgentDialogOpen(true)}
          onRemove={handleRemoveAgent}
        />
        <div className="bg-white rounded-lg border">
          <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
            <MeetingFromAgentDialog
              open={isMeetingFromAgentDialogOpen}
              onOpenChange={setMeetingFromAgentDialogOpen}
              defaultAgent={{ id: agentId, name: data.name }}
            />
            <div className="flex justify-between">
              <div className="flex items-center gap-x-3">
                <GeneratedAvatar
                  variant="botttsNeutral"
                  seed={data.name}
                  className="size-10"
                />
                <h2 className="text-2xl font-medium">{data.name}</h2>
              </div>
              <div className="flex items-center justify-between">
                <Button onClick={() => setMeetingFromAgentDialogOpen(true)}>
                  <PlusIcon />
                  New Meeting
                </Button>
              </div>
            </div>
            <Badge
              variant="outline"
              className="flex items-center gap-x-2 [&>svg]:size-4"
            >
              <VideoIcon className="text-blue-700" />
              {data.meetingsCount}{" "}
              {data.meetingsCount === 1 ? "meeting" : "meetings"}
            </Badge>
            <div className="flex flex-col gap-y-4">
              <p className="text-lg font-medium"> Instructions</p>
              <p className="text-neutral-800">{data.instructions}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const AgentsIdLoadingView = () => {
  return <LoadingState title="Loading Agents" description="please wait" />;
};

export const AgentsIdErrorView = () => {
  return (
    <ErrorState
      title="Error loading agents"
      description="something went wrong"
    />
  );
};
