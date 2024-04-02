export default function ClassifierLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-col items-center py-8 px-3">
      {children}
    </main>
  );
}
