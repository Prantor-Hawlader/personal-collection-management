export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col w-full gap-4">
      <div className="inline-block text-center justify-center">{children}</div>
    </section>
  );
}
