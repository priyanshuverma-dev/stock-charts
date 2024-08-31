import Link from "next/link";
import Script from "next/script";
import React from "react";

export default function ChartView({ id }: { id: string }) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://cdn.jsdelivr.net/gh/priyanshuverma-dev/stock-charts@latest/widget/dist/bundle.min.js"
      />
      <Link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/priyanshuverma-dev/stock-charts@latest/widget/dist/bundle.css"
      />
      <div className="stockviz finance-widget h-[300px]" id={id}></div>
    </>
  );
}
