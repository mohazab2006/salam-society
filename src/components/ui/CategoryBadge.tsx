import type { AudienceCategory } from "@/lib/types";

const config: Record<AudienceCategory, { label: string; className: string; icon: string }> = {
  brothers: {
    label: "Brothers",
    className: "badge-brothers",
    icon: "♂",
  },
  sisters: {
    label: "Sisters",
    className: "badge-sisters",
    icon: "♀",
  },
  everyone: {
    label: "Everyone",
    className: "badge-everyone",
    icon: "✦",
  },
};

interface Props {
  category: AudienceCategory;
  size?: "sm" | "md";
}

export default function CategoryBadge({ category, size = "md" }: Props) {
  const { label, className, icon } = config[category];
  return (
    <span className={`badge ${className} ${size === "sm" ? "text-[0.65rem] px-2 py-0.5" : ""}`}>
      <span>{icon}</span>
      {label}
    </span>
  );
}
