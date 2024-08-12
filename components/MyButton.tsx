import { Button } from "@nextui-org/button";
import { ReactNode } from "react";

const MyButton = ({ children }: { children: ReactNode }) => {
  return (
    <Button
      className="w-full bg-gradient-to-r from-[#00b7fa] to-[#01cfea]"
      type="submit"
    >
      {children}
    </Button>
  );
};

export default MyButton;
