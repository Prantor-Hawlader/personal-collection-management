"use client";

import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import { createTicket } from "@/action/createTicket";

import SubmitButton from "./SubmitButton";
type Props = {
  onClose: () => void;
};
export default function CreateTicketForm({ onClose }: Props) {
  const searchParams = useSearchParams();
  const referrer = searchParams.get("ref");
  const priorityOptions = [
    { name: "High", value: "2" },
    { name: "Average", value: "3" },
    { name: "Low", value: "4" },
  ];

  const handleSubmit = async (formData: FormData) => {
    const res = await createTicket(formData);

    if (res.message) {
      toast.success(res.message);
    } else {
      toast.error(res.error!);
    }
  };

  return (
    <>
      <form action={handleSubmit}>
        <Input
          isRequired
          className="mb-3"
          label="Summary"
          name="summary"
          size="sm"
          type="text"
        />
        <Input
          className="mb-3"
          label="Collection Name"
          name="collection"
          size="sm"
          type="text"
        />
        <Select
          isRequired
          className="mb-3"
          label="Priority"
          name="priority"
          size="sm"
        >
          {priorityOptions.map((option) => (
            <SelectItem key={option.value}>{option.name}</SelectItem>
          ))}
        </Select>
        <input name="pageLink" type="hidden" value={referrer!} />
        <SubmitButton title={"Creating"} onClose={onClose}>
          Create ticket
        </SubmitButton>
      </form>
    </>
  );
}
