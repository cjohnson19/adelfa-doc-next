import AdelfaLogo from "../adelfa-logo";
import Link from "next/link";

export default function HomeButton() {
  return (
    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <AdelfaLogo className="h-6 w-6" />
        <span className="">Adelfa</span>
      </Link>
    </div>
  );
}
