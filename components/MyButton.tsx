import { Button } from "@nextui-org/button";
import { ReactNode } from "react";

const MyButton = ({ children }: { children: ReactNode }) => {
  return (
    <Button
      className="w-full bg-gradient-to-r from-[#00b7fa] to-[#01cfea]"
      type="submit"
    >
      <p className=" font-bold text-md">{children}</p>
    </Button>
  );
};

export default MyButton;
