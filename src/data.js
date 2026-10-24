// Sydney itinerary, 1일차 … 6일차 (no calendar dates).
// Item: [slot, what, move, memo, place?]

export const TRIP = {
  title: '시드니 여행 동선',
  lead:
    '시드니 시내 관광, 블루마운틴·포트스테판 투어, 본다이 해안 산책, 올림픽파크 수영, 오페라하우스 발레, 달링하버 불꽃놀이와 새벽 러닝을 묶은 일정입니다. 1일차 13:35 도착, 6일차 21:30 출발 기준입니다. 이동 시간은 타운홀역 근처(도보 5분) 숙소 기준입니다.',
};

const g = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q + ' Sydney')}`;
export const mapLink = g;

export const TEMPLATES = {
  arrival: {
    id: 'arrival',
    tag: '도착·시내',
    title: '도착, 숙소 근처 쇼핑, 숙소에서 저녁 요리',
    summary:
      '도착일에는 숙소에서 가까운 ①패디스 마켓과 ②마트만 들르고, 마트에서 장 본 재료로 숙소(스튜디오 주방)에서 저녁을 해 먹은 뒤 숙소 근처를 잠깐 걷고 일찍 쉽니다. 달링하버 야경은 3일차 불꽃놀이 때 봅니다. 패디스 마켓은 월·화에 쉽니다. ③~⑤는 6일차, ⑥은 3일차에 들릅니다.',
    map: '/maps/day1.jpg',
    mapAlt: '1일차 동선: 공항 → 숙소 → 패디스 마켓 → 울워스 타운홀(장보기) → 숙소 저녁 요리 → 텀블롱 파크 산책',
    // airport and check-in rows are added in plan.js
    items: [
      ['16:00–17:00', '쇼핑 ① 패디스 마켓', '도보 5–10분', '키링·마그넷·코알라 인형·포포크림. 18:00 마감', "Paddy's Markets Haymarket"],
      ['17:00–17:45', '쇼핑 ② 타운홀 울월스·콜스', '도보 약 10분', '팀탐·버섯과자·영양제(노란 세일 딱지). 저녁 요리 재료(고기·채소·빵·과일), 다음 날 아침거리도', 'Woolworths Town Hall'],
      ['17:45–19:15', '숙소에서 저녁 요리·식사', '도보 약 10분', '스튜디오 주방 이용. 스테이크·파스타처럼 간단한 메뉴로'],
      ['19:15–19:45', '숙소 근처 산책: 텀블롱 파크(달링 스퀘어 옆 잔디 광장)', '도보 약 5분', '저녁엔 조명이 예쁨. 피곤하면 생략', 'Tumbalong Park'],
      ['20:00', '숙소, 일찍 쉬기', '도보 약 5분', '다음 날 06:00 기상(새벽 러닝)'],
    ],
    rain: '패디스 마켓·마트·숙소 요리는 모두 실내라 그대로 갑니다. 산책만 빼세요.',
  },
  bluemountains: {
    id: 'bluemountains',
    tag: '블루마운틴 투어',
    title: '하버브리지 새벽 러닝, 블루마운틴 투어, 도착 후 야식',
    summary: '투어 집결이 13:20이라 오전은 러닝 1시간만 하고 나머지는 쉬면서 긴 투어에 대비합니다. 집결 시각은 예약한 투어에 맞춰 고치세요.',
    map: '/maps/day2.jpg',
    mapAlt: '블루마운틴 투어일 동선: 새벽 러닝(서큘러키·하버브리지·키리빌리) → 숙소 → SEA LIFE 투어 집결',
    items: [
      ['06:00', '기상', '—', ''],
      ['06:15–07:30', '새벽 러닝 약 5km: 서큘러키 → 더 록스 → 하버브리지 보행로 → 키리빌리 → 복귀', '서큘러키까지 기차 약 10분', '키리빌리 물가에서 오페라하우스 정면 뷰. 다리 입구는 더 록스 쪽 계단', 'Sydney Harbour Bridge pedestrian'],
      ['07:30–09:00', '숙소 복귀, 샤워·아침', '기차 + 도보', ''],
      ['09:00–11:30', '휴식·자유 시간', '—', '투어가 밤늦게 끝나니 쉬어 두기. 겹옷·보조배터리'],
      ['11:45–13:00', '달링 스퀘어 점심 (투어 집결지 근처)', '도보 10–15분', '집결지까지 도보 5분'],
      ['13:20', '블루마운틴 투어 집결: 1-5 Wheat Road(SEA LIFE 오른쪽 도로변), 13:30 정시 출발', '도보', '페더데일(동물원 옵션) → 킹스 테이블랜드 → 에코포인트·세자매봉 → 선셋 → 별보기. 저녁 식사비 별도', '1-5 Wheat Road Sydney'],
      ['21:00–22:00', '시내 도착 (하차: 389 Pitt St, Rydges 호텔 앞)', '—', '숙소까지 도보 약 5분. 밤 산은 추우니 겹옷 필수'],
    ],
    extra: {
      title: '투어 후 밤, 시내 도착 후 추천',
      note: '투어에 저녁이 포함돼 있으니 숙소에서 10분 안의 가벼운 일정만. 다음 날 아침 일정이 있으면 23시 전 취침.',
      rows: [
        ['차이나타운·헤이마켓 야식', '딕슨 스트리트 주변에 늦게까지 여는 식당이 많음', '도보 5–10분', '30–45분'],
        ['숙소에서 바로 휴식', '다음 날 07:00 기상, 올림픽파크 수영', '하차지에서 도보 5분', '—'],
        ['월드 스퀘어·타운홀 편의점', '다음 날 물·간식 사두기', '도보 5분', '15분'],
      ],
    },
    rain: '새벽 러닝은 건너뛰고 오전에 쉽니다. 투어 진행 여부는 투어 회사 연락을 확인하세요.',
  },
  city: {
    id: 'city',
    tag: '시내 명소',
    title: '올림픽파크 수영, 오페라하우스 발레 공연, 더 록스 마켓, 달링하버 불꽃놀이',
    summary:
      '오전에 올림픽파크에서 수영만 하고(헬스는 빼고) 숙소에 들러 공연용 옷으로 갈아입은 뒤, 13:30에는 오페라하우스에서 호주 발레단 「코플랜드 댄스 에피소드」(73분)를 봅니다. 공연 30분 전인 13:00까지 도착하도록 점심을 서큘러키에서 먼저 먹습니다. 토요일 21:00에는 달링하버 불꽃놀이(5~10분)를 보고 들어갑니다. 더 록스 마켓은 토·일에만 열립니다.',
    map: '/maps/day3.jpg',
    mapAlt: '시내 명소일 동선: 올림픽파크 수영 → 숙소(옷 갈아입기) → 하이드파크·세인트메리 → 보타닉 가든 → 13:30 오페라하우스 발레 → 더 록스 마켓 → 옵저버토리 힐 → 바랑가루 → 달링하버 저녁·불꽃놀이',
    items: [
      ['07:00–07:30', '기상·간단한 아침', '—', '수영복·수건만 챙기기(공연 옷은 숙소에)'],
      ['07:30–08:15', '숙소 → 올림픽파크', '기차 Town Hall → Lidcombe 환승 → Olympic Park', '총 40–45분. 주말 배차 간격 확인'],
      ['08:15–09:15', '수영: 올림픽파크 아쿠아틱센터 랩 레인', '—', '주말 06:00–19:00. 성인 약 A$10. 헬스는 빼기', 'Sydney Olympic Park Aquatic Centre'],
      ['09:15–09:35', '샤워·정리', '—', ''],
      ['09:35–10:20', '올림픽파크 → 숙소', '기차 Olympic Park → Lidcombe 환승 → Town Hall, 도보 5분', '약 40–45분'],
      ['10:20–10:50', '숙소에서 공연용 옷으로 갈아입기, 수영 짐 두기', '—', '아래 발레 공연 TPO 참고'],
      ['10:50–11:05', '숙소 → 하이드파크', '도보 15분', ''],
      ['11:05–11:30', '하이드파크 → 세인트메리 대성당', '도보', '', "St Mary's Cathedral"],
      ['11:30–12:15', '로열 보타닉 가든 (미세스 맥쿼리 체어는 여유 있을 때만)', '도보', '하버브리지와 오페라하우스를 한 프레임에', "Mrs Macquarie's Chair"],
      ['12:15–12:50', '서큘러키 점심', '도보 10–15분', '공연 전이라 빨리 나오는 곳. 식당 추천 참고'],
      ['13:00', '오페라하우스 도착 (공연 30분 전)', '도보 5분', '조안 서덜랜드 극장. 티켓 확인, 화장실', 'Sydney Opera House'],
      ['13:30–14:45', '발레: 코플랜드 댄스 에피소드 (호주 발레단)', '—', '73분. 성인 A$65부터, 미리 예매. 토요일 13:30 회차'],
      ['14:45–15:00', '오페라하우스 → 더 록스', '도보 10분', ''],
      ['15:00–16:15', '쇼핑 ⑥ 더 록스 마켓과 골목 산책', '도보', '수공예품·먹거리. 토·일만', 'The Rocks Markets'],
      ['16:15–17:00', '옵저버토리 힐', '도보 약 10분', '하버브리지 전망', 'Observatory Hill'],
      ['17:00–18:00', '바랑가루 산책', '도보 약 10분', '', 'Barangaroo Reserve'],
      ['18:00–19:30', '달링하버 저녁', '도보 약 15분', '식당 추천 참고'],
      ['19:30–20:30', '달링하버 야경 산책, 디저트·카페', '도보', '숙소가 도보 10분이라 잠깐 들렀다 와도 됨'],
      ['20:30–21:00', '불꽃놀이 자리 잡기', '도보', '코클 베이 물가나 파이어몬트 다리 위. 토요일 밤이라 일찍 가기', 'Cockle Bay Wharf'],
      ['21:00–21:10', '달링하버 불꽃놀이', '—', '토요일 21:00, 5~10분. 날짜·취소 여부는 공식 페이지 확인'],
      ['21:10–21:30', '숙소', '도보 10–15분', ''],
    ],
    tips: {
      title: '발레 공연 TPO (참고용)',
      lead: '시드니 오페라하우스는 정해진 드레스 코드가 없고 스마트 캐주얼이면 충분합니다. 낮 공연이라 정장이나 드레스까지는 필요 없습니다.',
      items: [
        ['옷', '셔츠·블라우스나 니트에 슬랙스, 치마, 깔끔한 청바지나 원피스 정도. 운동복, 비치웨어, 조리(슬리퍼)는 피하기.'],
        ['신발', '공연 뒤 더 록스·바랑가루·달링하버까지 계속 걸으니 깔끔한 스니커즈나 편한 로퍼.'],
        ['겉옷', '극장 안은 냉방이 강하고 밤 불꽃놀이 때 물가 바람이 불어 가디건이나 가벼운 재킷.'],
        ['가방', 'A4보다 큰 가방은 물품 보관소에 맡겨야 합니다. 수영 가방은 숙소에 두고 작은 가방만.'],
        ['극장 안', '음식·음료 반입 불가, 공연 중 촬영 금지. 늦으면 적당한 때까지 입장을 기다려야 할 수 있어 13:00 도착.'],
      ],
    },
    rain: {
      note: '올림픽파크 수영장은 실내라 그대로. 보타닉 가든은 주립미술관으로, 옵저버토리 힐·바랑가루는 MCA로 바꿉니다.',
      map: '/maps/rain3.jpg',
      mapAlt: '시내 명소일 비 오는 날 동선: 올림픽파크 → 세인트메리 → 아트 갤러리 NSW → 오페라하우스 → 더 록스 마켓 → MCA → 차이나타운',
      items: [
        ['07:30–10:50', '올림픽파크 수영 → 숙소에서 옷 갈아입기 (그대로)', '같음'],
        ['11:00–11:20', '세인트메리 대성당 (실내)', '하이드파크 산책'],
        ['11:20–12:10', '아트 갤러리 오브 NSW', '보타닉 가든'],
        ['12:10–12:50', '서큘러키로 이동 (St James역에서 기차), 점심', '같음'],
        ['13:00', '오페라하우스 도착 (공연 30분 전)', '같음'],
        ['13:30–14:45', '발레 코플랜드 댄스 에피소드 (실내, 그대로)', '같음'],
        ['15:00–16:00', '더 록스 마켓 (천막 아래, 토·일만)', '같음'],
        ['16:00–17:00', 'MCA 현대미술관 (폐관 시간 확인)', '옵저버토리 힐·바랑가루'],
        ['17:30–', '기차로 돌아와 차이나타운 저녁', '달링하버'],
        ['21:00', '달링하버 불꽃놀이 (약한 비면 진행, 날씨 나쁘면 취소)', '같음'],
      ],
    },
  },
  bondi: {
    id: 'bondi',
    tag: '본다이',
    title: '브론테→본다이 코스탈 워크, 본다이 마켓, 시드니 대학교, 맨리 페리 선셋',
    summary:
      '해안길을 약 1시간 걷고 10시에 여는 본다이 마켓(일요일만)과 본다이 비치를 들른 뒤, 숙소에 들르지 않고 시드니 대학교를 거쳐 서큘러키에서 맨리 페리를 탑니다. 다음 날 이른 투어가 있으면 20시에는 숙소로.',
    map: '/maps/day4.jpg',
    mapAlt: '본다이일 동선: 브론테 → 본다이 코스탈 워크 → 본다이 마켓·비치 → 시드니 대학교 → 서큘러키 → 맨리 페리 선셋',
    items: [
      ['07:30–08:30', '기상·아침', '—', '선크림·모자·물, 편한 운동화'],
      ['08:30–09:15', '숙소 → 브론테 비치', '기차 Town Hall → Bondi Junction + 버스', '약 40–45분', 'Bronte Beach'],
      ['09:15–10:15', '코스탈 워크: 브론테 → 타마라마 → 본다이', '도보 약 1시간', '해안 절벽길', 'Bondi to Bronte Coastal Walk'],
      ['10:15–12:00', '본다이 마켓', '도보', '일요일 10:00–16:00, 본다이 공립학교 운동장', 'Bondi Markets'],
      ['12:00–13:00', '본다이 점심', '도보', '식당 추천 참고'],
      ['13:00–14:15', '본다이 비치 휴식, 아이스버그 전망', '도보', '해수욕은 빨간·노란 깃발 사이에서만', 'Bondi Icebergs'],
      ['14:15–15:00', '본다이 → 시드니 대학교', '버스 → Bondi Junction, 기차 → Central, 도보 15분', '약 45분. 숙소에 들르지 않음'],
      ['15:00–16:00', '시드니 대학교 차우 착 윙 박물관', '—', '무료, 주말 12:00–16:00', 'Chau Chak Wing Museum'],
      ['16:00–16:45', '쿼드랭글(본관)·피셔 도서관 주변 캠퍼스 산책', '도보', '사암 건물과 장미창이 사진 명소', 'University of Sydney Quadrangle'],
      ['16:45–17:30', '시드니 대학교 → 서큘러키', '버스 또는 도보 → Central, 기차 → Circular Quay', '약 35–45분'],
      ['17:30–17:50', '서큘러키 도착, 간식·화장실', '—', '페리 시간 확인'],
      ['17:50–18:15', '맨리 페리(서큘러키 3번 선착장)', '페리 20–25분', '편도 약 A$7, 15–20분 간격', 'Circular Quay Wharf 3'],
      ['18:15–19:10', '맨리 비치 산책, 맨리에서 저녁', '도보 5분', '피시앤칩스 등', 'Manly Beach'],
      ['19:10–19:40', '돌아오는 페리에서 선셋', '페리 20–25분', '일몰 무렵 오페라하우스·하버브리지가 한 화면에. 야외 좌석'],
      ['19:40–20:00', '서큘러키 → 숙소', '기차 + 도보', ''],
      ['20:00–21:30', '다음 날 일정 준비', '—', '투어가 있으면 짐 싸기'],
      ['21:30', '취침', '—', ''],
    ],
    rain: {
      note: '코스탈 워크는 절벽 길이라 미끄러우니 빼고, 늦잠 후 숙소 근처 실내에서 보냅니다. 비 예보가 이날만이면 코스탈 워크를 출국일 오전으로 옮길 수 있습니다(본다이 마켓은 일요일만).',
      map: '/maps/rain4.jpg',
      mapAlt: '본다이일 비 오는 날 동선: 오스트레일리안 뮤지엄 → 차이나타운 점심 → QVB·스트랜드 아케이드(또는 주립도서관) → 패디스 마켓 → 숙소',
      items: [
        ['10:00–12:30', '오스트레일리안 뮤지엄 (무료, 공룡·호주 동물)'],
        ['12:30–13:30', '점심 (차이나타운)'],
        ['13:30–15:00', 'QVB → 스트랜드 아케이드 → 검션 커피 (또는 주립도서관)'],
        ['15:00–17:00', '패디스 마켓 쇼핑 (18:00 마감, 월·화 휴무)'],
        ['17:00–', '숙소 휴식, 다음 날 일정 준비'],
      ],
    },
  },
  portstephens: {
    id: 'portstephens',
    tag: '포트스테판 투어',
    title: '포트스테판 투어, 도착 후 저녁·휴식',
    summary: '예약한 투어 일정표는 그대로 두고 집결 전과 도착 후만 채웠습니다. 샌드보딩 후 갈아입을 옷과 여분 양말을 챙기세요.',
    map: '/maps/day5.jpg',
    mapAlt: '5일차 동선: 06:50 집결 → 포트스테판 투어 → 18:50 시드니 도착 → 숙소 근처 저녁',
    items: [
      ['05:45–06:20', '기상, 간단한 아침', '—', '전날 사둔 빵·과일'],
      ['06:20–06:40', '숙소 → SEA LIFE 근처', '도보 10–15분', '10분 전 도착'],
      ['06:50', '포트스테판 투어 집결: 1-5 Wheat Road(SEA LIFE 오른쪽), 07:00 정시 출발', '투어 버스', '', '1-5 Wheat Road Sydney'],
      ['09:00', '고속도로 휴게소', '—', ''],
      ['10:30', '돌핀크루즈', '—', '바람막이'],
      ['12:10', '점심', '—', ''],
      ['13:10', '샌드보딩', '—', '선글라스·갈아입을 옷'],
      ['14:40', '오크베일 동물원', '—', ''],
      ['15:50', '포트스테판 출발', '투어 버스 약 3시간', '버스에서 눈 붙이기'],
      ['18:50', '시드니 도착 (하차: 389 Pitt St, Rydges 호텔 앞)', '—', ''],
      ['19:00–20:15', '숙소 근처 저녁', '도보', '식당 추천 참고. 빠진 기념품 과자는 울월스에서 보충'],
      ['20:15–21:30', '숙소에서 휴식, 다음 날 짐 미리 싸기', '—', '오페라하우스·하버브리지 야경은 3·4일차에 보므로 생략'],
    ],
    rain: '투어 후에는 숙소 근처에서 저녁만 먹으니 비가 와도 그대로입니다.',
  },
  departure: {
    id: 'departure',
    tag: '시내·귀국',
    title: '느긋한 아침, 마지막 쇼핑, 귀국',
    summary:
      '21:30 비행기라 출발 3시간 전인 18:30까지 공항에 도착하도록 거꾸로 계산했습니다. 패디스 마켓은 월·화에 쉬니 쇼핑은 QVB·피트 스트리트·면세점에서.',
    // airport rows are added in plan.js
    items: [
      ['07:30–09:30', '늦잠, 아침, 짐 싸기', '—', '액체류(포포크림 등)는 위탁 수하물로'],
      ['10:00', '체크아웃, 짐 맡기기', '—', '짐 보관 가능 여부 미리 확인'],
      ['10:30–12:30', '쇼핑 ③ QVB → 스트랜드 아케이드 → ④ 피트 스트리트 몰 → ⑤ 시드니 면세점', '각 도보 3–5분', '어그·캐시미어 / 젤리켓 / 프로폴리스·마누카꿀. 면세점은 여권', 'Queen Victoria Building'],
      ['12:30–13:30', '점심', '도보', ''],
      ['13:30–16:00', '아트 갤러리 오브 NSW (무료), 미술관 카페에서 쉬기', '도보 약 20분 또는 St James역', '3일차에 비로 이미 갔다면 오스트레일리안 뮤지엄(무료)', 'Art Gallery of New South Wales'],
      ['16:00–17:15', '숙소 근처 카페, 짐 찾기', '도보 약 10분', '짐 다시 정리'],
    ],
    rain: '쇼핑과 미술관은 실내라 그대로 갑니다.',
  },
};

export const DEFAULT_ORDER = ['arrival', 'bluemountains', 'city', 'bondi', 'portstephens', 'departure'];

const S = {
  timber: ['호주 3n년차 블로거', 'https://blog.naver.com/timberbank/224185497542'],
  expert: ['Sydney Expert', 'https://sydneyexpert.com/where-to-eat-in-darling-harbour/'],
  janiceTop: ['Janice Fung', 'https://www.janicefung.com/top-10-cheap-eats-in-sydney/'],
  janiceCT: ['Janice Fung', 'https://www.janicefung.com/sydney-chinatown-cheap-eats/'],
  broad: ['Broadsheet', 'https://www.broadsheet.com.au/sydney/food-and-drink/article/cheap-eats-12-bondi-beach'],
  azzurro: ['Azzurro', 'https://www.azzurrohotels.com/blog/cheap-eats-sydney-budget-food-guide'],
  klook: ['Klook', 'https://www.klook.com/blog/cheap-food-sydney/'],
  deals: ['Sydney Expert 딜', 'https://sydneyexpert.com/dining-deals-in-sydney/'],
  lateTO: ['Time Out 심야 식당', 'https://www.timeout.com/sydney/restaurants/the-best-late-night-dining-in-sydney'],
  lateSL: ['Switch Living', 'https://www.switchliving.com.au/student-guide/sydneys-best-late-night-eats-first-stop-chinatown/'],
  bondi: ['Visit Bondi Beach', 'https://www.visitbondibeach.com/bondi-eat-and-drink/cheap-eats-bondi-beach'],
};

// tpl = the day plan the meal belongs to.
// Row: [name, location, menu/price, sources, reservation]
// reservation: '워크인' (walk in), '예약 권장' (book when busy), '예약필요' (book ahead)
const W = '워크인';
export const MEALS = [
  {
    tpl: 'arrival', time: '17:45', title: '저녁 — 숙소에서 요리 (외식하고 싶으면 차이나타운·헤이마켓)',
    list: [
      ['마막 Mamak', '15 Goulburn St, 헤이마켓 (도보 5분)', '로티 카나이, 사테. 19시 전에 가기', [S.timber, S.azzurro], '워크인(예약 안 받음, 줄 빨리 빠짐)'],
      ['난징 덤플링 Nanjing Dumpling', '차이나타운', '만두·국수, 대부분 A$20 이하. 줄이 김', [S.klook], W],
      ['딕슨 하우스 푸드코트 Dixon House Food Court', 'Little Hay St, 차이나타운', '여러 나라 아시아 음식을 싸게', [S.janiceTop], W],
      ['차이나타운 누들 킹 Chinatown Noodle King', 'Sussex St, 차이나타운', '죽·국수. 아주 저렴', [['Time Out', 'https://www.timeout.com/sydney/things-to-do/haymarket-area-guide']], W],
      ['우메 버거 Ume Burger', '달링 스퀘어', '버거 A$16–19', [S.azzurro], W],
    ],
    note: '기본은 울월스에서 장 봐서 숙소에서 해 먹기입니다. 아래는 외식하고 싶을 때 고르는 숙소 근처 식당입니다.',
  },
  {
    tpl: 'bluemountains', time: '11:45', title: '점심 — 투어 집결지(SEA LIFE) 근처',
    list: [
      ['마릭빌 포크 롤 Marrickville Pork Roll', '스팀 밀 레인(달링 스퀘어 옆)', '반미 약 A$10', [S.expert, S.janiceTop], '워크인(포장)'],
      ['도파 Dopa', '달링 스퀘어', '일본식 덮밥 A$13.80부터', [S.expert], W],
      ['넘버원 마라탕 No.1 Malatang', '345B-353 Sussex St', '재료를 골라 무게로 계산', [S.timber], W],
      ['토스티 스미스 Toastie Smith', '달링 스퀘어', '토스트 샌드위치, 전 메뉴 A$17.50 이하', [S.expert], W],
      ['호지악 Ho Jiak Haymarket', 'Hay St, 헤이마켓', '평일 11:00–16:00 점심 세트+음료 A$30 미만', [S.deals], '예약 권장'],
    ],
  },
  {
    tpl: 'bluemountains', time: '22:00', title: '밤 — 투어 후 차이나타운 야식',
    note: '투어 하차지는 389 Pitt St(Rydges 호텔 앞)입니다. 22시 이후 영업 여부는 구글 지도로 확인하세요.',
    list: [
      ['미스터 첸 비프 누들 Mr Chen Beef Noodle', 'Prince Centre, 8 Quay St', '매콤한 소스 완탕, 소금후추 두부', [S.janiceCT], W],
      ["마더 추 Mother Chu's Taiwanese Gourmet", '84-88 Dixon St', '달걀 팬케이크 A$5 이하, 찹쌀 롤', [S.janiceCT], W],
      ["엠퍼러스 가든 Emperor's Garden", '96-100 Hay St', '엠퍼러스 퍼프(슈크림 빵)', [S.janiceCT], '워크인(포장)'],
      ['도디 파이당 Dodee Paidang', '헤이마켓', '똠얌 국수. 매일 자정까지', [S.lateTO], W],
      ['올드타운 홍콩 퀴진 Old Town Hong Kong Cuisine', 'Dixon St, 차이나타운', '홍콩식 국수·덮밥. 금·토 새벽 2시까지', [S.lateSL], W],
    ],
  },
  {
    tpl: 'city', time: '07:00', title: '아침 — 올림픽파크 가기 전',
    note: '07:00에 확실히 여는 곳은 럭스 8 카페뿐입니다. 나머지는 늦게 열어 수영 후 숙소에 들를 때 브런치로 가거나, 숙소 주방에서 간단히 드세요.',
    list: [
      ['에디션 커피 로스터스 Edition Coffee Roasters', '스팀 밀 레인(헤이마켓)', '수플레 팬케이크, 커피. 여는 시간 확인', [S.expert], W],
      ['럭스 8 카페 Luxe 8 Cafe & Bar', 'Sussex St, CBD', '매일 07:00 오픈. 샌드위치·커피', [['Restaurant Guru', 'https://restaurantguru.com/breakfast-Haymarket-m9619']], W],
      ['헤이븐 Haven Coffee', '85 Harbour St, 헤이마켓', '아보카도 토스트. 주말 07:30 오픈', [['Haven Coffee', 'https://havencoffee.com.au/']], W],
      ['싱글오 Single O', '60-64 Reservoir St, 서리힐스 (주말 08:00 오픈)', 'The Avo Show, 바나나브레드', [['네이버 블로그', 'https://blog.naver.com/llalla_nana/224446432474']], '워크인(웨이팅)'],
      ["더 브라더스 카페 The Brother's Cafe", '달링 스퀘어', '브런치. 매일 09:00 오픈', [['Darling Harbour', 'https://www.darlingharbour.com/eat-drink/the-brother-s-cafe']], W],
    ],
  },
  {
    tpl: 'city', time: '12:15', title: '점심(공연 전) — 오페라하우스·서큘러키·더 록스',
    list: [
      ['바 루카 Bar Luca', '52 Phillip St', '수제버거, 옥수수 구이', [['네이버 블로그', 'https://blog.naver.com/daisai_house/224229931627']], W],
      ['슈크 Shuk', '더 록스', '아사이 볼 A$13, 샌드위치 A$16', [['The Rocks 공식 가이드', 'https://www.therocks.com/editorials/a-locals-guide-to-cheap-eats-in-the-rocks']], W],
      ['포 프로그스 크레페리 Four Frogs Creperie', '서큘러키', '갈레트·크레페. 빨리 나옴', [['Tripadvisor', 'https://www.tripadvisor.com/RestaurantsNear-g255060-d257278-Sydney_Opera_House-Sydney_New_South_Wales.html']], W],
      ['오페라 바 Opera Bar', '오페라하우스 바로 아래', '하버 뷰 캐주얼 메뉴. 가격은 조금 더 나감', [['Man of Many', 'https://manofmany.com/culture/food/best-circular-quay-restaurants']], '예약 권장(토요일 혼잡)'],
      ['젤라티시모 Gelatissimo', '오페라하우스 근처', '후식 젤라또', [['시드니 16년 거주자', 'https://blog.naver.com/zzintour/224445286815']], W],
    ],
  },
  {
    tpl: 'city', time: '18:00', title: '저녁 — 달링하버 → 불꽃놀이 → 숙소',
    list: [
      ["베티스 버거 Betty's Burgers", 'ICC 시드니(14 Darling Dr)', "Betty's Classic, 버섯버거, 쉐이크", [S.timber], W],
      ['하라주쿠 교자 Harajuku Gyoza', '달링 스퀘어', '교자와 수제맥주', [S.expert], '예약 권장(토요일 불꽃놀이 밤)'],
      ["닉스 씨푸드 Nick's Seafood Restaurant", '코클 베이 워프, 달링하버 물가', '해산물. 가격대 높음. 창가에서 불꽃놀이 보기 좋음', [["Nick's Group", 'https://www.nicksgroup.com.au/events-specials/fireworks/']], '예약필요(불꽃놀이 밤 창가 좌석)'],
      ['폰툰 바 Pontoon Bar', '달링하버 물가', '피자·맥주. 물가 자리에서 불꽃놀이 보기 좋음', [['네이버 블로그', 'https://blog.naver.com/tinytravelersabroad/224384363444']], '워크인(토요일 밤 혼잡)'],
      ['누들 페이스 Noodle Face', '달링 쿼터', '만두·국수·수프, 전 메뉴 A$20 이하', [S.expert], W],
    ],
    note: '불꽃놀이(21:00) 전에 식사를 마치고 20:30까지 물가 자리를 잡으세요.',
  },
  {
    tpl: 'bondi', time: '12:00', title: '점심 — 코스탈 워크 후 본다이',
    note: '본다이 마켓(일요일 10:00–16:00)의 먹거리 노점도 있습니다.',
    list: [
      ['홍하 Hong Ha', '본다이 비치, 1986년부터', '레몬그라스 치킨 반미 A$9.50', [S.broad], '워크인(포장)'],
      ['리틀 엘 Little L', '1/23-37 Campbell Parade, 노스 본다이', '포르투갈식 치킨버거 약 A$10–15', [S.broad, S.bondi], W],
      ['하트 카페 Heart Cafe', '95 Roscoe St', '치킨·치미추리·아보카도 롤 A$12', [S.broad], W],
      ['피시볼 Fishbowl', 'Campbell Parade', '포케 볼. 빨리 나오고 골라 담기', [S.bondi], W],
      ['라 피아디나 La Piadina', 'Glenayr Ave', '즉석 피아디나, 커피', [S.bondi], W],
    ],
  },
  {
    tpl: 'portstephens', time: '19:00', title: '저녁 — 투어 후 숙소 근처',
    note: '투어 하차지(389 Pitt St)에서 걸어서 갈 수 있는 곳들입니다.',
    list: [
      ['바삭스 Basax (한국식 치킨)', '415 Pitt St, 헤이마켓', '프라이드·양념 치킨', [S.timber], W],
      ["시안 퀴진 Xi'an Cuisine", '4/90 Hay St, 헤이마켓', '로우자모, 량피', [S.janiceCT], W],
      ["미세스 찬스 키친 Mrs Chan's Kitchen", '635 George St', '태국식 보트 누들 A$6.9', [S.janiceCT], W],
      ['대장금 Dae Jang Kum', 'Goulburn St', '한식 고기구이. 거의 매일 새벽 4시까지', [S.lateTO], '워크인(예약 가능)'],
      ['골든 센추리 Golden Century', 'Sussex St', '광둥식 해산물·죽. 가격대 높음', [S.lateTO], '예약 권장'],
    ],
  },
  {
    tpl: 'departure', time: '12:30', title: '점심 — 마지막 쇼핑 후',
    list: [
      ['말레이 차이니즈 누들 바 Malay Chinese Noodle Bar', '33 Pitt St, 서큘러키역 도보 7분', '씨푸드 락사. 평일 11:00–16:00만', [['시드니 거주 블로거', 'https://blog.naver.com/leeeeeee_life/224392038129']], W],
      ["지미스 레시피 Jimmy's Recipe", '더 갤러리스 1층(500 George St)', '말레이시아 락사', [S.janiceTop], W],
      ['마펜 누들 하우스 Mappen Noodle House', '537-551 George St', '셀프 서비스 우동·소바·튀김', [S.janiceTop], W],
      ['QVB 지하 푸드코트', 'QVB 지하층, 쇼핑 동선 그대로', '덮밥·국수·샌드위치 A$10–14', [S.klook], W],
      ['페티 루루 Petit Loulou', '마틴 플레이스 메트로 입구', '바게트 샌드위치+샐러드+음료 A$15', [S.deals], W],
    ],
  },
].map((m) => ({
  ...m,
  // map search uses the original-language name plus the street, e.g. "Mamak 15 Goulburn St"
  list: m.list.map(([name, loc, menu, src, rsv]) => ({
    name, loc, menu, src, rsv,
    q: `${(name.match(/[A-Za-z0-9'.&-]+/g) || []).join(' ')} ${loc.split(/[,(]/)[0]}`.trim(),
  })),
}));

