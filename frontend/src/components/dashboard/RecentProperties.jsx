import PropertyTable from "../tables/PropertyTable";

export default function RecentProperties({
  properties = [],
  onDelete,
}) {
  return (
    <PropertyTable
      properties={properties}
      onDelete={onDelete}
    />
  );
}