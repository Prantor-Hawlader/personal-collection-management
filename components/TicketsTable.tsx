"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Chip,
} from "@nextui-org/react";
import Link from "next/link";
import { format } from "date-fns";

export default function TicketsTable({ issues }: any) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(issues.length / rowsPerPage);

  return (
    <div className="w-1/2">
      <Table
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
        fullWidth={false}
      >
        <TableHeader>
          <TableColumn key="name">Ticket</TableColumn>
          <TableColumn key="status">Status</TableColumn>
          <TableColumn key="status">Created</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No tickets found">
          {issues.map((ticket: any) => (
            <TableRow key={ticket.id}>
              <TableCell>
                <Link
                  className="text-blue-600 font-bold underline"
                  href={`https://collectioner.atlassian.net/browse/${ticket.key}`}
                  target="_blank"
                >
                  {ticket.fields.summary}
                </Link>{" "}
              </TableCell>
              <TableCell>
                {" "}
                {ticket.fields.customfield_10045.value === "Opened" && (
                  <Chip color="primary" size="sm">
                    {ticket.fields.customfield_10045.value}
                  </Chip>
                )}
                {ticket.fields.customfield_10045.value === "In progress" && (
                  <Chip color="warning" size="sm">
                    {ticket.fields.customfield_10045.value}
                  </Chip>
                )}
                {ticket.fields.customfield_10045.value === "Fixed" && (
                  <Chip color="success" size="sm">
                    {ticket.fields.customfield_10045.value}
                  </Chip>
                )}
                {ticket.fields.customfield_10045.value === "Rejected" && (
                  <Chip color="danger" size="sm">
                    {ticket.fields.customfield_10045.value}
                  </Chip>
                )}
              </TableCell>
              <TableCell>
                {format(ticket.fields.created, "MMMM dd, yyyy HH:mm:ss")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