export const TRANSPORT = [
  ['공항 ↔ Town Hall', 'Airport Link 기차(환승 없음)', '15–20분'],
  ['숙소 ↔ Town Hall역', '도보', '5분'],
  ['숙소 → 차이나타운·패디스 마켓', '도보', '5–10분'],
  ['숙소 → 달링하버·SEA LIFE', '도보', '10–15분'],
  ['숙소 → QVB·피트 스트리트', '도보', '5–10분'],
  ['숙소 → 하이드파크', '도보', '15분'],
  ['숙소 → Olympic Park', '기차 Town Hall → Lidcombe 환승', '40–45분'],
  ['숙소 → 본다이·브론테', '기차 → Bondi Junction + 버스', '40–45분'],
  ['서큘러키 ↔ 숙소', '기차(Town Hall) + 도보', '10–15분'],
  ['세인트메리 → 오페라하우스(보타닉 가든 경유)', '도보', '20분'],
  ['더 록스 → 바랑가루 → 달링하버', '도보', '30분'],
  ['본다이 → 시드니 대학교', '버스 → Bondi Junction, 기차 → Central, 도보', '약 45분'],
  ['시드니 대학교 → 서큘러키', '버스 또는 도보 → Central, 기차 → Circular Quay', '약 35–45분'],
];

