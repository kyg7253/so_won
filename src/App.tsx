import { useState, useEffect, useRef } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const PROMO_MESSAGES = [
  "첫 구매 고객 10% 할인 혜택 · 코드 SOONE10",
  "5만원 이상 구매 시 무료배송",
  "50개부터 시작하는 기업 맞춤 샤쉐 — 지금 문의하세요",
];

const NAV_ITEMS = [
  { label: "SHOP", sub: ["샤쉐", "디퓨저", "룸 스프레이", "향기 오브제", "신제품", "베스트"] },
  { label: "SCENT", sub: ["향으로 찾기", "공간으로 찾기", "무드로 찾기", "향기 파인더"] },
  { label: "GIFT", sub: ["선물 세트", "가격대별", "메시지 카드", "선물 포장"] },
  { label: "BUSINESS", sub: ["기업 굿즈", "제작 과정", "제작 사례", "견적 문의"] },
  { label: "JOURNAL", sub: ["향과 기억", "공간과 향", "원료 이야기", "사용 가이드", "브랜드 스토리"] },
];

const HERO_SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1784028260705-34d9b65a95b2?w=1600&h=900&fit=crop&auto=format",
    caption: "향을 머금는 소재",
  },
  {
    img: "https://images.unsplash.com/photo-1783900353237-a2c50f8e2158?w=1600&h=900&fit=crop&auto=format",
    caption: "공간의 첫인상",
  },
];

