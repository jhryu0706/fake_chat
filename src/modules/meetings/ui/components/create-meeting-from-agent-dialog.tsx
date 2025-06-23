import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import { useRouter } from "next/navigation";

interface MeetingFromAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultAgent: {
    id: string;
    name: string;
  };
}

export const MeetingFromAgentDialog = ({
  open,
  onOpenChange,
  defaultAgent,
}: MeetingFromAgentDialogProps) => {
  const router = useRouter();
  return (
    <ResponsiveDialog
      title="Create Meeting"
      description={`Create a meeting with ${defaultAgent.name}`}
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={(id) => {
          onOpenChange(false);
          router.push(`/meetings/${id}`);
        }}
        onCancel={() => onOpenChange(false)}
        defaultAgentId={defaultAgent.id}
      />
    </ResponsiveDialog>
  );
};
