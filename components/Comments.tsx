"use client";
import { Avatar } from "@nextui-org/react";

const Comments = ({ comments }: any) => {
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
            <p className="font-mono text-bold">{comment.user.name}</p>
            <p className="text-cyan-500">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
