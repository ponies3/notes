import { NotesList } from "@/modules/notes/pages/list/list";

interface NotesListPageProps {
  searchParams: {
    search: string;
  };
}

export default function NotesListPage({
  searchParams: { search },
}: NotesListPageProps) {
  return <NotesList search={search} />;
}
