import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/react";
import { ReactNode, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const { pending } = useFormStatus();
  const wasSubmittingRef = useRef(false);

  useEffect(() => {
    if (wasSubmittingRef.current && !pending) {
      onClose();
    }
    wasSubmittingRef.current = pending;
  }, [pending, onClose]);

  return (
    <Button color="success" disabled={pending} size="sm" type="submit">
      {pending ? (
        <div className="flex items-center justify-center">
          {title} <Spinner color="default" labelColor="foreground" size="sm" />
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
