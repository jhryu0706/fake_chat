import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";

interface Props {
  onLeave: () => void;
  meetingName: string;
}

export const CallActive = ({ onLeave, meetingName }: Props) => {
  return (
    <div className="flex flex-col justify-between p-4 h-full text-black bg-[#aed7c098]">
      <div className="p-4 flex items-center gap-4">
        <h4 className="text-4xl">In meeting: {meetingName}</h4>
      </div>
      <SpeakerLayout />
      <div>
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  );
};
