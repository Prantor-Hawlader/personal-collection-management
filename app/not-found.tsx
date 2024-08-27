import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <h1 className="text-red-500 text-4xl">
        Could not find requested resource
      </h1>

      <Link href="/">
        <h2 className="text-blue-600 text-xl">Return Home</h2>{" "}
      </Link>
    </div>
  );
}
