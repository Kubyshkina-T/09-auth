export default function NotesFilterLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: "24px" }}>
      <aside style={{ width: "220px", paddingTop: "90px" }}>{sidebar}</aside>
      <main style={{ flex: 1 }}>{children}</main>
      </div>
        
  );
}