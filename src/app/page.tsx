import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <span className="text-xl font-bold">AI 챗봇</span>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              홈
            </Link>
            <Link href="/admin" className="hover:text-foreground transition-colors">
              관리자
            </Link>
            <Link href="/demo" className="hover:text-foreground transition-colors">
              데모
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-12">
        {/* Hero */}
        <section className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            카카오톡 비즈니스 챗봇
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-4 md:text-5xl">
            AI가 24시간<br />
            고객 응대를 대신합니다
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            카카오톡 채널에 AI 챗봇을 연결하여 영업시간, 메뉴, 예약 안내 등
            반복적인 고객 문의를 자동으로 처리합니다.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/demo">
              <Button size="lg" className="text-base px-8 py-6">
                무료 데모 체험
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="lg" variant="outline" className="text-base px-8 py-6">
                관리자 대시보드
              </Button>
            </Link>
          </div>
        </section>

        {/* Business Types */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">업종별 맞춤 챗봇</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "\uD83C\uDF5C",
                title: "음식점",
                desc: "메뉴 안내, 영업시간, 예약 접수, 주차 안내",
                features: ["메뉴판 자동 응답", "예약 안내", "위치/주차 안내"],
              },
              {
                icon: "\u2615",
                title: "카페",
                desc: "음료 메뉴, 디저트, 매장 정보 안내",
                features: ["음료/디저트 메뉴", "매장 정보", "이벤트 안내"],
              },
              {
                icon: "\u2702\uFE0F",
                title: "미용실",
                desc: "시술 메뉴, 가격, 예약, 디자이너 안내",
                features: ["시술 메뉴/가격", "예약 안내", "디자이너 소개"],
              },
            ].map((biz, i) => (
              <Card key={i} className="text-center">
                <CardHeader>
                  <div className="text-4xl mb-2">{biz.icon}</div>
                  <CardTitle>{biz.title}</CardTitle>
                  <CardDescription>{biz.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-left space-y-1">
                    {biz.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2">
                        <span className="text-green-600 font-bold">V</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">이렇게 동작합니다</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { step: "1", title: "카카오 채널 연결", desc: "카카오톡 채널에 챗봇을 연결합니다" },
              { step: "2", title: "업종 정보 입력", desc: "메뉴, 영업시간, 주소 등을 입력합니다" },
              { step: "3", title: "AI가 학습", desc: "입력된 정보를 기반으로 AI가 응답을 생성합니다" },
              { step: "4", title: "24시간 응대", desc: "고객 문의에 자동으로 응답합니다" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 font-bold">
                  {s.step}
                </div>
                <h3 className="font-semibold mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">요금 안내</h2>
          <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>구축비</CardTitle>
                <CardDescription>초기 챗봇 제작</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">50~200만원</div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>업종별 시나리오 설계</li>
                  <li>카카오 오픈빌더 세팅</li>
                  <li>AI 학습 데이터 구축</li>
                  <li>테스트 및 배포</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>월정액</CardTitle>
                <CardDescription>운영 및 유지보수</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">10~30만원/월</div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>AI API 비용 포함</li>
                  <li>챗봇 성능 모니터링</li>
                  <li>시나리오 업데이트</li>
                  <li>월간 리포트</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 py-8 text-center text-sm text-muted-foreground">
          <p>카카오톡 AI 챗봇 대행 서비스</p>
          <p className="mt-1">소규모 비즈니스를 위한 AI 고객 응대 솔루션</p>
        </div>
      </footer>
    </div>
  );
}
