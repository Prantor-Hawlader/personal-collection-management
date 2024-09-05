"use client";

import { Input } from "@nextui-org/input";
import toast from "react-hot-toast";

import { createSalesforceAccount } from "@/action/createSalesforceAccount";

import SubmitButton from "./SubmitButton";
type Props = {
  onClose: () => void;
};
const SalesforceForm = ({ onClose }: Props) => {
  const handleSubmit = async (formData: FormData) => {
    const res = await createSalesforceAccount(formData);

    if (res.message) {
      toast.success(res.message);
    } else {
      toast.error(res.error!);
    }
  };

  return (
    <>
      <form action={handleSubmit}>
        <div>
          <Input
            isRequired
            className="mb-3"
            label="Name"
            name="name"
            size="sm"
            type="text"
          />
        </div>
        <div>
          <Input
            isRequired
            className="mb-3"
            label="Email"
            name="email"
            size="sm"
            type="email"
          />
        </div>
        <div>
          <Input
            isRequired
            className="mb-3"
            label="Phone"
            name="number"
            size="sm"
            type="number"
          />
        </div>
        <SubmitButton title={"Connecting"} onClose={onClose}>
          Connect
        </SubmitButton>
      </form>
    </>
  );
};

export default SalesforceForm;
