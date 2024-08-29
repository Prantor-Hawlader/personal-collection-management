import {
  Button,
  Chip,
  ChipProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import React from "react";
import { User as Users } from "@prisma/client";

import {
  blockUser,
  deleteUser,
  makeAdmin,
  makeNonAdmin,
  unblockUser,
} from "@/action/user";

import { VerticalDotsIcon } from "./icons/VerticalDotsIcon";

type Props = {
  user: Users;
  columnKey: React.Key;
};
const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  blocked: "danger",
};
const RenderCell = ({ user, columnKey }: Props) => {
  switch (columnKey) {
    case "name":
      return (
        <User
          avatarProps={{ radius: "lg", src: user.image || undefined }}
          description={user.email}
          name={user.name}
        >
          {user.email}
        </User>
      );
    case "role":
      return (
        <div className="flex flex-col">
          <Chip
            className="capitalize"
            color={user.role === "admin" ? "warning" : "secondary"}
            size="sm"
            variant="flat"
          >
            {user.role}
          </Chip>
        </div>
      );
    case "status":
      return (
        <Chip
          className="capitalize"
          color={statusColorMap[user.status]}
          size="sm"
          variant="flat"
        >
          {user.status}
        </Chip>
      );
    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <VerticalDotsIcon className="text-default-300" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem href={`/collection/${user.id}`}>View</DropdownItem>
              {user.role === "user" ? (
                <DropdownItem onClick={() => makeAdmin(user.id)}>
                  Make admin
                </DropdownItem>
              ) : (
                <DropdownItem onClick={() => makeNonAdmin(user.id)}>
                  Make user
                </DropdownItem>
              )}
              {user.status === "active" ? (
                <DropdownItem onClick={() => blockUser(user.id)}>
                  Block
                </DropdownItem>
              ) : (
                <DropdownItem onClick={() => unblockUser(user.id)}>
                  Unblock
                </DropdownItem>
              )}
              <DropdownItem onClick={() => deleteUser(user.id)}>
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    default:
      return <div> {columnKey}</div>;
  }
};

export default RenderCell;
