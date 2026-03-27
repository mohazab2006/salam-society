import { Metadata } from "next";
import PartnerForm from "@/components/admin/PartnerForm";

export const metadata: Metadata = { title: "Add Partner" };

export default function NewPartnerPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-700 text-gray-900">Add Community Partner</h1>
        <p className="text-gray-500 text-sm mt-1">
          Add a mosque or organization to the partners section.
        </p>
      </div>
      <PartnerForm />
    </div>
  );
}
