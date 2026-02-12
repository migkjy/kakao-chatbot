// Demo chatbot scenarios — template-based (no AI required)

export type BusinessType = "restaurant" | "cafe" | "salon";

export interface BusinessProfile {
  id: string;
  name: string;
  type: BusinessType;
  description: string;
  phone: string;
  address: string;
  businessHours: string;
  closedDays: string;
  menu?: { name: string; price: string; description?: string }[];
  services?: { name: string; price: string; duration?: string }[];
  reservationUrl?: string;
  notice?: string;
}

export interface ScenarioMatch {
  keywords: string[];
  handler: (profile: BusinessProfile) => string;
  quickReplies?: string[];
}

// --- Demo Business Profiles ---

export const DEMO_PROFILES: BusinessProfile[] = [
  {
    id: "demo-restaurant",
    name: "맛있는 한식당",
    type: "restaurant",
    description: "정성 가득한 한식 전문점입니다.",
    phone: "02-1234-5678",
    address: "서울시 강남구 테헤란로 123",
    businessHours: "오전 11:00 ~ 오후 9:00 (라스트오더 8:30)",
    closedDays: "매주 월요일",
    menu: [
      { name: "된장찌개 정식", price: "9,000원", description: "자체 된장으로 끓인 정식" },
      { name: "김치찌개 정식", price: "9,000원", description: "묵은지 김치찌개 정식" },
      { name: "불고기 정식", price: "12,000원", description: "양념 소불고기 정식" },
      { name: "비빔밥", price: "10,000원", description: "신선한 나물 비빔밥" },
      { name: "갈비탕", price: "14,000원", description: "보양 갈비탕" },
    ],
    reservationUrl: "https://example.com/reserve",
    notice: "주차는 건물 지하 2시간 무료입니다.",
  },
  {
    id: "demo-cafe",
    name: "모닝커피",
    type: "cafe",
    description: "스페셜티 커피와 수제 디저트를 즐기세요.",
    phone: "02-9876-5432",
    address: "서울시 마포구 연남로 45",
    businessHours: "오전 8:00 ~ 오후 10:00",
    closedDays: "연중무휴",
    menu: [
      { name: "아메리카노", price: "4,500원" },
      { name: "카페라떼", price: "5,000원" },
      { name: "바닐라 라떼", price: "5,500원" },
      { name: "딸기 케이크", price: "7,000원" },
      { name: "티라미수", price: "6,500원" },
      { name: "크로플", price: "5,000원" },
    ],
    notice: "반려동물 동반 가능합니다. (테라스석)",
  },
  {
    id: "demo-salon",
    name: "뷰티헤어",
    type: "salon",
    description: "당신의 아름다움을 완성하는 헤어살롱.",
    phone: "02-5555-1234",
    address: "서울시 서초구 서초대로 78",
    businessHours: "오전 10:00 ~ 오후 8:00",
    closedDays: "매주 일요일",
    services: [
      { name: "커트 (여성)", price: "25,000원", duration: "40분" },
      { name: "커트 (남성)", price: "18,000원", duration: "30분" },
      { name: "펌 (셋팅)", price: "60,000원~", duration: "2시간" },
      { name: "펌 (디지털)", price: "80,000원~", duration: "2시간 30분" },
      { name: "염색 (전체)", price: "70,000원~", duration: "1시간 30분" },
      { name: "클리닉", price: "30,000원~", duration: "30분" },
    ],
    reservationUrl: "https://example.com/salon-reserve",
  },
];

// --- Scenario Matching ---

