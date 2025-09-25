import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tabs")({
  component: Tabs
});

function Tabs() {
  return <div>Tabs page</div>;
}
