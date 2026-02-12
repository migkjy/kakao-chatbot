"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DEMO_PROFILES,
  BUSINESS_TYPE_LABELS,
  type BusinessProfile,
} from "@/lib/scenarios";

interface Message {
  role: "user" | "bot";
  text: string;
  quickReplies?: string[];
}

export function ChatDemo() {
  const [selectedProfile, setSelectedProfile] = useState<BusinessProfile>(
    DEMO_PROFILES[0]
  );
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: `안녕하세요! ${DEMO_PROFILES[0].name}입니다.\n${DEMO_PROFILES[0].description}\n\n무엇을 도와드릴까요?`,
      quickReplies: ["영업시간", "메뉴 보기", "위치 안내", "예약하기"],
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function switchProfile(profile: BusinessProfile) {
    setSelectedProfile(profile);
    setMessages([
      {
        role: "bot",
        text: `안녕하세요! ${profile.name}입니다.\n${profile.description}\n\n무엇을 도와드릴까요?`,
        quickReplies: ["영업시간", "메뉴 보기", "위치 안내", "예약하기"],
      },
    ]);
  }

  async function sendMessage(text: string) {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          profileId: selectedProfile.id,
        }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.response,
          quickReplies:
            data.quickReplies?.length > 0 ? data.quickReplies : undefined,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "오류가 발생했습니다. 다시 시도해주세요." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Profile Selector */}
      <div className="flex gap-2 mb-4 justify-center">
        {DEMO_PROFILES.map((p) => (
          <button
            key={p.id}
            onClick={() => switchProfile(p)}
            className={`rounded-full px-3 py-1 text-sm border transition-all ${
              selectedProfile.id === p.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:border-primary/50"
            }`}
          >
            {BUSINESS_TYPE_LABELS[p.type]} - {p.name}
          </button>
        ))}
      </div>

      {/* Chat Window */}
      <Card className="overflow-hidden">
        {/* Chat Header */}
        <div className="bg-[#FEE500] px-4 py-3 text-center">
          <div className="font-semibold text-sm text-gray-800">
            {selectedProfile.name}
          </div>
          <div className="text-xs text-gray-600">카카오톡 챗봇 데모</div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 bg-[#B2C7D9] space-y-3">
          {messages.map((msg, i) => (
            <div key={i}>
              <div
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-[#FEE500] text-gray-800"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
              {msg.quickReplies && (
                <div className="flex flex-wrap gap-1 mt-2 justify-start">
                  {msg.quickReplies.map((qr, qi) => (
                    <button
                      key={qi}
                      onClick={() => sendMessage(qr)}
                      className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {qr}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-lg px-3 py-2 text-sm text-gray-400">
                입력 중...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex gap-2 p-3 bg-white border-t">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage(input)}
            placeholder="메시지를 입력하세요..."
            disabled={loading}
            className="flex-1"
          />
          <Button
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
            size="sm"
          >
            전송
          </Button>
        </div>
      </Card>

      <p className="text-xs text-center text-muted-foreground mt-4">
        실제 카카오톡 채널 연동 전 테스트 데모입니다.
        <br />
        퀵 리플라이 버튼을 클릭하거나 직접 입력하세요.
      </p>
    </div>
  );
}
