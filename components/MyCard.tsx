"use client";
import { AiOutlineLike } from "react-icons/ai";
import Image from "next/image";

import pic from "@/public/softwareGroup.jpeg";
import { likeItem } from "@/action/item";
import { MagicCard } from "@/components/magicui/magic-card";

import { NeonGradientCard } from "./magicui/neon-gradient-card";

const MyCard = ({ item, likes, session }: any) => {
  return (
    <NeonGradientCard className="max-w-3xl h-[350px] mb-4">
      <div className="flex w-full gap-10 h-full">
        <div className="rounded-l-lg">
          <Image
            alt="random pic"
            className="w-full rounded-l-lg h-full shadow-sm"
            objectFit="cover"
            src={pic}
          />
        </div>
        <MagicCard className="h-full p-5">
          <div className="h-full w-full">
            <b className="text-green-300">{item?.name}</b>
            <p className="text-red-500">{item?.tags}</p>
            <p className="text-red-600">
              {item?.customDate1?.toLocaleDateString()}
            </p>
            <p>fkdfdfkjdkfjdfjdfkjdfkdjfdkfjdkfjdkfjdfkjdfkdjf</p>
          </div>
        </MagicCard>
      </div>
      <div className="flex gap-1 items-center">
        <AiOutlineLike
          className="cursor-pointer"
          size={25}
          onClick={() => {
            if (!session) return;
            likeItem(item.id);
          }}
        />
        <span className="text-xs text-zinc-400 tracking-tighter">
          {likes.length}
        </span>
      </div>
    </NeonGradientCard>
  );
};

export default MyCard;
