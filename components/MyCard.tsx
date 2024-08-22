"use client";
import { AiOutlineLike } from "react-icons/ai";
import Image from "next/image";
import { AiFillLike } from "react-icons/ai";
import React from "react";

import pic from "@/public/softwareGroup.jpeg";
import { likeItem } from "@/action/item";
import { MagicCard } from "@/components/magicui/magic-card";
import {
  CustomFieldDefinition,
  customFieldDefinitions,
} from "@/lib/customField";

import { NeonGradientCard } from "./magicui/neon-gradient-card";
import Link from "next/link";
import { Tag } from "@prisma/client";

const MyCard = ({
  item,
  session,
  collection,
}: {
  item: any;
  session: any;
  collection: any;
}) => {
  // const alreadyLike = item.likesList;
  // const [isLiked, setIsLiked] = React.useState(alreadyLike === 1);
  // const [likeCount, setLikeCount] = React.useState(item.likes);

  // const handleLike = async () => {
  //   if (!session) return;

  //   // Optimistic update

  //   try {
  //     setIsLiked(!isLiked);
  //     setLikeCount((prevCount: number) =>
  //       isLiked ? prevCount - 1 : prevCount + 1
  //     );
  //     // Perform the actual like action
  //     await likeItem(item.id);
  //   } catch (error) {
  //     // If there's an error, revert the optimistic update
  //     console.error("Error liking item:", error);
  //   }
  // };

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
        <MagicCard className="h-full w-full p-5">
          <p className="font-serif text-xl">
            Name: <span className="text-mono">{item.name}</span>
          </p>
          <p className="font-serif">
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
                    <p className="font-serif text-xl">
                      {fieldLabel}:{" "}
                      {type === "Boolean" && (fieldValue ? "Yes" : "No")}
                      {type === "Date" && (
                        <span className="font-mono">
                          {new Date(fieldValue).toLocaleDateString()}
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
        {/* {isLiked ? (
          <AiOutlineLike
            className="cursor-pointer"
            size={25}
            onClick={handleLike}
          />
        ) : ( */}
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
