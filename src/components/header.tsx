interface HeaderProps {
  className?: string;
  children: React.ReactNode;
}

export function Header({ className, children }: HeaderProps) {
  return (
    <header className={`bg-zinc-100 py-2 ${className}`}>{children}</header>
  );
}
