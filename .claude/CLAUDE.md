# Kakao Chatbot - PL Session Rules

## Project
카카오톡 AI 챗봇 제작/운영 대행 서비스. 카카오 i 오픈빌더 스킬 서버.

## Tech Stack
- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- shadcn/ui components
- API Routes for skill server (`/api/chatbot/callback`)
- Vercel deploy

## Commands
```bash
npm install && npm run dev    # 개발
npm run build                 # 빌드 검증
npm run lint                  # ESLint
```

## Session Protocol
- 자비스 회신: `scripts/project-reply.sh "메시지" "kakao-chatbot"`
- 작업 완료 시 반드시 자비스에게 결과 보고

## Development Rules
1. **TDD 강제**: 테스트 먼저 작성 -> 구현 -> 통과
2. **ralph-loop 필수**: /ralph-loop 스킬 사용
3. **plan 없이 코딩 금지**: docs/plans/ 에 plan 확인 후 실행
4. **VP 승인 없이 실행 금지**

## Key Constraints
- 카카오 오픈빌더 스킬 응답 **5초 타임아웃** 필수 준수
- 스킬 응답 포맷: version 2.0 template (SimpleText, BasicCard 등)
- `.env` 파일 커밋 금지
- `vercel deploy` / `vercel --prod` 금지 (Git push 배포만)
- production 브랜치 있으면 main -> staging -> production 순서

## Knowledge Files
- `knowledge/architecture.md` - 아키텍처 상세
- `knowledge/constraints.md` - 카카오 API 제약사항
- `knowledge/api-keys.md` - API 키 정보 (gitignored)
- `knowledge/history.md` - 작업 이력
- `knowledge/learnings.md` - 교훈/노하우

## Git
- 커밋 후 push 필수 (`git pull --rebase origin main` 선행)
- 커밋 메시지: `feat/fix/chore: [kakao-chatbot] 변경 요약`
