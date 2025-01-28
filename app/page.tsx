import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HttpMethod } from "@/lib/api";
import { serverApi } from "@/lib/apiServer";

export default async function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="/hero.jpg"
        alt="Background"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Hero Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Welcome to Our Platform
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8">
          Get started with our amazing features
        </p>
        <Button asChild size="lg">
          <Link href="/dashboard">Let's Start</Link>
        </Button>
      </div>
    </div>
  );
}
