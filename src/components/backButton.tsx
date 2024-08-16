import Link from "next/link";
import { Button } from "./ui/button";
import { Undo2 } from "lucide-react";

interface BackButtonProps {
  className?: string;
  href: string;
}
export function BackButton({ href, className }: BackButtonProps) {
  return (
    <Button className={`${className}`} asChild variant="outline">
      <Link href={href}>
        <Undo2 />
      </Link>
    </Button>
  );
}
