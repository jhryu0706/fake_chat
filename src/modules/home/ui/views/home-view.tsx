"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";

export default function HomeView() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16 space-y-6 md:col-span-3">
      <h1 className="text-3xl font-semibold tracking-tight">
        Getting Started: Fake Chat
      </h1>
      <Separator className="bg-black h-[1px] w-full" />
      <div className="flex flex-row items-start gap-8">
        <div className="flex-shrink-0 w-full max-w-sm pt-20">
          <DotLottieReact
            src="https://lottie.host/0bc3f185-a8f1-4344-89f5-237193fcf87c/eWIaYGRUqT.lottie"
            speed={0.5}
            autoplay={true}
            loop={false}
            className="w-full"
          />
        </div>
        <section className="flex-1 space-y-6">
          <div className="text-gray-800 font-sans">
            <p className="mt-3">
              This website lets you{" "}
              <strong>
                create an AI agent and speak to them on a video call
              </strong>
              . Additionally, it will save the video recordings and provide a
              summary of the call.
            </p>

            <p className="mt-5">
              <strong>Examples</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 mt-2">
              <li>
                You are a student getting ready for a debate competition. You
                can create your own debate coach with a prompt like:
                <blockquote className="pl-4 border-l-4 border-gray-300 italic mt-1">
                  "You are a debate coach, give me feedback on timing,
                  composure, tone, and content."
                </blockquote>
              </li>
              <li>
                You are preparing for PM interviews in Big Tech. You want to
                tailor your response to each company, so you create 4 different
                AI mock interview trainers to help you.
              </li>
            </ul>

            <p className="mt-5">
              <strong>Workflow</strong>
            </p>
            <p className="mt-2">
              Create an agent &rarr; Start a meeting &rarr; Complete meeting and
              review
            </p>
            <Button asChild className="mt-5">
              <Link href="/agents">Create your first agent</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
