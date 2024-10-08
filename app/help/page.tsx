import { Divider } from "@nextui-org/react";

import { getTickets } from "@/action/getTickets";
import ConnectJira from "@/components/ConnectJira";
import TicketsTable from "@/components/TicketsTable";
import { subtitle } from "@/components/primitives";
import { getSession } from "@/lib/session";

const Help = async () => {
  const issues = await getTickets();
  const session = await getSession();

  if (!session)
    return (
      <div className="text-center text-2xl font-bold">
        Please log in for creating ticket
      </div>
    );

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <div className="w-full flex gap-2 items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">
          If you face any problem with our website, create a ticket with Jira{" "}
        </p>
        <ConnectJira />
      </div>
      <h2 className={subtitle({ class: "text-center" })}>
        Your <span className="text-cyan-300 font-mono">Tickets</span>
      </h2>
      <Divider />

      <TicketsTable issues={issues} />
    </div>
  );
};

export default Help;
