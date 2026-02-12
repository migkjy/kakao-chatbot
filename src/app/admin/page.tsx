import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DEMO_PROFILES, BUSINESS_TYPE_LABELS } from "@/lib/scenarios";

export const metadata: Metadata = {
  title: "관리자 대시보드",
};

export default function AdminPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-bold">
            AI 챗봇
          </Link>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              홈
            </Link>
            <Link
              href="/admin"
              className="text-foreground font-medium"
            >
              관리자
            </Link>
            <Link href="/demo" className="hover:text-foreground transition-colors">
              데모
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">관리자 대시보드</h1>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          {[
            { label: "등록 고객사", value: "3", sub: "데모 포함" },
            { label: "활성 챗봇", value: "3", sub: "정상 운영" },
            { label: "오늘 대화", value: "0", sub: "API 연동 후 집계" },
            { label: "월 수익", value: "-", sub: "고객 확보 후" },
          ].map((stat, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm font-medium">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.sub}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Client List */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>고객사 관리</CardTitle>
                <CardDescription>등록된 비즈니스 챗봇 목록</CardDescription>
              </div>
              <Button size="sm" variant="outline" disabled>
                + 고객사 추가 (준비 중)
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>업체명</TableHead>
                  <TableHead>업종</TableHead>
                  <TableHead>연락처</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DEMO_PROFILES.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell>{BUSINESS_TYPE_LABELS[p.type]}</TableCell>
                    <TableCell>{p.phone}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        데모
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Link href="/demo">
                        <Button size="sm" variant="ghost">
                          테스트
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Scenario Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>시나리오 현황</CardTitle>
            <CardDescription>
              챗봇 응답 시나리오 — 현재 템플릿 기반 (AI 연동 예정)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "인사/환영",
                  keywords: "안녕, 하이, 반가",
                  status: "active",
                },
                {
                  name: "영업시간",
                  keywords: "영업시간, 몇시, 오픈, 마감",
                  status: "active",
                },
                {
                  name: "메뉴/서비스",
                  keywords: "메뉴, 가격, 얼마",
                  status: "active",
                },
                {
                  name: "위치 안내",
                  keywords: "위치, 주소, 어디",
                  status: "active",
                },
                {
                  name: "예약 안내",
                  keywords: "예약, 예약하기, 자리",
                  status: "active",
                },
                {
                  name: "연락처",
                  keywords: "전화, 연락처, 번호",
                  status: "active",
                },
                {
                  name: "AI 자유 응답",
                  keywords: "(매칭 실패 시)",
                  status: "pending",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div>
                    <div className="font-medium text-sm">{s.name}</div>
                    <div className="text-xs text-muted-foreground">
                      키워드: {s.keywords}
                    </div>
                  </div>
                  <Badge
                    variant={s.status === "active" ? "default" : "secondary"}
                  >
                    {s.status === "active" ? "활성" : "대기"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Logs (Mock) */}
        <Card>
          <CardHeader>
            <CardTitle>최근 대화 로그</CardTitle>
            <CardDescription>
              카카오 오픈빌더 연동 후 실시간 로그가 표시됩니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">
                카카오 오픈빌더 연동 후 대화 로그가 여기에 표시됩니다.
              </p>
              <p className="text-xs mt-2">
                현재는 /demo 페이지에서 테스트할 수 있습니다.
              </p>
              <Link href="/demo">
                <Button variant="outline" size="sm" className="mt-4">
                  데모 체험하기
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
