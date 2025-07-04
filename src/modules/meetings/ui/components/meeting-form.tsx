import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { meetingsInsertSchema } from "../../schemas";

import { GeneratedAvatar } from "@/components/ui/generate-avatar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { CommandSelect } from "@/components/command-select";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";

interface MeetingFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: {
    id: string;
    agentId: string;
    name: string;
  };
  defaultAgentId?: string;
}

export const MeetingForm = ({
  onSuccess,
  onCancel,
  initialValues,
  defaultAgentId,
}: MeetingFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
  const [agentSearch, setAgentSearch] = useState("");

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  );

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        onSuccess?.(data.id);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        if (initialValues?.id) {
          queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id })
          );
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
        // TODO: Check if error code "FORBIDDEN", redirect to /upgrade
      },
    })
  );

  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? defaultAgentId ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;
  const isFromAgentPage = !!defaultAgentId;

  const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEdit) {
      updateMeeting.mutate({ ...values, id: initialValues.id });
    } else {
      createMeeting.mutate(values);
    }
  };

  return (
    <>
      <NewAgentDialog
        open={openNewAgentDialog}
        onOpenChange={setOpenNewAgentDialog}
      />
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel> Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Briefly describe meeting details"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          {isFromAgentPage ? (
            <FormItem>
              <FormLabel>Agent</FormLabel>
              <FormControl>
                <div className="px-3 py-2 border rounded bg-muted text-muted-foreground">
                  {agents.data?.items.find(
                    (agent) => agent.id === defaultAgentId
                  )?.name ?? "Loading..."}
                </div>
              </FormControl>
            </FormItem>
          ) : (
            <FormField
              name="agentId"
              control={form.control}
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel> Agent</FormLabel>
                    <FormControl>
                      <CommandSelect
                        options={(agents.data?.items ?? []).map((agent) => ({
                          id: agent.id,
                          value: agent.id,
                          children: (
                            <div className="flex items-center gap-x-2">
                              <GeneratedAvatar
                                seed={agent.name}
                                variant="botttsNeutral"
                                className="border size-6"
                              />
                              <span>{agent.name}</span>
                            </div>
                          ),
                        }))}
                        onSelect={field.onChange}
                        onSearch={setAgentSearch}
                        value={field.value}
                        placeholder="Select an Agent"
                      />
                    </FormControl>
                    <FormDescription>
                      Not found what you&apos;re looking for?{" "}
                      <button
                        type="button"
                        className="text-primary hover:underline"
                        onClick={() => setOpenNewAgentDialog(true)}
                      >
                        Create new agent
                      </button>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
          )}
          <div className="flex justify-between gap-x-2">
            {onCancel && (
              <Button
                variant="ghost"
                disabled={isPending}
                type="button"
                onClick={() => onCancel()}
              >
                Cancel
              </Button>
            )}
            <Button disabled={isPending} type="submit">
              {isEdit ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
