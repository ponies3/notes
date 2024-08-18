"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ErrorMessageProps {
  hideButton?: boolean;
}

export function ErrorMessage({ hideButton }: ErrorMessageProps) {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8">
      <h3>Sorry, something went wrong. Please try again.</h3>
      {!hideButton && (
        <Button className="w-fit" onClick={router.refresh}>
          Try again
        </Button>
      )}
    </div>
  );
}
