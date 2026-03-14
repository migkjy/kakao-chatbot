# Architecture

## System Flow
```
[카카오톡 사용자] → [카카오 i 오픈빌더] → [스킬 서버 (Next.js API Routes)]
                                              ↓
                                         [AI API (Claude/GPT)]
                                              ↓
                                         [업체 지식 DB (RAG)]
```

## Directory Structure
```
src/
├── app/
│   ├── page.tsx                     # 랜딩 페이지
│   ├── layout.tsx                   # Root layout
│   ├── globals.css                  # Global styles (Tailwind v4)
│   ├── admin/
│   │   └── page.tsx                 # 관리자 대시보드
│   ├── demo/
│   │   ├── page.tsx                 # 데모 페이지
│   │   └── chat-demo.tsx            # 채팅 데모 컴포넌트
│   └── api/chatbot/
│       ├── callback/route.ts        # 카카오 스킬 콜백 (핵심)
│       └── test/route.ts            # 테스트 엔드포인트
├── components/ui/                   # shadcn/ui 컴포넌트
│   ├── button.tsx, card.tsx, input.tsx, label.tsx
│   ├── select.tsx, textarea.tsx, badge.tsx
│   ├── separator.tsx, tabs.tsx, table.tsx
└── lib/
    ├── utils.ts                     # cn() 유틸리티
    ├── kakao-response.ts            # 카카오 응답 포맷 헬퍼
    └── scenarios.ts                 # 시나리오 데이터/로직
```

## Routing
| Route | Purpose |
|-------|---------|
| `/` | 서비스 소개 랜딩 |
| `/demo` | 채팅 데모 |
| `/admin` | 관리자 대시보드 |
| `/api/chatbot/callback` | 카카오 오픈빌더 스킬 콜백 |
| `/api/chatbot/test` | 테스트용 엔드포인트 |

## 5-Second Timeout Pattern
카카오 오픈빌더는 스킬 서버 응답을 5초 내에 받아야 함.

1. **즉시 응답**: placeholder 메시지 반환
2. **비동기 처리**: AI API 호출을 백그라운드 처리
3. **결과 전달**: 다음 메시지에서 이전 결과 전달 or 콜백 URL 활용

## Kakao Skill Response Format
```typescript
// SimpleText
{ version: "2.0", template: { outputs: [{ simpleText: { text: "msg" } }] } }

// BasicCard
{ version: "2.0", template: { outputs: [{ basicCard: { title, description, buttons } }] } }
```
