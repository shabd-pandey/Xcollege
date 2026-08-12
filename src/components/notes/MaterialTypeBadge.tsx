import type { MaterialType } from "@/types";
import { Badge } from "@/components/ui/Badge";

const typeConfig: Record<MaterialType, { label: string; variant: "blue" | "amber" | "green" | "red" }> = {
  notes: { label: "Notes", variant: "blue" },
  pyq: { label: "PYQ", variant: "amber" },
  assignment: { label: "Assignment", variant: "green" },
  practical: { label: "Practical", variant: "red" },
};

export function MaterialTypeBadge({ type }: { type: MaterialType }) {
  const config = typeConfig[type];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
