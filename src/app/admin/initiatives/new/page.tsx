import InitiativeForm from "@/components/admin/InitiativeForm";

export default function NewInitiativePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-700 text-gray-900">New Initiative</h1>
        <p className="text-gray-500 text-sm mt-1">Add a new initiative to the Impact section.</p>
      </div>
      <InitiativeForm />
    </div>
  );
}
