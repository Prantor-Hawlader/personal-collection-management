"use client";
import React from "react";
import {
  Table,
  Skeleton,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function CollectionSkeleton() {
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Table>
      <TableHeader>
        <TableColumn>
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200" />
          </Skeleton>
        </TableColumn>
        <TableColumn>
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200" />
          </Skeleton>
        </TableColumn>
        <TableColumn>
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200" />
          </Skeleton>
        </TableColumn>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row}>
            <TableCell>
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200" />
              </Skeleton>
            </TableCell>
            <TableCell>
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200" />
              </Skeleton>
            </TableCell>
            <TableCell>
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200" />
              </Skeleton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
