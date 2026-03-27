import { redirect } from "next/navigation";

// About content is on the homepage — redirect with anchor
export default function AboutPage() {
  redirect("/#about");
}
