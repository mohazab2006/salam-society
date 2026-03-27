import { Metadata } from "next";
import ProgramForm from "@/components/admin/ProgramForm";

export const metadata: Metadata = { title: "Add Program" };

export default function NewProgramPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-700 text-gray-900">Add New Program</h1>
        <p className="text-gray-500 text-sm mt-1">Fill in the details below to publish a new program.</p>
      </div>
      <ProgramForm />
    </div>
  );
}
