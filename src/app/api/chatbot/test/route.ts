import { NextRequest, NextResponse } from "next/server";
import { matchScenario, DEMO_PROFILES, getProfileById } from "@/lib/scenarios";

// Test endpoint for chatbot without Kakao OpenBuilder
// POST /api/chatbot/test
// Body: { "message": "영업시간", "profileId": "demo-restaurant" }

export async function POST(request: NextRequest) {
  try {
    const { message, profileId } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "message field is required" },
        { status: 400 }
      );
    }

    const profile = getProfileById(profileId || "demo-restaurant") || DEMO_PROFILES[0];
    const result = matchScenario(message, profile);

    return NextResponse.json({
      profile: { id: profile.id, name: profile.name, type: profile.type },
      input: message,
      response: result.response,
      quickReplies: result.quickReplies || [],
    });
  } catch (error) {
    console.error("[Test] Error:", error);
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}

// GET /api/chatbot/test — list available demo profiles
export async function GET() {
  return NextResponse.json({
    profiles: DEMO_PROFILES.map((p) => ({
      id: p.id,
      name: p.name,
      type: p.type,
      description: p.description,
    })),
    usage: {
      method: "POST",
      body: {
        message: "string (required)",
        profileId: "string (optional, defaults to demo-restaurant)",
      },
      examples: [
        { message: "영업시간" },
        { message: "메뉴 보기", profileId: "demo-cafe" },
        { message: "예약하기", profileId: "demo-salon" },
      ],
    },
  });
}
