import { signOut } from "@/auth";

import MyButton from "./MyButton";

const Logout = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <MyButton>
        <p className="font-bold text-md">Logout</p>
      </MyButton>
    </form>
  );
};

export default Logout;
