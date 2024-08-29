"use client";
import Image from "next/image";
import { AiFillLike } from "react-icons/ai";
import React from "react";
import Link from "next/link";
import { Tag } from "@prisma/client";
import { format } from "date-fns";

import pic from "@/public/softwareGroup.jpeg";
import { likeItem } from "@/action/item";
import { MagicCard } from "@/components/magicui/magic-card";
import {
  CustomFieldDefinition,
  customFieldDefinitions,
} from "@/lib/customField";

import { NeonGradientCard } from "./magicui/neon-gradient-card";

const MyCard = ({
  item,

  collection,
}: {
  item: any;
  session: any;
  collection: any;
}) => {
  function mapCollectionToCustomFields(collection: any) {
    return customFieldDefinitions.map((def: CustomFieldDefinition) => ({
      type: def.type,
      fields: def.fieldNames.map((fieldName) => collection[fieldName]),
    }));
  }

  const customFields = mapCollectionToCustomFields(collection);

  return (
    <NeonGradientCard className="max-w-3xl h-[350px] mb-4">
      <div className="flex w-full gap-10 h-full">
        <div className="rounded-l-lg">
          <Image
            alt="random pic"
            className="w-full rounded-l-lg h-full shadow-sm"
            height={600}
            objectFit="cover"
            src={collection.image ? collection.image : pic}
            width={600}
          />
        </div>
        <MagicCard className="h-full w-full p-5 overflow-y-scroll">
          <p className="font-serif text-xl text-cyan-500">
            Name: <span className="text-mono">{item.name}</span>
          </p>
          <p className="font-serif text-cyan-500">
            {" "}
            Tags :{" "}
            {item.tags.map((tag: Tag, index: number) => (
              <span key={tag.id}>
                <Link className="text-blue-500" href={`/tag/${tag.id}`}>
                  {tag.name}
                </Link>
                {index < tag.name.length - 1 && " "}
              </span>
            ))}{" "}
          </p>
          {customFields.map(({ type, fields }) =>
            fields.map((field, index) => {
              if (field) {
                const fieldName = `custom${type}${index + 1}`;
                const fieldValue = item[fieldName];
                const fieldLabel = collection[`${fieldName}Name`];

                return (
                  <div key={`${type}_${index}`}>
                    <p className="font-serif text-xl text-cyan-500">
                      {fieldLabel}:{" "}
                      {type === "Boolean" && (fieldValue ? "Yes" : "No")}
                      {type === "Date" && (
                        <span className="font-mono">
                          {format(new Date(fieldValue), "MMMM dd, yyyy")}
                        </span>
                      )}
                      {(type === "String" ||
                        type === "Text" ||
                        type === "Integer") && (
                        <span className="font-mono">{fieldValue}</span>
                      )}
                    </p>
                  </div>
                );
              }

              return null;
            })
          )}
        </MagicCard>
      </div>
      <div className="flex gap-1 items-center mb-2">
        <AiFillLike
          className="cursor-pointer"
          size={25}
          onClick={() => likeItem(item.id)}
        />

        <span className="text-xs text-zinc-400 tracking-tighter">
          {item.likes}
        </span>
      </div>
    </NeonGradientCard>
  );
};

export default MyCard;
