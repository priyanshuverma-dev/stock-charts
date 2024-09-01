import Link from "next/link";
import Script from "next/script";
import React from "react";

export default function ChartView({ id }: { id: string }) {
  return (
    <>
      {process.env.NODE_ENV == "development" ? (
        <div className="bg-secondary p-2 rounded-sm">
          You can't see embed chart in development. add client-id in
          <code> widget/index.html</code>.
          <br />
          And Visit{" "}
          <a className="text-blue-500" href="http://localhost:5173">
            http://localhost:5173
          </a>
        </div>
      ) : (
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
      )}
    </>
  );
}
