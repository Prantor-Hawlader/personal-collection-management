"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Pagination,
  Selection,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { Collection, Item, Tag } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";

import { deleteItem } from "@/action/item";

import { ChevronDownIcon } from "./icons/ChevronDownIcon";
import { SearchIcon } from "./icons/SearchIcon";
import { VerticalDotsIcon } from "./icons/VerticalDotsIcon";
import EditItemForm from "./EditItemForm";

const INITIAL_VISIBLE_COLUMNS = ["name", "tags", "actions"];

type ItemWithOthers = Item & {
  collection: Collection;
  tags: Tag[];
};
type ItemTableProps = {
  collection: Collection;
  item: ItemWithOthers[];
  tags: Tag[];
};
export default function ItemTable({ collection, item, tags }: ItemTableProps) {
  // const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<ItemWithOthers | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const generateHeaderColumns = () => {
    const baseColumns = [
      { key: "name", label: "NAME", sortable: true },
      { key: "tags", label: "TAGS", sortable: true },
    ];

    const createCustomColumns = (customFieldGroup: any) => {
      return customFieldGroup.keys
        .map((key: string, index: number) => {
          const field = customFieldGroup.fields[index];

          if (field) {
            return { key, label: field, sortable: true };
          }

          return null;
        })
        .filter(Boolean);
    };

    const customStringColumns = createCustomColumns({
      keys: ["customString1", "customString2", "customString3"],
      fields: [
        collection.customString1Name,
        collection.customString2Name,
        collection.customString3Name,
      ],
    });

    const customIntColumns = createCustomColumns({
      keys: ["customInteger1", "customInteger2", "customInteger3"],
      fields: [
        collection.customInteger1Name,
        collection.customInteger2Name,
        collection.customInteger3Name,
      ],
    });
    const customTextColumns = createCustomColumns({
      keys: ["customText1", "customText2", "customText3"],
      fields: [
        collection.customText1Name,
        collection.customText2Name,
        collection.customText3Name,
      ],
    });
    const customBooleanColumns = createCustomColumns({
      keys: ["customBoolean1", "customBoolean2", "customBoolean3"],
      fields: [
        collection.customBoolean1Name,
        collection.customBoolean2Name,
        collection.customBoolean3Name,
      ],
    });
    const customDateColumns = createCustomColumns({
      keys: ["customDate1", "customDate2", "customDate3"],
      fields: [
        collection.customDate1Name,
        collection.customDate2Name,
        collection.customDate3Name,
      ],
    });

    return [
      ...baseColumns,
      ...customStringColumns,
      ...customIntColumns,
      ...customTextColumns,
      ...customBooleanColumns,
      ...customDateColumns,
      { key: "actions", label: "ACTIONS" },
    ];
  };
  const columns = generateHeaderColumns();

  const [filterValue, setFilterValue] = React.useState("");

  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(item.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.key)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...item];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [item, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Item, b: Item) => {
      const first = a[sortDescriptor.column as keyof Item] as number;
      const second = b[sortDescriptor.column as keyof Item] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((item: any, columnKey: string) => {
    const cellValue = item[columnKey];

    if (columnKey.startsWith("customBoolean")) {
      return cellValue ? "Yes" : "No";
    }

    if (columnKey.startsWith("customDate")) {
      return format(new Date(cellValue), "MMMM dd, yyyy");
    }

    if (columnKey === "tags") {
      return cellValue?.map((tag: Tag, index: number) => (
        <span key={tag.id}>
          <Link className="text-blue-600" href={`/tag/${tag.id}`}>
            {tag.name}
          </Link>
          {index < cellValue.length - 1 && " "}
        </span>
      ));
    }

    switch (columnKey) {
      case "name":
        return <p className="text-default-500">{cellValue}</p>;

      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem href={`/item/${item.id}`}>View</DropdownItem>
                {/* <DropdownItem href={`/editItem/${item.id}`}>Edit</DropdownItem> */}
                <DropdownItem
                  onClick={() => {
                    setEditingItem(item);
                    onOpen();
                  }}
                >
                  Edit
                </DropdownItem>

                <DropdownItem
                  onPress={async () => {
                    const res = await deleteItem(item.id, collection.id);

                    if (res?.status === "success") {
                      toast.success("Item deletd successfully");
                    }
                    if (res?.error) {
                      toast.error(res.error);
                    }
                  }}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.key} className="capitalize">
                    {column.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {item.length} items
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    ,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    item.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",

        "group-data-[middle=true]:before:rounded-none",

        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  return (
    <div className="w-full h-full ml-0">
      <Table
        isCompact
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper:
              "after:bg-foreground after:text-background text-background",
          },
        }}
        classNames={classNames}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.key === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No items found"}
          // isLoading={loading}
          items={sortedItems}
          // loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey.toString())}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal
        isOpen={isOpen}
        placement="bottom-center"
        scrollBehavior="inside"
        onOpenChange={() => {
          if (isOpen) setEditingItem(null);
          onOpenChange();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Item
              </ModalHeader>
              <ModalBody>
                {editingItem && (
                  <EditItemForm
                    item={editingItem!}
                    tags={tags}
                    onClose={() => {
                      onClose();
                      setEditingItem(null);
                      onOpenChange();
                    }}
                  />
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