export const RAIN_SPOTS = [
  ['아트 갤러리 오브 NSW', '도보 20분 / St James역', '무료, 10:00–17:00 (수 22:00)', '하이드파크·세인트메리에서 걸어서 이어짐', 'https://www.artgallery.nsw.gov.au/visit/'],
  ['오스트레일리안 뮤지엄', '도보 15분 / Museum역', '무료(특별전 유료), 10:00–17:00', '공룡·호주 동물, 2~4시간', 'https://australian.museum/visit/'],
  ['뉴사우스웨일스 주립도서관', '도보 20분', '무료 (운영시간 확인)', '미첼 열람실', null],
  ['MCA 현대미술관', '기차로 서큘러키', '입장료 확인 필요', '옥상 카페에서 오페라하우스 뷰', null],
  ['QVB → 스트랜드 아케이드 → 검션 커피', '도보 5~10분', 'QVB 평일 09:00–18:00', '지붕 있는 쇼핑 거리', null],
  ['차우 착 윙 박물관 (시드니대)', '버스·도보 약 30분', '무료', '덜 알려진 대학 박물관', null],
];

export const TIPS = [
  ['요일별 운영', '패디스 마켓은 수~일(월·화 휴무), 더 록스 마켓은 토·일, 본다이 마켓은 일요일 10:00–16:00. 요일에 맞춰 일정을 짰습니다.'],
  ['운동 준비물', '수영복·수영모·수경·수건, 운동화, 러닝용 밝은 옷. 아쿠아틱센터는 귀중품 최소한으로.'],
  ['헬스장', '3일차는 공연 준비로 올림픽파크 헬스를 뺐습니다. 운동을 더 하고 싶으면 다른 날 아침 숙소 헬스장을 쓰세요.'],
  ['투어 날', '블루마운틴 별보기는 밤에 추움 → 겹옷. 포트스테판은 06:50 집결이라 전날 일찍 취침.'],
  ['자외선', '러닝·코스탈 워크 때 선크림과 모자 필수.'],
  ['면세·환급', '면세점은 여권. 한 매장 A$300 이상 구매 시 공항에서 TRS 환급.'],
  ['미리 예약·확인', '오페라하우스 발레 공연(토 13:30) 예매, 체크아웃 후 짐 보관, 투어 집결·하차 장소.'],
];

