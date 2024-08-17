"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ErrorMessageProps {
  hideButton?: boolean;
}

export function ErrorMessage({ hideButton }: ErrorMessageProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <h3>Sorry, something went wrong. Please try again.</h3>
      {!hideButton && (
        <Button onClick={() => router.refresh()}>Try again</Button>
      )}
    </div>
  );
}
