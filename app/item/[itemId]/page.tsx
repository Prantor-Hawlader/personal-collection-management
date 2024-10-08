import { Textarea } from "@nextui-org/input";

import Card from "@/components/MyCard";
import MyButton from "@/components/MyButton";
import prisma from "@/db/prisma";
import { getSession } from "@/lib/session";
import Comments from "@/components/Comments";
import { itemComment } from "@/action/item";
const ItemPage = async ({ params }: { params: { itemId: string } }) => {
  const { itemId } = params;
  const session = await getSession();
  const item = await prisma.item.findUnique({
    where: { id: itemId },
    include: { likesList: true, tags: true },
  });
  const collection = await prisma.collection.findUnique({
    where: { id: item?.collectionId },
  });

  const comments = await prisma.comment.findMany({
    where: { itemId },
    include: { user: true },
  });

  return (
    <div className=" flex flex-col w-full items-center justify-center">
      <Card collection={collection} item={item!} session={session} />
      {session ? (
        <form action={itemComment} className="w-1/2">
          <input name="itemId" type="hidden" value={itemId} />
          <Textarea
            className="col-span-12 md:col-span-6 mb-6 md:mb-0"
            label="Enter your comment"
            name="comment"
            variant="faded"
          />

          <div className="flex justify-end w-[100px] mt-2">
            <MyButton>Comment</MyButton>
          </div>
        </form>
      ) : (
        <p className="text-center text-2xl font-bold">
          Please log in for submitting comment and like
        </p>
      )}
      <Comments comments={comments} />
    </div>
  );
};

export default ItemPage;
