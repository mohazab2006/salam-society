"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteRecord } from "@/lib/actions";

interface Props {
  id: string;
  table?: string;
}

export default function AdminEventActions({ id, table = "events" }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirming) { setConfirming(true); return; }
    setDeleting(true);
    try {
      await deleteRecord(table, id);
      router.refresh();
    } catch {
      setDeleting(false);
    }
  }

  const editHref = `/admin/${table}/${id}/edit`;

  return (
    <div className="flex items-center justify-end gap-2">
      <Link
        href={editHref}
        className="px-3 py-1.5 rounded-lg text-xs font-600 text-gray-600 border border-gray-200 hover:border-orange-brand hover:text-orange-brand transition-all"
      >
        Edit
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className={`px-3 py-1.5 rounded-lg text-xs font-600 transition-all ${
          confirming
            ? "bg-red-100 text-red-700 border border-red-300 hover:bg-red-200"
            : "text-gray-400 border border-gray-200 hover:border-red-300 hover:text-red-500"
        }`}
      >
        {deleting ? "…" : confirming ? "Confirm?" : "Delete"}
      </button>
      {confirming && !deleting && (
        <button
          onClick={() => setConfirming(false)}
          className="px-2 py-1.5 text-xs text-gray-400 hover:text-gray-600"
        >
          Cancel
        </button>
      )}
    </div>
  );
}