export const SOURCES = [
  ['아쿠아틱센터 공식 페이지', 'https://www.sydneyolympicpark.com.au/aquatic-centre'],
  ['아쿠아틱센터 랩 스위밍 안내', 'https://www.sydneyolympicpark.com.au/things-to-see-and-do/lap-swimming'],
  ['아쿠아틱센터 방문 후기 (lhl829)', 'https://blog.naver.com/lhl829/224425218347'],
  ['시드니 추천 러닝 코스 (dyudyulog)', 'https://blog.naver.com/dyudyulog/224446221046'],
  ['서큘러키·오페라하우스 아침 러닝 (chamchi_baebae)', 'https://blog.naver.com/chamchi_baebae/224434048360'],
  ['시내 반나절 워킹투어 (yugayam)', 'https://blog.naver.com/yugayam/224434961360'],
  ['시내 필수 명소 하루 코스 (travel_quokka)', 'https://blog.naver.com/travel_quokka/224382462797'],
  ['시드니 5박 6일 코스 (eoqkrtkrjs5)', 'https://blog.naver.com/eoqkrtkrjs5/224435680092'],
  ['시드니 쇼핑리스트 (db_joo)', 'https://blog.naver.com/db_joo/224446863427'],
  ['기념품 쇼핑리스트 (sjsn6313)', 'https://blog.naver.com/sjsn6313/224402458916'],
  ['맨리 페리 후기·노선 정리 (chohammm)', 'https://blog.naver.com/chohammm/224123702343'],
  ['맨리 페리 선셋 후기 (nomadzin)', 'https://blog.naver.com/nomadzin/224434970106'],
  ['차우 착 윙 박물관 방문 안내 (시드니 대학교)', 'https://www.sydney.edu.au/museum/whats-on/visit.html'],
  ['Fireworks at Darling Harbour (공식)', 'https://www.darlingharbour.com/whats-on/campaigns/fireworks'],
  ['Copland Dance Episodes (호주 발레단, 시드니 오페라하우스)', 'https://www.sydneyoperahouse.com/the-australian-ballet/2026-season/copland-dance-episodes'],
];

