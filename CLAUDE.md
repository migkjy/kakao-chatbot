# Kakao Chatbot - 카카오톡 AI 챗봇 대행 서비스

## 프로젝트 개요

카카오톡 비즈니스 챗봇을 AI로 구동하는 제작/운영 대행 서비스.
카카오 i 오픈빌더의 스킬 서버로 동작하며, 업종별 맞춤 FAQ 챗봇을 제공한다.

## Goal

카카오톡 AI 챗봇 제작/운영 대행 서비스 런칭. 최소 1개 고객사 확보 + 챗봇 구축 완료 + 월 운영 수익 발생.

## 아키텍처

```
[카카오톡 사용자] → [카카오 i 오픈빌더] → [스킬 서버 (이 프로젝트)]
                                              ↓
                                         [AI API (Claude/GPT)]
                                              ↓
                                         [업체 지식 DB (RAG)]
```

### 5초 타임아웃 대응 패턴

카카오 오픈빌더는 스킬 서버 응답을 5초 내에 받아야 함. AI API 호출이 초과할 수 있으므로:

1. **즉시 응답**: "잠시만요, 답변을 준비하고 있어요" 반환
2. **비동기 처리**: AI API 호출을 백그라운드에서 처리
3. **결과 전달**: 다음 사용자 메시지에서 이전 결과 전달 (또는 카카오 콜백 URL 활용)

## 기술 스택

- **프레임워크**: Next.js (App Router, TypeScript, Tailwind CSS v4)
- **UI**: shadcn/ui
- **스킬 서버**: Next.js API Routes
- **AI**: Claude/GPT API (추후 연동, 현재 템플릿 기반)
- **배포**: Vercel

## 빌드 & 실행

```bash
npm install
npm run dev
npm run build
npm start
```

## 카카오 스킬 응답 포맷

### SimpleText
```json
{
  "version": "2.0",
  "template": {
    "outputs": [
      { "simpleText": { "text": "응답 메시지" } }
    ]
  }
}
```

### BasicCard
```json
{
  "version": "2.0",
  "template": {
    "outputs": [
      {
        "basicCard": {
          "title": "제목",
          "description": "설명",
          "buttons": [
            { "action": "webLink", "label": "버튼", "webLinkUrl": "https://..." }
          ]
        }
      }
    ]
  }
}
```

## 라우팅 구조

| 경로 | 용도 |
|------|------|
| `/` | 서비스 소개 / 랜딩 페이지 |
| `/admin` | 관리자 대시보드 |
| `/admin/clients` | 고객사 관리 |
| `/admin/scenarios` | 시나리오 편집기 |
| `/admin/logs` | 대화 로그 |
| `/api/chatbot/callback` | 카카오 스킬 서버 콜백 |
| `/api/chatbot/test` | 테스트 엔드포인트 |

## 프로젝트 경로

`/Users/nbs22/(Claude)/(claude).projects/business-builder/projects/kakao-chatbot/`
