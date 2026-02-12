import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "카카오톡 AI 챗봇 대행 서비스",
    template: "%s | 카카오톡 AI 챗봇",
  },
  description:
    "카카오톡 비즈니스 챗봇을 AI로 구동하는 제작/운영 대행 서비스. 음식점, 카페, 미용실 등 업종별 맞춤 챗봇을 제공합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
