import { title, subtitle } from "@/components/primitives";

export default function Home() {
  console.log("HOme rendered");

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Hello&nbsp;</h1>
        <h1 className={title({ color: "cyan" })}>World&nbsp;</h1>
        <br />

        <h2 className={subtitle({ class: "mt-4" })}>
          Beautiful Personal Collection Management Application
        </h2>
      </div>
    </section>
  );
}