const SPACES = [
  { label: "현관", img: "https://images.unsplash.com/photo-1760227484899-5f7ccf87c456?w=600&h=750&fit=crop&auto=format", desc: "첫인상이 시작되는 곳" },
  { label: "침실", img: "https://images.unsplash.com/photo-1648415198825-7c805bfa043e?w=600&h=750&fit=crop&auto=format", desc: "잠들기 전의 고요함" },
  { label: "옷장", img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=750&fit=crop&auto=format", desc: "옷에 스미는 기억" },
  { label: "차량", img: "https://images.unsplash.com/photo-1778530207640-a5fc0bdf8ba5?w=600&h=750&fit=crop&auto=format", desc: "이동 중의 작은 공간" },
  { label: "업무 공간", img: "https://images.unsplash.com/photo-1761659567183-ae0a380f2efc?w=600&h=750&fit=crop&auto=format", desc: "집중이 필요한 시간" },
  { label: "선물", img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&h=750&fit=crop&auto=format", desc: "마음을 담은 향" },
];

const COLLECTIONS = [
  {
    title: "옷장에 남는\n깨끗한 향",
    desc: "한지와 면직물에 담긴 깨끗하고 섬세한 향이 옷감 사이에 오래 머뭅니다. 매일 아침 옷장을 열 때마다 그날의 기분이 시작됩니다.",
    tag: "샤쉐 컬렉션",
    img: "https://images.unsplash.com/photo-1604882767135-b41fac508fff?w=900&h=1100&fit=crop&auto=format",
    reverse: false,
  },
  {
    title: "잠들기 전,\n낮아지는 향",
    desc: "라벤더와 화이트 머스크가 베이스로 깔린 침실용 디퓨저. 하루의 끝에 몸과 마음이 자연스럽게 내려앉는 시간을 만들어줍니다.",
    tag: "디퓨저 컬렉션",
    img: "https://images.unsplash.com/photo-1638531540340-9c3d9f3c3077?w=900&h=1100&fit=crop&auto=format",
    reverse: true,
  },
  {
    title: "처음 들어선\n공간의 기억",
    desc: "현관에 놓인 한 개의 샤쉐가 공간의 인상을 결정합니다. 손님이 떠난 뒤에도 그날의 향이 오래 남아 기억이 됩니다.",
    tag: "공간 컬렉션",
    img: "https://images.unsplash.com/photo-1778784544843-712029254a98?w=900&h=1100&fit=crop&auto=format",
    reverse: false,
  },
];

const PRODUCTS = [
  {
    name: "화이트 코튼 샤쉐",
    note: ["코튼", "머스크", "시더우드"],
    space: "옷장·침실",
    duration: "약 3개월",
    price: "18,000원",
    badge: "BEST",
    img: "https://images.unsplash.com/photo-1778530207626-7eaa554e0d9d?w=500&h=600&fit=crop&auto=format",
  },
  {
    name: "세이지 & 버베나 디퓨저",
    note: ["세이지", "버베나", "우드"],
    space: "거실·업무 공간",
    duration: "약 2개월",
    price: "42,000원",
    badge: "NEW",
    img: "https://images.unsplash.com/photo-1778784544843-712029254a98?w=500&h=600&fit=crop&auto=format",
  },
  {
    name: "아이리스 룸 스프레이",
    note: ["아이리스", "파우더", "앰버"],
    space: "침실·욕실",
    duration: "60회 사용",
    price: "28,000원",
    badge: "",
    img: "https://images.unsplash.com/photo-1778530207640-a5fc0bdf8ba5?w=500&h=600&fit=crop&auto=format",
  },
  {
    name: "편백 & 히노키 샤쉐",
    note: ["편백", "히노키", "녹차"],
    space: "차량·현관",
    duration: "약 4개월",
    price: "22,000원",
    badge: "BEST",
    img: "https://images.unsplash.com/photo-1784028260705-34d9b65a95b2?w=500&h=600&fit=crop&auto=format",
  },
];

const JOURNAL = [
  {
    type: "향과 기억",
    title: "향이 기억을 불러오는 방식",
    desc: "후각과 감정을 연결하는 뇌의 구조, 그리고 일상에서 향을 설계하는 방법",
    readTime: "4분",
    img: "https://images.unsplash.com/photo-1591195854242-8804547cdcab?w=600&h=400&fit=crop&auto=format",
  },
  {
    type: "공간과 향",
    title: "현관에 향을 두어야 하는 이유",
    desc: "공간의 첫인상을 결정하는 향의 역할과, 올바른 샤쉐 배치법",
    readTime: "3분",
    img: "https://images.unsplash.com/photo-1760227484899-5f7ccf87c456?w=600&h=400&fit=crop&auto=format",
  },
  {
    type: "사용 가이드",
    title: "샤쉐를 오래 사용하는 방법",
    desc: "향이 오래가도록 관리하는 실용적인 팁과, 소재별 관리 방법 안내",
    readTime: "2분",
    img: "https://images.unsplash.com/photo-1705493625048-f3ae8452d249?w=600&h=400&fit=crop&auto=format",
  },
];

const BENEFITS = [
  { icon: "✦", label: "무료배송", desc: "5만원 이상" },
  { icon: "◈", label: "안전결제", desc: "카드·계좌이체" },
  { icon: "◇", label: "향 샘플", desc: "구매 시 증정" },
  { icon: "◻", label: "선물 포장", desc: "무료 제공" },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useScrolled(threshold = 80) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useInterval(callback: () => void, delay: number) {
  const saved = useRef(callback);
  useEffect(() => { saved.current = callback; }, [callback]);
  useEffect(() => {
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

// ─── Components ──────────────────────────────────────────────────────────────

function PromoBar({ onClose }: { onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  useInterval(() => setIdx(i => (i + 1) % PROMO_MESSAGES.length), 4000);

  return (
    <div
      className="relative flex items-center justify-center px-10 text-center"
      style={{ backgroundColor: "#252525", height: 40, minHeight: 40 }}
    >
      <span
        key={idx}
        className="reveal text-xs tracking-widest"
        style={{ color: "#E9E4D8", fontFamily: "'Noto Sans KR', sans-serif", letterSpacing: "0.1em" }}
      >
        {PROMO_MESSAGES[idx]}
      </span>
      <button
        onClick={onClose}
        aria-label="공지 닫기"
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity"
        style={{ color: "#E9E4D8", fontSize: 16, lineHeight: 1 }}
      >
        ×
      </button>
    </div>
  );
}

function Header({ scrolled, promoVisible }: { scrolled: boolean; promoVisible: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const isOverlay = !scrolled && !menuOpen;
  const textColor = isOverlay ? "#FFFEF2" : "#2F2F2C";
  const bgColor = isOverlay ? "transparent" : "#FFFEF2";

  return (
    <>
      <header
        className="fixed left-0 right-0 z-50 transition-all"
        style={{
          top: promoVisible ? 40 : 0,
          backgroundColor: bgColor,
          borderBottom: scrolled ? `1px solid #D7D2C6` : "none",
          transition: "background-color 400ms cubic-bezier(0.65,0,.35,1), border-color 400ms",
        }}
      >
        {/* Desktop header row 1 */}
        <div className="hidden md:flex items-center justify-between px-16 h-16">
          <a
            href="#business"
            className="text-xs tracking-widest hover:opacity-60 transition-opacity"
            style={{ color: textColor, letterSpacing: "0.12em" }}
          >
            기업 제작 문의
          </a>

          <a
            href="#"
            className="absolute left-1/2 -translate-x-1/2 tracking-[0.35em] font-light"
            style={{
              color: textColor,
              fontFamily: "'Noto Serif KR', serif",
              fontSize: 22,
              letterSpacing: "0.35em",
              transition: "color 400ms",
            }}
          >
            SO'ONE
          </a>

          <div className="flex items-center gap-6">
            {["검색", "마이", "장바구니"].map(item => (
              <button
                key={item}
                className="text-xs tracking-widest hover:opacity-60 transition-opacity"
                style={{ color: textColor, letterSpacing: "0.1em" }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop nav row 2 */}
        <div
          className="hidden md:flex items-center justify-center gap-12 h-12 border-t"
          style={{ borderColor: isOverlay ? "rgba(255,255,255,0.2)" : "#D7D2C6" }}
        >
          {NAV_ITEMS.map(item => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setActiveMenu(item.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button
                className="text-xs tracking-widest hover:opacity-60 transition-opacity py-3"
                style={{ color: textColor, letterSpacing: "0.15em" }}
              >
                {item.label}
              </button>
              {activeMenu === item.label && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
                  style={{ minWidth: 140 }}
                >
                  <div
                    className="py-4 flex flex-col gap-1"
                    style={{ backgroundColor: "#FFFEF2", border: "1px solid #D7D2C6" }}
                  >
                    {item.sub.map(sub => (
                      <a
                        key={sub}
                        href="#"
                        className="px-5 py-2 text-xs hover:bg-[#F3F0E8] transition-colors whitespace-nowrap"
                        style={{ color: "#2F2F2C", letterSpacing: "0.05em" }}
                      >
                        {sub}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile header */}
        <div className="flex md:hidden items-center justify-between px-5 h-15" style={{ height: 60 }}>
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label="메뉴"
            style={{ color: textColor }}
            className="text-xl hover:opacity-60 transition-opacity"
          >
            {menuOpen ? "×" : "≡"}
          </button>
          <a
            href="#"
            className="tracking-[0.3em] font-light"
            style={{ color: textColor, fontFamily: "'Noto Serif KR', serif", fontSize: 18 }}
          >
            SO'ONE
          </a>
          <div className="flex items-center gap-4">
            <button style={{ color: textColor, fontSize: 14 }}>검색</button>
            <button style={{ color: textColor, fontSize: 14 }}>장바구니</button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col pt-24 px-8 overflow-y-auto"
          style={{ backgroundColor: "#FFFEF2" }}
        >
          {NAV_ITEMS.map(item => (
            <div key={item.label} className="border-b" style={{ borderColor: "#D7D2C6" }}>
              <div
                className="py-5 text-sm tracking-widest"
                style={{ color: "#2F2F2C", letterSpacing: "0.15em" }}
              >
                {item.label}
              </div>
              <div className="pb-4 flex flex-col gap-3 pl-2">
                {item.sub.map(sub => (
                  <a
                    key={sub}
                    href="#"
                    className="text-sm"
                    style={{ color: "#68675F" }}
                  >
                    {sub}
                  </a>
                ))}
              </div>
            </div>
          ))}
          <div className="mt-10 pb-10">
            <a href="#business" className="text-sm" style={{ color: "#68675F" }}>기업 제작 문의</a>
          </div>
        </div>
      )}
    </>
  );
}

function HeroSection() {
  const [slide, setSlide] = useState(0);
  const [playing, setPlaying] = useState(true);
  useInterval(
    () => { if (playing) setSlide(s => (s + 1) % HERO_SLIDES.length); },
    5000
  );

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "88svh", minHeight: 560 }}>
      {HERO_SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity"
          style={{
            opacity: i === slide ? 1 : 0,
            transition: "opacity 900ms cubic-bezier(0.65,0,.35,1)",
          }}
        >
          <img
            src={s.img}
            alt={s.caption}
            className="w-full h-full object-cover"
            style={{ backgroundColor: "#E9E4D8" }}
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }}
      />

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 px-8 md:px-20 pb-20 md:pb-28">
        <div className="max-w-[720px]">
          <p
            className="text-xs tracking-widest mb-6 reveal"
            style={{ color: "rgba(255,255,255,0.7)", letterSpacing: "0.2em" }}
          >
            {HERO_SLIDES[slide].caption}
          </p>
          <h1
            className="font-light leading-tight mb-8 reveal reveal-delay-1"
            style={{
              fontFamily: "'Noto Serif KR', serif",
              color: "#FFFEF2",
              fontSize: "clamp(28px, 4.5vw, 58px)",
              lineHeight: 1.25,
            }}
          >
            향은 보이지 않지만,<br />
            공간의 인상과 그날의 기억을<br />
            오래 남깁니다.
          </h1>
          <div className="flex flex-wrap gap-4 reveal reveal-delay-2">
            <button
              className="px-8 h-13 text-sm tracking-widest transition-all hover:bg-white hover:text-[#2F2F2C]"
              style={{
                backgroundColor: "#FFFEF2",
                color: "#2F2F2C",
                height: 52,
                letterSpacing: "0.1em",
                border: "none",
              }}
            >
              향을 만나보기
            </button>
            <button
              className="px-8 text-sm tracking-widest transition-all hover:bg-white hover:text-[#2F2F2C]"
              style={{
                backgroundColor: "transparent",
                color: "#FFFEF2",
                height: 52,
                letterSpacing: "0.1em",
                border: "1px solid rgba(255,255,255,0.6)",
              }}
            >
              나에게 맞는 향 찾기
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 right-8 md:right-20 flex items-center gap-5">
        <button
          onClick={() => setPlaying(v => !v)}
          className="text-xs tracking-widest transition-opacity hover:opacity-60"
          style={{ color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em" }}
          aria-label={playing ? "일시정지" : "재생"}
        >
          {playing ? "■" : "▶"}
        </button>
        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`슬라이드 ${i + 1}`}
              className="transition-all"
              style={{
                width: i === slide ? 24 : 6,
                height: 1,
                backgroundColor: i === slide ? "#FFFEF2" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandDeclaration() {
  return (
    <section
      className="flex items-center justify-center px-8 text-center"
      style={{
        backgroundColor: "#F3F0E8",
        paddingTop: "clamp(80px, 10vw, 160px)",
        paddingBottom: "clamp(80px, 10vw, 160px)",
      }}
    >
      <p
        className="font-light leading-relaxed max-w-[900px] reveal"
        style={{
          fontFamily: "'Noto Serif KR', serif",
          fontSize: "clamp(20px, 2.5vw, 34px)",
          lineHeight: 1.8,
          color: "#2F2F2C",
        }}
      >
        향은 보이지 않지만,{" "}
        <span style={{ color: "#666B8E" }}>공간의 인상</span>과{" "}
        <span style={{ color: "#666B8E" }}>그날의 기억</span>을 오래 남깁니다.
        <br />
        <span className="block mt-6 text-base" style={{ color: "#68675F", fontFamily: "'Noto Sans KR', sans-serif", fontSize: "clamp(14px, 1.2vw, 17px)" }}>
          SO'ONE은 향을 상품이 아닌, 공간과 기억을 설계하는 경험으로 제안합니다.
        </span>
      </p>
    </section>
  );
}

function MaterialSection() {
  return (
    <section className="grid md:grid-cols-2" style={{ backgroundColor: "#FFFEF2" }}>
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ height: "clamp(400px, 60vw, 720px)", backgroundColor: "#E9E4D8" }}
      >
        <img
          src="https://images.unsplash.com/photo-1591195854242-8804547cdcab?w=900&h=1100&fit=crop&auto=format"
          alt="한지와 면직물의 질감"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div
        className="flex flex-col justify-center px-10 md:px-20"
        style={{
          paddingTop: "clamp(60px, 8vw, 120px)",
          paddingBottom: "clamp(60px, 8vw, 120px)",
          backgroundColor: "#FFFEF2",
        }}
      >
        <span
          className="text-xs tracking-widest mb-8 reveal"
          style={{ color: "#8C897F", letterSpacing: "0.2em" }}
        >
          향을 머금는 소재
        </span>
        <h2
          className="font-light mb-6 reveal reveal-delay-1"
          style={{
            fontFamily: "'Noto Serif KR', serif",
            fontSize: "clamp(26px, 3vw, 42px)",
            lineHeight: 1.4,
            color: "#2F2F2C",
          }}
        >
          한지와 면직물,<br />
          향을 저장하는 소재
        </h2>
        <p
          className="leading-relaxed mb-10 reveal reveal-delay-2"
          style={{ color: "#68675F", fontSize: 16, lineHeight: 1.8 }}
        >
          SO'ONE의 샤쉐는 한국 전통 한지와 고밀도 면직물을 혼합하여 만듭니다.
          이 소재는 향을 머금었다가 천천히, 오랫동안 공간에 내보냅니다.
          인공적인 처리 없이도 최대 4개월간 향이 지속됩니다.
        </p>

        {/* Product preview */}
        <div
          className="p-6 mb-8 reveal reveal-delay-3"
          style={{ backgroundColor: "#F3F0E8", border: "1px solid #D7D2C6" }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs tracking-widest mb-2" style={{ color: "#8C897F", letterSpacing: "0.15em" }}>BEST SELLER</p>
              <p className="font-medium mb-1" style={{ color: "#2F2F2C", fontSize: 16 }}>화이트 코튼 샤쉐</p>
              <p className="text-sm" style={{ color: "#68675F" }}>코튼 · 머스크 · 시더우드</p>
              <p className="text-sm mt-1" style={{ color: "#8C897F" }}>지속 약 3개월 · 옷장·침실</p>
            </div>
            <div>
              <p className="font-medium text-right" style={{ color: "#2F2F2C", fontSize: 16 }}>18,000원</p>
            </div>
          </div>
          <button
            className="mt-5 w-full h-12 text-xs tracking-widest transition-all hover:bg-[#2F2F2C] hover:text-[#FFFEF2]"
            style={{
              backgroundColor: "#252525",
              color: "#FFFEF2",
              letterSpacing: "0.15em",
              border: "none",
            }}
          >
            장바구니에 담기
          </button>
        </div>

        <a
          href="#shop"
          className="inline-flex items-center gap-3 text-sm transition-all group"
          style={{ color: "#2F2F2C", letterSpacing: "0.05em" }}
        >
          <span>전체 컬렉션 보기</span>
          <span className="transition-transform group-hover:translate-x-2">→</span>
        </a>
      </div>
    </section>
  );
}

function SpaceSection() {
  return (
    <section
      style={{
        backgroundColor: "#FFFEF2",
        paddingTop: "clamp(80px, 10vw, 160px)",
        paddingBottom: "clamp(80px, 10vw, 160px)",
      }}
    >
      <div className="px-8 md:px-16 max-w-[1280px] mx-auto">
        <div className="mb-14">
          <span className="text-xs tracking-widest" style={{ color: "#8C897F", letterSpacing: "0.2em" }}>
            SPACE & SCENT
          </span>
          <h2
            className="mt-4 font-light reveal"
            style={{
              fontFamily: "'Noto Serif KR', serif",
              fontSize: "clamp(24px, 2.8vw, 40px)",
              color: "#2F2F2C",
              lineHeight: 1.4,
            }}
          >
            어떤 공간에 향을 남기고 싶나요?
          </h2>
        </div>

        {/* Desktop: asymmetric grid / Mobile: horizontal scroll */}
        <div className="hidden md:grid grid-cols-3 gap-px" style={{ backgroundColor: "#D7D2C6" }}>
          {SPACES.map((space, i) => (
            <a
              key={space.label}
              href="#"
              className="group relative overflow-hidden"
              style={{
                aspectRatio: i === 0 || i === 3 ? "4/5" : "4/5",
                backgroundColor: "#E9E4D8",
              }}
            >
              <img
                src={space.img}
                alt={space.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p
                  className="text-xs tracking-widest mb-1"
                  style={{ color: "rgba(255,255,255,0.65)", letterSpacing: "0.15em" }}
                >
                  {space.desc}
                </p>
                <p
                  className="font-medium"
                  style={{
                    fontFamily: "'Noto Serif KR', serif",
                    color: "#FFFEF2",
                    fontSize: 18,
                  }}
                >
                  {space.label}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile scroll */}
        <div className="flex md:hidden gap-4 overflow-x-auto product-rail pb-4 -mx-8 px-8">
          {SPACES.map(space => (
            <a
              key={space.label}
              href="#"
              className="flex-none group relative overflow-hidden"
              style={{ width: "72vw", aspectRatio: "4/5", backgroundColor: "#E9E4D8" }}
            >
              <img src={space.img} alt={space.label} className="w-full h-full object-cover" />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.65)" }}>{space.desc}</p>
                <p className="font-medium" style={{ fontFamily: "'Noto Serif KR', serif", color: "#FFFEF2", fontSize: 16 }}>{space.label}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionsSection() {
  return (
    <section style={{ backgroundColor: "#F3F0E8" }}>
      {COLLECTIONS.map((col, i) => (
        <div
          key={i}
          className={`grid md:grid-cols-5 ${col.reverse ? "md:grid-flow-dense" : ""}`}
          style={{ borderBottom: i < COLLECTIONS.length - 1 ? "1px solid #D7D2C6" : "none" }}
        >
          {/* Image: 60% = 3/5 cols */}
          <div
            className={`md:col-span-3 relative overflow-hidden ${col.reverse ? "md:col-start-3" : ""}`}
            style={{ minHeight: "clamp(300px, 45vw, 640px)", backgroundColor: "#E9E4D8" }}
          >
            <img
              src={col.img}
              alt={col.title.replace("\n", " ")}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text: 40% = 2/5 cols */}
          <div
            className={`md:col-span-2 flex flex-col justify-center px-10 md:px-14 ${col.reverse ? "md:col-start-1 md:row-start-1" : ""}`}
            style={{
              paddingTop: "clamp(48px, 6vw, 96px)",
              paddingBottom: "clamp(48px, 6vw, 96px)",
            }}
          >
            <span className="text-xs tracking-widest mb-6 reveal" style={{ color: "#78806B", letterSpacing: "0.2em" }}>
              {col.tag}
            </span>
            <h3
              className="font-light mb-6 reveal reveal-delay-1"
              style={{
                fontFamily: "'Noto Serif KR', serif",
                fontSize: "clamp(22px, 2.5vw, 36px)",
                lineHeight: 1.5,
                color: "#2F2F2C",
                whiteSpace: "pre-line",
              }}
            >
              {col.title}
            </h3>
            <p
              className="leading-relaxed mb-10 reveal reveal-delay-2"
              style={{ color: "#68675F", fontSize: 15, lineHeight: 1.85 }}
            >
              {col.desc}
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-3 text-sm transition-all group w-fit"
              style={{ color: "#2F2F2C", letterSpacing: "0.05em" }}
            >
              <span>컬렉션 보기</span>
              <span className="transition-transform group-hover:translate-x-2">→</span>
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}

function ProductRail() {
  return (
    <section
      style={{
        backgroundColor: "#FFFEF2",
        paddingTop: "clamp(80px, 10vw, 160px)",
        paddingBottom: "clamp(80px, 10vw, 160px)",
      }}
    >
      <div className="px-8 md:px-16 max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs tracking-widest block mb-3" style={{ color: "#8C897F", letterSpacing: "0.2em" }}>PRODUCTS</span>
            <h2
              className="font-light"
              style={{
                fontFamily: "'Noto Serif KR', serif",
                fontSize: "clamp(22px, 2.5vw, 36px)",
                color: "#2F2F2C",
              }}
            >
              공간에 오래 머무는 향
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:inline-flex items-center gap-2 text-sm group transition-all"
            style={{ color: "#2F2F2C", letterSpacing: "0.05em" }}
          >
            <span>전체 상품</span>
            <span className="transition-transform group-hover:translate-x-2">→</span>
          </a>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-4 gap-px" style={{ backgroundColor: "#D7D2C6" }}>
          {PRODUCTS.map(product => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="flex md:hidden gap-4 overflow-x-auto product-rail pb-4 -mx-8 px-8">
          {PRODUCTS.map(product => (
            <div key={product.name} className="flex-none" style={{ width: "80vw" }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  const [added, setAdded] = useState(false);

  return (
    <div className="group" style={{ backgroundColor: "#FFFEF2" }}>
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/5", backgroundColor: "#E9E4D8" }}>
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
        />
        {product.badge && (
          <span
            className="absolute top-4 left-4 text-xs tracking-widest px-3 py-1"
            style={{
              backgroundColor: product.badge === "NEW" ? "#666B8E" : "#252525",
              color: "#FFFEF2",
              letterSpacing: "0.15em",
              fontSize: 10,
            }}
          >
            {product.badge}
          </span>
        )}
      </div>

      <div className="p-5">
        <p className="font-medium mb-2" style={{ color: "#2F2F2C", fontSize: 15 }}>{product.name}</p>
        <p className="text-xs mb-1" style={{ color: "#8C897F" }}>
          {product.note.join(" · ")}
        </p>
        <p className="text-xs mb-1" style={{ color: "#8C897F" }}>{product.space}</p>
        <p className="text-xs mb-4" style={{ color: "#8C897F" }}>{product.duration}</p>
        <div className="flex items-center justify-between">
          <span className="font-medium" style={{ color: "#2F2F2C", fontSize: 15 }}>{product.price}</span>
          <button
            onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2000); }}
            className="text-xs px-4 h-9 tracking-widest transition-all hover:bg-[#2F2F2C] hover:text-[#FFFEF2]"
            style={{
              backgroundColor: added ? "#252525" : "transparent",
              color: added ? "#FFFEF2" : "#2F2F2C",
              border: "1px solid #D7D2C6",
              letterSpacing: "0.1em",
            }}
          >
            {added ? "✓ 담김" : "담기"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ScentFinderSection() {
  return (
    <section
      className="grid md:grid-cols-2"
      style={{ backgroundColor: "#252525", minHeight: "clamp(360px, 50vw, 580px)" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ minHeight: 320, backgroundColor: "#1a1a1a" }}>
        <img
          src="https://images.unsplash.com/photo-1761659567183-ae0a380f2efc?w=900&h=720&fit=crop&auto=format"
          alt="향기 파인더"
          className="w-full h-full object-cover opacity-70"
        />
      </div>

      {/* Text */}
      <div
        className="flex flex-col justify-center px-10 md:px-16"
        style={{
          paddingTop: "clamp(60px, 8vw, 120px)",
          paddingBottom: "clamp(60px, 8vw, 120px)",
        }}
      >
        <span
          className="text-xs tracking-widest mb-8 reveal"
          style={{ color: "#78806B", letterSpacing: "0.2em" }}
        >
          SCENT FINDER
        </span>
        <h2
          className="font-light mb-6 reveal reveal-delay-1"
          style={{
            fontFamily: "'Noto Serif KR', serif",
            fontSize: "clamp(24px, 2.8vw, 42px)",
            lineHeight: 1.45,
            color: "#FFFEF2",
          }}
        >
          나의 공간에 맞는<br />
          향을 찾아보세요
        </h2>
        <p
          className="leading-relaxed mb-10 reveal reveal-delay-2"
          style={{ color: "#8C897F", fontSize: 15, lineHeight: 1.85 }}
        >
          6가지 질문으로 당신의 공간, 분위기, 취향을 파악하고
          가장 잘 어울리는 SO'ONE의 향을 추천해드립니다.
        </p>
        <div className="flex items-center gap-6 reveal reveal-delay-3">
          <button
            className="px-8 text-sm tracking-widest transition-all hover:bg-[#FFFEF2] hover:text-[#2F2F2C]"
            style={{
              backgroundColor: "#FFFEF2",
              color: "#2F2F2C",
              height: 52,
              letterSpacing: "0.1em",
              border: "none",
            }}
          >
            나의 향 찾기
          </button>
          <span className="text-xs" style={{ color: "#68675F" }}>약 1분 소요</span>
        </div>
      </div>
    </section>
  );
}

function CorporateSection() {
  return (
    <section
      id="business"
      style={{
        backgroundColor: "#F3F0E8",
        paddingTop: "clamp(80px, 10vw, 160px)",
        paddingBottom: "clamp(80px, 10vw, 160px)",
      }}
    >
      <div className="px-8 md:px-16 max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <span className="text-xs tracking-widest block mb-8" style={{ color: "#7A604A", letterSpacing: "0.2em" }}>
              BUSINESS
            </span>
            <h2
              className="font-light mb-6 reveal"
              style={{
                fontFamily: "'Noto Serif KR', serif",
                fontSize: "clamp(24px, 2.8vw, 40px)",
                lineHeight: 1.45,
                color: "#2F2F2C",
              }}
            >
              브랜드의 기억을<br />
              향으로 남깁니다
            </h2>
            <p
              className="leading-relaxed mb-8 reveal reveal-delay-1"
              style={{ color: "#68675F", fontSize: 15, lineHeight: 1.85 }}
            >
              행사 기념품, 기업 선물, 브랜드 굿즈로 제작하는 맞춤 샤쉐와 디퓨저.
              로고·문구·패키지를 자유롭게 선택하고, 향도 직접 고를 수 있습니다.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { label: "최소 수량", value: "50개 ~" },
                { label: "제작 기간", value: "약 3~4주" },
                { label: "로고·문구", value: "별도 적용" },
                { label: "향 선택", value: "전 제품 가능" },
              ].map(item => (
                <div key={item.label} className="p-5" style={{ backgroundColor: "#E9E4D8" }}>
                  <p className="text-xs tracking-widest mb-2" style={{ color: "#8C897F", letterSpacing: "0.1em" }}>{item.label}</p>
                  <p className="font-medium" style={{ color: "#2F2F2C" }}>{item.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                className="px-8 text-sm tracking-widest transition-all hover:opacity-80"
                style={{
                  backgroundColor: "#252525",
                  color: "#FFFEF2",
                  height: 52,
                  letterSpacing: "0.1em",
                  border: "none",
                }}
              >
                제작 사례 보기
              </button>
              <button
                className="px-8 text-sm tracking-widest transition-all hover:bg-[#2F2F2C] hover:text-[#FFFEF2]"
                style={{
                  backgroundColor: "transparent",
                  color: "#2F2F2C",
                  height: 52,
                  letterSpacing: "0.1em",
                  border: "1px solid #D7D2C6",
                }}
              >
                견적 문의하기
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden" style={{ aspectRatio: "4/3", backgroundColor: "#E9E4D8" }}>
            <img
              src="https://images.unsplash.com/photo-1674620213535-9b2a2553ef40?w=900&h=700&fit=crop&auto=format"
              alt="기업 맞춤 패키지 사례"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function GiftSection() {
  return (
    <section className="grid md:grid-cols-5" style={{ backgroundColor: "#FFFEF2" }}>
      {/* Image 60% */}
      <div className="md:col-span-3 relative overflow-hidden" style={{ minHeight: "clamp(300px, 45vw, 600px)", backgroundColor: "#E9E4D8" }}>
        <img
          src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=900&h=700&fit=crop&auto=format"
          alt="SO'ONE 선물 서비스"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text 40% */}
      <div
        className="md:col-span-2 flex flex-col justify-center px-10 md:px-14"
        style={{
          paddingTop: "clamp(60px, 8vw, 120px)",
          paddingBottom: "clamp(60px, 8vw, 120px)",
        }}
      >
        <span className="text-xs tracking-widest block mb-8 reveal" style={{ color: "#8C897F", letterSpacing: "0.2em" }}>
          GIFT SERVICE
        </span>
        <h2
          className="font-light mb-6 reveal reveal-delay-1"
          style={{
            fontFamily: "'Noto Serif KR', serif",
            fontSize: "clamp(22px, 2.5vw, 36px)",
            lineHeight: 1.5,
            color: "#2F2F2C",
          }}
        >
          마음을 담은<br />
          SO'ONE의 선물 서비스
        </h2>
        <div className="flex flex-col gap-4 mb-10 reveal reveal-delay-2">
          {[
            { icon: "◻", text: "선물 포장 무료 제공" },
            { icon: "◇", text: "손글씨 메시지 카드" },
            { icon: "◈", text: "향 샘플 2종 동봉" },
            { icon: "✦", text: "기업 맞춤 리본·스티커" },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-4">
              <span style={{ color: "#666B8E", fontSize: 12 }}>{item.icon}</span>
              <span style={{ color: "#68675F", fontSize: 15 }}>{item.text}</span>
            </div>
          ))}
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-3 text-sm transition-all group w-fit"
          style={{ color: "#2F2F2C", letterSpacing: "0.05em" }}
        >
          <span>SO'ONE의 선물 서비스</span>
          <span className="transition-transform group-hover:translate-x-2">→</span>
        </a>
      </div>
    </section>
  );
}

function JournalSection() {
  return (
    <section
      style={{
        backgroundColor: "#F3F0E8",
        paddingTop: "clamp(80px, 10vw, 160px)",
        paddingBottom: "clamp(80px, 10vw, 160px)",
      }}
    >
      <div className="px-8 md:px-16 max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs tracking-widest block mb-3" style={{ color: "#8C897F", letterSpacing: "0.2em" }}>JOURNAL</span>
            <h2
              className="font-light reveal"
              style={{
                fontFamily: "'Noto Serif KR', serif",
                fontSize: "clamp(22px, 2.5vw, 36px)",
                color: "#2F2F2C",
              }}
            >
              향의 기록
            </h2>
          </div>
          <a href="#" className="hidden md:inline-flex items-center gap-2 text-sm group" style={{ color: "#2F2F2C" }}>
            <span>전체 보기</span>
            <span className="transition-transform group-hover:translate-x-2">→</span>
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: "#D7D2C6" }}>
          {JOURNAL.map((item, i) => (
            <a
              key={i}
              href="#"
              className="group"
              style={{ backgroundColor: "#FFFEF2" }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "3/2", backgroundColor: "#E9E4D8" }}>
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="text-xs tracking-widest mb-3" style={{ color: "#78806B", letterSpacing: "0.15em" }}>{item.type}</p>
                <h3
                  className="font-medium mb-3"
                  style={{
                    fontFamily: "'Noto Serif KR', serif",
                    fontSize: 17,
                    color: "#2F2F2C",
                    lineHeight: 1.5,
                  }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#68675F", lineHeight: 1.7 }}>{item.desc}</p>
                <p className="text-xs" style={{ color: "#8C897F" }}>읽기 {item.readTime}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsBar() {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4"
      style={{ backgroundColor: "#E9E4D8", borderTop: "1px solid #D7D2C6", borderBottom: "1px solid #D7D2C6" }}
    >
      {BENEFITS.map((b, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center py-8 text-center"
          style={{ borderRight: i < BENEFITS.length - 1 ? "1px solid #D7D2C6" : "none" }}
        >
          <span className="mb-3 text-base" style={{ color: "#666B8E" }}>{b.icon}</span>
          <p className="text-xs font-medium tracking-widest mb-1" style={{ color: "#2F2F2C", letterSpacing: "0.1em" }}>{b.label}</p>
          <p className="text-xs" style={{ color: "#8C897F" }}>{b.desc}</p>
        </div>
      ))}
    </div>
  );
}

function Footer() {
  const cols = [
    {
      title: "고객 지원",
      links: ["공지사항", "자주 묻는 질문", "1:1 문의", "교환·반품 안내"],
    },
    {
      title: "쇼핑 안내",
      links: ["배송 안내", "결제 안내", "선물 포장", "적립금·쿠폰"],
    },
    {
      title: "기업 주문",
      links: ["기업 굿즈 소개", "제작 사례", "제작 과정", "견적 문의"],
    },
    {
      title: "브랜드",
      links: ["브랜드 스토리", "저널", "향기 파인더", "인스타그램"],
    },
  ];

  return (
    <footer style={{ backgroundColor: "#252525" }}>
      <div className="px-8 md:px-16 py-16 max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          {/* Brand col */}
          <div className="md:col-span-1">
            <p
              className="tracking-[0.3em] font-light mb-4"
              style={{
                fontFamily: "'Noto Serif KR', serif",
                color: "#FFFEF2",
                fontSize: 18,
              }}
            >
              SO'ONE
            </p>
            <p className="text-xs leading-relaxed mb-6" style={{ color: "#68675F", lineHeight: 1.8 }}>
              향은 보이지 않지만,<br />
              공간의 인상과 그날의 기억을<br />
              오래 남깁니다.
            </p>
            <div className="flex gap-4">
              {["IG", "KT"].map(sns => (
                <a key={sns} href="#" className="text-xs hover:opacity-60 transition-opacity" style={{ color: "#8C897F", letterSpacing: "0.1em" }}>
                  {sns}
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {cols.map(col => (
              <div key={col.title}>
                <p className="text-xs tracking-widest mb-5" style={{ color: "#FFFEF2", letterSpacing: "0.15em" }}>{col.title}</p>
                <div className="flex flex-col gap-3">
                  {col.links.map(link => (
                    <a key={link} href="#" className="text-xs hover:opacity-80 transition-opacity" style={{ color: "#68675F" }}>
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ borderColor: "#3a3a3a" }}>
          <p className="text-xs" style={{ color: "#4a4a4a" }}>
            소원컴퍼니 · 대표: 홍길동 · 사업자등록번호: 000-00-00000 · 통신판매업신고: 제0000-서울-0000호
          </p>
          <p className="text-xs" style={{ color: "#4a4a4a" }}>
            © 2026 SO'ONE / 소원컴퍼니. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [promoVisible, setPromoVisible] = useState(true);
  const scrolled = useScrolled(80);

  return (
    <div style={{ backgroundColor: "#FFFEF2", minHeight: "100vh" }}>
      {promoVisible && <PromoBar onClose={() => setPromoVisible(false)} />}
      <Header scrolled={scrolled} promoVisible={promoVisible} />

      <main>
        {/* Hero — full-bleed, no top padding since header is overlay */}
        <HeroSection />

        {/* Brand Declaration */}
        <BrandDeclaration />

        {/* 50:50 Material + Product */}
        <MaterialSection />

        {/* Space × Scent */}
        <SpaceSection />

        {/* 60:40 Collections */}
        <CollectionsSection />

        {/* Product Rail */}
        <ProductRail />

        {/* Scent Finder */}
        <ScentFinderSection />

        {/* Corporate Goods */}
        <CorporateSection />

        {/* Gift Service */}
        <GiftSection />

        {/* Journal */}
        <JournalSection />

        {/* Benefits Bar */}
        <BenefitsBar />
      </main>

      <Footer />
    </div>
  );
}
