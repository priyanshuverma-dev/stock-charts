import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BarChartIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";

export default function Docs() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b bg-background px-4 py-3 shadow-sm md:px-6">
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
            prefetch={false}
          >
            <BarChartIcon className="h-6 w-6" />
            <span>Docs</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={"/chart/create"}
            className={cn(
              "flex items-center gap-2",
              buttonVariants({ variant: "default" })
            )}
          >
            <PlusIcon className="h-4 w-4" />
            <span>Create Chart</span>
          </Link>
          <Link
            href={"/dashboard"}
            className={cn(
              "flex items-center gap-2",
              buttonVariants({ variant: "default" })
            )}
          >
            <span>Dashboard</span>
          </Link>
        </div>
      </header>
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">
          Embed Stock Chart Documentation
        </h1>
        <p className="mb-8 text-lg">
          This documentation will guide you on how to embed a real-time stock
          chart on your website using our simple widget.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <p className="mb-4">
            To embed the stock chart widget on your website, you need to add the
            following HTML snippet to your webpage.
          </p>
          <div className=" text-white rounded-lg p-4 mb-6">
            <SyntaxHighlighter language="html">
              {`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Embed Stock Widget</title>
<link
rel="stylesheet"
href="https://cdn.jsdelivr.net/gh/priyanshuverma-dev/stock-charts/widget@latest/dist/bundle.css"
/>
</head>
<body>
<div class="stockviz" id="<client-id>"></div>
<script src="https://cdn.jsdelivr.net/gh/priyanshuverma-dev/stock-charts@latest/widget/dist/bundle.min.js"></script>
</body>
</html>
`}
            </SyntaxHighlighter>
          </div>
          <p>
            Replace{" "}
            <code className="bg-gray-200 p-1 rounded">{"<client-id>"}</code>{" "}
            with your actual client ID.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <p className="mb-4">
            The widget works by including a small script and stylesheet on your
            page, which handles the rendering of the chart. The chart updates in
            real-time using data streamed from{" "}
            <a href="https://fluvio.io" className="text-blue-500">
              Fluvio
            </a>
            .
          </p>
          <p className="mb-4">Here's how it works:</p>
          <ul className="list-disc list-inside">
            <li>Add the CSS file to style the chart.</li>
            <li>
              Place the div with your client ID where you want the chart to
              appear.
            </li>
            <li>Include the JavaScript file to initialize the widget.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Customization</h2>
          <p className="mb-4">
            You can customize the look and feel of the chart by passing
            additional parameters to the widget or by applying your own CSS
            styles.
          </p>
          <div className=" text-white rounded-lg p-4">
            <SyntaxHighlighter language="html">
              {`
<div class="stockviz" id="<client-id>" style="width: 600px; height: 400px;"></div>
`}
            </SyntaxHighlighter>
          </div>
          <p>
            Adjust the <code className="bg-gray-200 p-1 rounded">width</code>{" "}
            and <code className="bg-gray-200 p-1 rounded">height</code>{" "}
            properties to fit your layout.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Using with React</h2>
          <p className="mb-4">
            If you are using React, you can easily integrate the chart by using
            the <code className="bg-gray-200 p-1 rounded">useEffect</code> hook.
          </p>
          <div className=" text-white rounded-lg p-4">
            <SyntaxHighlighter language="jsx">
              {`
import React, { useEffect } from 'react';

export default function StockChartWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/gh/priyanshuverma-dev/stock-charts@latest/widget/dist/bundle.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div class="stockviz" id="<client-id>"></div>;
}
`}
            </SyntaxHighlighter>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
          <p>
            If you encounter any issues or have questions, feel free to reach
            out to our support team at{" "}
            <a
              href="mailto:priyanshuverma@outlook.in"
              className="text-blue-500"
            >
              priyanshuverma@outlook.in
            </a>
            .
          </p>
        </section>
      </div>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 StockViz. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
