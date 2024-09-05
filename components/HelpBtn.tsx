"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HelpBtn = () => {
  const pathname = usePathname();

  return (
    <Link
      className="font-bold text-blue-600"
      href={`/help?ref=${encodeURIComponent(pathname)}`}
    >
      Create support ticket
    </Link>
  );
};

export default HelpBtn;
