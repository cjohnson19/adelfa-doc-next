import { Separator } from "../separator";
import { Muted } from "../typography";

export default function Footer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Separator className="mt-8 mb-4" />
      <Muted>{children}</Muted>
    </>
  );
}
