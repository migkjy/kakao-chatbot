# Constraints

## Kakao Open Builder Constraints
- **5초 타임아웃**: 스킬 서버 응답이 5초 초과 시 에러 처리됨
- **응답 포맷**: version 2.0 template 형식 필수 (SimpleText, BasicCard, ListCard 등)
- **POST only**: 스킬 콜백은 POST 요청만 수신
- **JSON body**: userRequest.utterance에 사용자 입력 포함
- **outputs 배열**: 최대 3개 outputs 가능
- **버튼 제한**: BasicCard 버튼 최대 3개

## Deployment Constraints
- Vercel 배포 (Git push only, CLI deploy 금지)
- 무료 플랜 일일 배포 100개 제한
- production 브랜치 존재 시 main -> staging -> production 순서

## Code Constraints
- .env 파일 커밋 절대 금지
- DB 파괴적 명령 (DROP, TRUNCATE) CEO 승인 없이 금지
- 샘플/더미 데이터 10개 초과 생성 금지

## AI API Constraints
- Claude/GPT API 호출 시 5초 타임아웃 고려 필수
- 스트리밍 응답 불가 (카카오 JSON 응답 필요)
- 비동기 처리 패턴 사용 권장
