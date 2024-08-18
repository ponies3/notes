"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SearcherProps {
  className?: string;
}

export function Searcher({ className }: SearcherProps) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") ?? "";

  useEffect(() => {
    const timeout = setTimeout(() => {
      const query = search ? `?search=${search}` : "";
      router.push(`/notes${query}`);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  return (
    <Input
      className={className}
      defaultValue={searchQuery}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Find your notes..."
    />
  );
}