const COMMON_SCENARIOS: ScenarioMatch[] = [
  {
    keywords: ["영업시간", "몇시", "오픈", "마감", "운영시간", "언제", "시간"],
    handler: (p) =>
      `${p.name} 영업시간 안내\n\n` +
      `영업시간: ${p.businessHours}\n` +
      `휴무일: ${p.closedDays}\n\n` +
      `방문 전 전화 확인 부탁드려요!\n${p.phone}`,
    quickReplies: ["메뉴 보기", "위치 안내", "예약하기"],
  },
  {
    keywords: ["위치", "주소", "어디", "찾아가", "오시는길", "길"],
    handler: (p) =>
      `${p.name} 위치 안내\n\n` +
      `주소: ${p.address}\n` +
      `전화: ${p.phone}\n\n` +
      (p.notice ? `참고: ${p.notice}` : ""),
    quickReplies: ["영업시간", "메뉴 보기", "예약하기"],
  },
  {
    keywords: ["전화", "연락처", "번호", "전번"],
    handler: (p) =>
      `${p.name} 연락처\n\n전화: ${p.phone}\n주소: ${p.address}`,
    quickReplies: ["영업시간", "위치 안내"],
  },
  {
    keywords: ["예약", "예약하기", "자리"],
    handler: (p) => {
      if (p.reservationUrl) {
        return (
          `${p.name} 예약 안내\n\n` +
          `온라인 예약: ${p.reservationUrl}\n` +
          `전화 예약: ${p.phone}\n\n` +
          `영업시간: ${p.businessHours}`
        );
      }
      return (
        `${p.name} 예약 안내\n\n` +
        `전화로 예약해 주세요!\n` +
        `전화: ${p.phone}\n` +
        `영업시간: ${p.businessHours}`
      );
    },
    quickReplies: ["영업시간", "메뉴 보기"],
  },
  {
    keywords: ["안녕", "하이", "반가", "처음"],
    handler: (p) =>
      `안녕하세요! ${p.name}입니다.\n` +
      `${p.description}\n\n` +
      `무엇을 도와드릴까요?`,
    quickReplies: ["영업시간", "메뉴 보기", "위치 안내", "예약하기"],
  },
];

const MENU_SCENARIO: ScenarioMatch = {
  keywords: ["메뉴", "가격", "얼마", "뭐 있", "음식", "커피", "음료", "디저트"],
  handler: (p) => {
    if (p.menu && p.menu.length > 0) {
      const menuLines = p.menu
        .map(
          (m) =>
            `  ${m.name} — ${m.price}${m.description ? `\n    ${m.description}` : ""}`
        )
        .join("\n");
      return `${p.name} 메뉴 안내\n\n${menuLines}`;
    }
    if (p.services && p.services.length > 0) {
      const serviceLines = p.services
        .map(
          (s) =>
            `  ${s.name} — ${s.price}${s.duration ? ` (${s.duration})` : ""}`
        )
        .join("\n");
      return `${p.name} 서비스 안내\n\n${serviceLines}`;
    }
    return `${p.name}의 메뉴/서비스 정보가 준비 중입니다.\n전화로 문의해 주세요: ${p.phone}`;
  },
  quickReplies: ["영업시간", "위치 안내", "예약하기"],
};

const ALL_SCENARIOS = [...COMMON_SCENARIOS, MENU_SCENARIO];

export function matchScenario(
  utterance: string,
  profile: BusinessProfile
): { response: string; quickReplies?: string[] } {
  const lower = utterance.toLowerCase().trim();

  for (const scenario of ALL_SCENARIOS) {
    if (scenario.keywords.some((kw) => lower.includes(kw))) {
      return {
        response: scenario.handler(profile),
        quickReplies: scenario.quickReplies,
      };
    }
  }

  // Default fallback
  return {
    response:
      `안녕하세요, ${profile.name}입니다.\n` +
      `죄송합니다, 질문을 이해하지 못했어요.\n\n` +
      `아래 메뉴에서 원하시는 항목을 선택해 주세요!`,
    quickReplies: ["영업시간", "메뉴 보기", "위치 안내", "예약하기", "전화번호"],
  };
}

export function getProfileById(id: string): BusinessProfile | undefined {
  return DEMO_PROFILES.find((p) => p.id === id);
}

export function getProfileByType(type: BusinessType): BusinessProfile | undefined {
  return DEMO_PROFILES.find((p) => p.type === type);
}

export const BUSINESS_TYPE_LABELS: Record<BusinessType, string> = {
  restaurant: "음식점",
  cafe: "카페",
  salon: "미용실",
};
