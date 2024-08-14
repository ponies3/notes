export interface Note {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  title: string | null;
  content: string | null;
}
