import React from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full bg-linear-to-b from-green-50 via-blue-50 to-white text-gray-800">
      {/* Background decoration */}
      <div
        className="absolute inset-0 -z-10 opacity-20 bg-[url('/patterns/health-bg.svg')] bg-cover bg-center"
        aria-hidden="true"
      ></div>

      {/* Main layout */}
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="grow">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
