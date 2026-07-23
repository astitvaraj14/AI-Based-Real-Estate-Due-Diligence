import ActivityTimeline from "../timeline/ActivityTimeline";

export default function RecentActivity({
  properties = [],
}) {
  return (
    <ActivityTimeline
      properties={properties}
    />
  );
}