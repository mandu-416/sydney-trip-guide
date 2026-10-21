# Sydney trip planner

네이버·구글 블로그를 조사해 만든 시드니 6일 여행 일정(1일차~6일차)을 웹사이트로 옮긴 프로젝트입니다.

## 기능

- **일차별 일정:** 1일차~6일차 시간표와 동선 지도
  - 시내 명소·본다이 날에는 비 오는 날 대체 일정과 지도가 따로 있습니다.
- **식당 추천:** 끼니마다 3곳을 추천하고, 이름·메뉴 검색과 일차 필터, 구글 지도 링크를 제공합니다.
- **교통·정보:** 교통 시간표와 노선도, 비 오는 날 실내 명소, 준비물, 출처
- **편의 기능:** 시드니 현재 시각, AUD→KRW 환율 계산, 다크 모드
- **여행 코드로 공유(Supabase):** 동행자와 아래 데이터를 함께 씁니다.
  - 방문 체크
  - 일차별 메모
  - 준비물 체크리스트
  - 경비 기록과 1/N 정산

## 시작하기

```bash
npm install
cp .env.example .env.local   # Supabase URL과 publishable key
npm run dev
```

Supabase 준비:

1. SQL Editor에서 `supabase/schema.sql`을 실행합니다.
2. `supabase/seed.example.sql`의 코드를 바꿔 여행을 하나 만듭니다.

Supabase 없이도 일정·지도·식당 화면은 동작합니다.

## 구조

- `src/data.js`: 일정, 식당, 교통, 출처
- `src/plan.js`: 1일차~6일차 순서와 도착·출국 시간
- `src/useTrip.js`: Supabase RPC 호출
- `src/components/`: 화면별 컴포넌트

DB 테이블은 API에서 직접 열 수 없습니다. `trip_load` 같은 `security definer` 함수가 여행 코드(bcrypt 해시)를 확인한 뒤에만 읽고 씁니다.

## 배포

Vercel(Vite)로 배포합니다. 환경변수 `VITE_SUPABASE_URL`, `VITE_SUPABASE_KEY`(publishable key)가 필요합니다.

## 주의

- 지도는 AI(Google Flow)로 그린 일러스트라 위치·거리는 대략적입니다.
- 가격·영업시간은 출처 글 작성 시점 기준입니다. 방문 전에 확인하세요.

## License

MIT
