"use client";
import { Avatar } from "@nextui-org/react";
import { Comment } from "@prisma/client";

const Comments = ({ comments }: any) => {
  console.log("comments page rendered", comments);

  return (
    <div className="flex flex-col w-full my-4">
      {comments.map((comment: any) => (
        <div key={comment.id} className="flex items-center gap-4 mt-6">
          <Avatar
            isBordered
            showFallback
            color="default"
            size="md"
            src="https://images.pexels.com/photos/2078475/pexels-photo-2078475.jpeg"
          />
          <div>
            <p>{comment.user.name}</p>
            <p className="text-violet-500">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
