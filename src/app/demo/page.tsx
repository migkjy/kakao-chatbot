import type { Metadata } from "next";
import Link from "next/link";
import { ChatDemo } from "./chat-demo";

export const metadata: Metadata = {
  title: "챗봇 데모 체험",
  description:
    "카카오톡 AI 챗봇 데모를 직접 체험해보세요. 음식점, 카페, 미용실 등 업종별 챗봇 응답을 확인할 수 있습니다.",
};

export default function DemoPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-bold">
            AI 챗봇
          </Link>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              홈
            </Link>
            <Link href="/admin" className="hover:text-foreground transition-colors">
              관리자
            </Link>
            <Link
              href="/demo"
              className="text-foreground font-medium"
            >
              데모
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">챗봇 데모 체험</h1>
          <p className="text-muted-foreground">
            업종별 챗봇을 직접 체험해보세요. 실제 카카오톡과 동일한 응답을
            제공합니다.
          </p>
        </div>
        <ChatDemo />
      </div>
    </div>
  );
}
