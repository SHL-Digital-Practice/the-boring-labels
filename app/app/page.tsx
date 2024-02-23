import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-5xl w-full items-center justify-center">
        <p>Labelling is boring.</p>
        <Link href="/dashboard">Get Started</Link>
      </div>
    </main>
  );
}
