import { NextRequest, NextResponse } from "next/server";
import {
  type KakaoSkillRequest,
  simpleText,
  simpleTextWithQuickReplies,
  pendingResponse,
  getAndClearAsyncResult,
  storeAsyncResult,
} from "@/lib/kakao-response";
import { matchScenario, DEMO_PROFILES } from "@/lib/scenarios";

// Kakao OpenBuilder Skill Server Callback
// POST /api/chatbot/callback
//
// Handles incoming messages from Kakao i OpenBuilder.
// Uses template-based scenarios (no AI API required).
// Implements 5-second timeout pattern for future AI integration.

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as KakaoSkillRequest;
    const utterance = body.userRequest.utterance;
    const userId = body.userRequest.user.id;

    // Check for pending async result first
    if (utterance === "답변 확인" || utterance === "답변확인") {
      const asyncResult = getAndClearAsyncResult(userId);
      if (asyncResult) {
        return NextResponse.json(simpleText(asyncResult));
      }
      return NextResponse.json(
        simpleText("아직 답변이 준비되지 않았어요. 잠시 후 다시 시도해 주세요!")
      );
    }

    // Determine which business profile to use
    // In production, this would be determined by the bot ID or channel
    // For demo, use the first profile or detect from action params
    const clientId =
      body.action?.params?.clientId || DEMO_PROFILES[0].id;
    const profile =
      DEMO_PROFILES.find((p) => p.id === clientId) || DEMO_PROFILES[0];

    // Check if this needs AI processing (future)
    const needsAI = shouldUseAI(utterance);

    if (needsAI) {
      // 5-second timeout pattern:
      // Start async AI processing, return pending response immediately
      processWithAI(userId, utterance, profile.id).catch((err) =>
        console.error("[Chatbot] AI processing error:", err)
      );
      return NextResponse.json(pendingResponse());
    }

    // Template-based response (instant)
    const result = matchScenario(utterance, profile);

    if (result.quickReplies) {
      return NextResponse.json(
        simpleTextWithQuickReplies(
          result.response,
          result.quickReplies.map((label) => ({
            action: "message" as const,
            label,
            messageText: label,
          }))
        )
      );
    }

    return NextResponse.json(simpleText(result.response));
  } catch (error) {
    console.error("[Chatbot] Callback error:", error);
    return NextResponse.json(
      simpleText("죄송합니다, 일시적인 오류가 발생했어요. 잠시 후 다시 시도해 주세요.")
    );
  }
}

// Determine if utterance needs AI processing
// Currently always returns false (template-only mode)
// Will be enabled when AI API key is provided
function shouldUseAI(_utterance: string): boolean {
  // Future: return true for complex/unmatched queries
  return false;
}

// Mock AI processing (will be replaced with actual Claude/GPT call)
async function processWithAI(
  userId: string,
  utterance: string,
  _profileId: string
): Promise<void> {
  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock AI response
  const response = `[AI 응답] "${utterance}"에 대한 답변입니다.\n\n이 기능은 AI API 연동 후 실제 답변이 제공됩니다.`;
  storeAsyncResult(userId, response);
}
