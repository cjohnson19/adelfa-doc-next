import { Separator } from "@/components/ui/separator";

export default function InternalError() {
  return (
    <div
      data-pagefind-ignore
      className="flex items-center justify-center h-screen"
    >
      <h1 className="text-4xl font-bold">500</h1>
      <Separator orientation="vertical" className="mx-4 h-8" />
      <h1 className="text-4xl font-bold">Internal Server Error</h1>
    </div>
  );
}
