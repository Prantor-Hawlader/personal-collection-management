"use client";
import React from "react";
import { format } from "date-fns";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import Link from "next/link";

export default function RecentItem({ recentItems }: any) {
  return (
    <div className="mt-3">
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Item name</TableColumn>
          <TableColumn>Collection</TableColumn>
          <TableColumn>Author</TableColumn>
          <TableColumn>Created time</TableColumn>
        </TableHeader>
        <TableBody>
          {recentItems.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell>
                {" "}
                <Link
                  className="text-blue-600 font-mono text-bold"
                  href={`/item/${item.id}`}
                >
                  {item.name}
                </Link>{" "}
              </TableCell>
              <TableCell>{item.collection.name}</TableCell>
              <TableCell>{item.collection.user.name}</TableCell>
              <TableCell> {format(new Date(item.createdAt), "PPpp")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
