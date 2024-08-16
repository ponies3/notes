import { Aside } from "@/components/aside";

export default function NotesLayoud({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-row">
      <Aside />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