export const EXPENSE_CATEGORIES = ['식비', '교통', '쇼핑', '입장·투어', '숙소', '기타'];

// Shopping list: [item, price (AUD, rough), where, note]. Prices move with sales; Woolworths/Coles and
// Chemist Warehouse run half-price weeks often.
export const SHOPPING = {
  note: '가격은 호주 달러 기준 대략적인 값이고 세일에 따라 크게 달라집니다. 마트(울월스·콜스)와 약국(Chemist Warehouse)은 반값 세일 표시(노란·빨간 딱지)를 보고 사세요.',
  groups: [
    {
      id: 'food', title: '🍪 식품·간식', where: '마트(타운홀 울월스·콜스), 1일차·6일차',
      items: [
        ['팀탐 Tim Tam', 'A$4–6 / 팩 (세일 A$2.5)', '울월스·콜스', '오리지널, 더블코트, 다크. 한정판 맛도 있음'],
        ['아노츠 비스킷(Shapes·Monte Carlo 등)', 'A$3–5', '울월스·콜스', '가볍고 부피 작은 과자 선물'],
        ['베지마이트 Vegemite', 'A$4–8', '울월스·콜스', '호주 국민 잼. 작은 튜브형이 선물용으로 좋음'],
        ['마카다미아 너트', 'A$8–15', '울월스·콜스', '소금·꿀 맛. 밀봉 제품만'],
        ['호주 커피 원두', 'A$18–25 / 250g', '캄포스 커피·마트', '원두는 한국 반입 가능(볶은 것)'],
        ['마누카 꿀 Manuka Honey', 'A$20–100+', 'Chemist Warehouse·면세점', 'MGO·UMF 숫자가 높을수록 비쌈. 액체라 위탁 수하물로'],
        ['호주 와인', 'A$15–40', 'BWS·Dan Murphy\'s', '한국 면세는 술 2병·2L·US$400 이하. 위탁 수하물에 뽁뽁이'],
      ],
    },
    {
      id: 'health', title: '💊 영양제·약국', where: 'Chemist Warehouse (시내 곳곳)',
      items: [
        ['스위스 Swisse 영양제', 'A$15–40 (세일 많음)', 'Chemist Warehouse', '비타민·밀크시슬·콜라겐'],
        ['블랙모어스 Blackmores', 'A$15–40', 'Chemist Warehouse', '오메가3·관절'],
        ['바이오 아일랜드 Bio Island', 'A$20–35', 'Chemist Warehouse', '어린이·임산부 영양제로 유명'],
        ['포포크림 Lucas\' Papaw Ointment', 'A$5–12', '약국·마트·패디스 마켓', '빨간 튜브. 여러 개 사서 나눠 주기 좋음'],
        ['프로폴리스 치약·스프레이', 'A$10–25', 'Chemist Warehouse', '6일차 면세점에서도 비교'],
      ],
    },
    {
      id: 'souvenir', title: '🎁 기념품 (금액대별)', where: '패디스 마켓(1일차), 더 록스 마켓(3일차), QVB·면세점(6일차)',
      tiers: true,
      items: [
        ['마그넷·키링·엽서', 'A$5 이하', '패디스 마켓', '여러 개 사면 깎아 줌'],
        ['팀탐 미니팩·초콜릿', 'A$5 이하', '마트', '직장·친구 돌리기용'],
        ['코알라·캥거루 인형(작은 것)', 'A$5–15', '패디스 마켓', '큰 것은 A$20 이상'],
        ['오페라하우스 미니어처·스노볼', 'A$5–15', '패디스 마켓·서큘러키', ''],
        ['에코백·티타월', 'A$10–20', '더 록스 마켓·박물관 숍', '원주민 아트 무늬가 예쁨'],
        ['핸드크림(이솝 Aesop 등 호주 브랜드)', 'A$30–50', '피트 스트리트·면세점', '이솝은 호주 브랜드'],
        ['원주민 아트 소품', 'A$20–60', '더 록스·아트 갤러리 숍', '"Aboriginal owned / 작가 정품" 표시 확인'],
        ['오팔 액세서리', 'A$100+', '더 록스·시내 보석점', '호주 특산 보석. 보증서 받기'],
        ['어그 부츠·슬리퍼', 'A$120–300', 'QVB·면세점', '아래 옷 항목 참고'],
      ],
    },
    {
      id: 'clothes', title: '👕 옷·신발', where: '피트 스트리트 몰·QVB·스트랜드 아케이드(6일차), 본다이(4일차)',
      items: [
        ['어그 UGG 부츠·슬리퍼', 'A$120–300', 'QVB·면세점', '"Made in Australia" 표시와 브랜드(UGG Since 1974 등) 확인'],
        ['메리노 울·캐시미어 니트', 'A$80–250', '피트 스트리트·QVB', '가볍고 따뜻함. 세일 매대 확인'],
        ['서핑 브랜드 티셔츠·후드(빌라봉·립컬·퀵실버)', 'A$30–80', '본다이·피트 스트리트', '본다이 매장에 한정 디자인'],
        ['코튼온 Cotton On', 'A$10–40', '피트 스트리트 몰', '호주 SPA 브랜드. 기본 티·잠옷'],
        ['컨트리 로드 Country Road', 'A$60–200', '피트 스트리트 몰', '호주 캐주얼 브랜드. 리넨 셔츠·토트백'],
        ['알엠 윌리엄스 R.M. Williams 부츠', 'A$600+', '피트 스트리트', '호주 대표 가죽 부츠(고가)'],
      ],
    },
  ],
  tips: [
    ['TRS 환급', '한 매장에서 A$300 이상(영수증 합산 가능) 산 물건은 출국 때 공항 TRS에서 GST 10%를 돌려받습니다. 물건과 영수증·여권을 챙기세요.'],
    ['한국 입국 면세', '1인 US$800 이하 면세(술 2병·2L·US$400 이하, 향수 100ml). 넘으면 자진 신고하세요.'],
    ['반입 금지', '육포 등 고기 가공품, 생과일·견과류 생것은 한국 반입 금지 또는 검역 대상입니다. 밀봉된 과자·꿀·볶은 원두는 대부분 가능.'],
    ['액체류', '꿀·와인·포포크림·핸드크림은 기내 100ml 제한이라 위탁 수하물로.'],
  ],
};
