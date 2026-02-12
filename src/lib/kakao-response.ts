// Kakao i OpenBuilder Skill Response Formats
// Reference: https://chatbot.kakao.com/docs/skill-response-format

export interface KakaoSkillRequest {
  intent: {
    id: string;
    name: string;
  };
  userRequest: {
    timezone: string;
    params: {
      ignoreMe?: string;
      surface?: string;
    };
    block: {
      id: string;
      name: string;
    };
    utterance: string;
    lang: string | null;
    user: {
      id: string;
      type: string;
      properties: Record<string, string>;
    };
  };
  bot: {
    id: string;
    name: string;
  };
  action: {
    name: string;
    clientExtra: Record<string, unknown> | null;
    params: Record<string, string>;
    id: string;
    detailParams: Record<
      string,
      { origin: string; value: string; groupName: string }
    >;
  };
}

export interface KakaoButton {
  action: "webLink" | "message" | "phone" | "block" | "share";
  label: string;
  webLinkUrl?: string;
  messageText?: string;
  phoneNumber?: string;
  blockId?: string;
}

export interface KakaoQuickReply {
  action: "message" | "block";
  label: string;
  messageText?: string;
  blockId?: string;
}

interface SimpleText {
  simpleText: { text: string };
}

interface BasicCard {
  basicCard: {
    title?: string;
    description?: string;
    thumbnail?: { imageUrl: string };
    buttons?: KakaoButton[];
  };
}

interface ListCard {
  listCard: {
    header: { title: string };
    items: {
      title: string;
      description?: string;
      imageUrl?: string;
      link?: { web: string };
    }[];
    buttons?: KakaoButton[];
  };
}

type KakaoOutput = SimpleText | BasicCard | ListCard;

interface KakaoSkillResponse {
  version: "2.0";
  template: {
    outputs: KakaoOutput[];
    quickReplies?: KakaoQuickReply[];
  };
}

// --- Response Builders ---

export function simpleText(text: string): KakaoSkillResponse {
  return {
    version: "2.0",
    template: {
      outputs: [{ simpleText: { text } }],
    },
  };
}

export function simpleTextWithQuickReplies(
  text: string,
  quickReplies: KakaoQuickReply[]
): KakaoSkillResponse {
  return {
    version: "2.0",
    template: {
      outputs: [{ simpleText: { text } }],
      quickReplies,
    },
  };
}

export function basicCard(
  title: string,
  description: string,
  buttons?: KakaoButton[]
): KakaoSkillResponse {
  return {
    version: "2.0",
    template: {
      outputs: [
        {
          basicCard: {
            title,
            description,
            ...(buttons && { buttons }),
          },
        },
      ],
    },
  };
}

export function listCard(
  headerTitle: string,
  items: { title: string; description?: string }[],
  buttons?: KakaoButton[]
): KakaoSkillResponse {
  return {
    version: "2.0",
    template: {
      outputs: [
        {
          listCard: {
            header: { title: headerTitle },
            items,
            ...(buttons && { buttons }),
          },
        },
      ],
    },
  };
}

// --- Async Response Pattern (5-second timeout handling) ---

// In-memory store for async results (in production, use Redis/DB)
const asyncResults = new Map<string, { response: string; timestamp: number }>();

export function storeAsyncResult(userId: string, response: string): void {
  asyncResults.set(userId, { response, timestamp: Date.now() });
}

export function getAndClearAsyncResult(
  userId: string
): string | null {
  const result = asyncResults.get(userId);
  if (!result) return null;

  // Expire after 5 minutes
  if (Date.now() - result.timestamp > 5 * 60 * 1000) {
    asyncResults.delete(userId);
    return null;
  }

  asyncResults.delete(userId);
  return result.response;
}

export function pendingResponse(): KakaoSkillResponse {
  return simpleTextWithQuickReplies(
    "답변을 준비하고 있어요. 잠시 후 아래 버튼을 눌러주세요!",
    [
      {
        action: "message",
        label: "답변 확인하기",
        messageText: "답변 확인",
      },
    ]
  );
}
