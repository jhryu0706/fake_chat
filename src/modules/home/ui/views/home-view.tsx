"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";

export default function HomeView() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-center">
        <div className="flex justify-center md:col-span-1">
          <DotLottieReact
            src="https://lottie.host/0bc3f185-a8f1-4344-89f5-237193fcf87c/eWIaYGRUqT.lottie"
            speed={0.5}
            autoplay={true}
            loop={false}
            className="w-full max-w-sm"
          />
        </div>
        <section className="space-y-6 md:col-span-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            How to use Fake Chat
          </h1>
          <Separator className="h-1 bg-muted" />
          <p className="text-muted-foreground leading-relaxed">
            This website lets you speak to AI agents on a video call. First, go
            to the <strong>Agent</strong> tab and create an agent with a
            specification like:
          </p>
          <blockquote className="border-l-2 pl-4 italic text-sm text-muted-foreground">
            “I need help with my math homework, you are a math tutor for Basic
            Algebra. Help me answer some questions.”
          </blockquote>
          <p className="text-muted-foreground leading-relaxed">
            Then, go to the <strong>Meeting</strong> tab to create a meeting and
            hop on a call with your agent.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The website saves the call, along with the transcript and an
            AI-generated summary of the session.
          </p>
          <Button asChild>
            <Link href="/agents">Create your first agent</Link>
          </Button>
        </section>
      </div>
    </main>
  );
}
