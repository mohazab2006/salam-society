import { Metadata } from "next";
import EventForm from "@/components/admin/EventForm";

export const metadata: Metadata = { title: "Add Event" };

export default function NewEventPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-700 text-gray-900">Add New Event</h1>
        <p className="text-gray-500 text-sm mt-1">Fill in the details below to publish a new event.</p>
      </div>
      <EventForm />
    </div>
  );
}
