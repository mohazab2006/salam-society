import { Metadata } from "next";
import MediaForm from "@/components/admin/MediaForm";

export const metadata: Metadata = { title: "Add Media" };

export default function NewMediaPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-700 text-gray-900">Add Media</h1>
        <p className="text-gray-500 text-sm mt-1">
          Add a photo or video to the Moments section.
        </p>
      </div>
      <MediaForm />
    </div>
  );
}
