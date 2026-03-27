"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { AudienceCategory } from "@/lib/types";

const filters: { label: string; value: AudienceCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "♂ Brothers", value: "brothers" },
  { label: "♀ Sisters", value: "sisters" },
  { label: "✦ Everyone", value: "everyone" },
];

interface Props {
  activeCategory?: AudienceCategory;
}

function FilterButtons({ activeCategory }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function handleFilter(value: AudienceCategory | "all") {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const activeValue = activeCategory ?? "all";

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => handleFilter(f.value)}
          className={`px-4 py-2 rounded-full text-sm font-600 transition-all duration-200 ${
            activeValue === f.value
              ? "bg-orange-brand text-white"
              : "bg-white text-gray-600 border border-gray-200 hover:border-orange-brand hover:text-orange-brand"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export default function EventsFilter({ activeCategory }: Props) {
  return (
    <Suspense fallback={<div className="h-10" />}>
      <FilterButtons activeCategory={activeCategory} />
    </Suspense>
  );
}
