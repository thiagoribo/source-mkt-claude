import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import StickyMobileCta from "@/components/shared/StickyMobileCta";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-[72px] isolate">{children}</main>
      <Footer />
      <StickyMobileCta />
    </div>
  );
}
