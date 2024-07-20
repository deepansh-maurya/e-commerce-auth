"use client";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  router.push("/categories");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center  text-white">
      <span className="loader"></span>
    </main>
  );
}
