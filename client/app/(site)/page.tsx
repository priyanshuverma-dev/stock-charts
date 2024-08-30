import { buttonVariants } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { codeSnippet } from "@/lib/utils";

export default function Page() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 bg-background w-full">
          <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
              prefetch={false}
            >
              <span>StockViz</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Create Chart
              </Link>
              <Link
                href="/auth"
                className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Login
              </Link>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid items-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Embed Real-Time Stock Charts on Your Website
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our service provides a simple code snippet that you can add to
                  your website to display a real-time stock chart powered by
                  Fluvio.io's high-performance data streaming.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/dashboard"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Create Your First Chart
                  </Link>
                  <Link
                    href={"#embed"}
                    className={buttonVariants({ variant: "outline" })}
                  >
                    Copy Code Snippet
                  </Link>
                </div>
              </div>
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Real-Time Data Streaming</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Our service uses Fluvio.io to provide real-time data
                      streaming for your stock charts. This ensures your users
                      see the latest stock prices and updates in real-time.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Responsive and Customizable</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      The stock chart is fully responsive and can be easily
                      customized to fit the design of your website. You can
                      adjust the size, colors, and other settings to match your
                      branding.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container grid items-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Reliable and Scalable</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Our service is built on top of Fluvio.io, a
                      high-performance data streaming platform that can handle
                      large amounts of traffic and data without any performance
                      issues.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Easy Integration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Integrating our stock chart into your website is a breeze.
                      Simply copy and paste the provided code snippet, and
                      you're good to go. No complex setup or configuration
                      required.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Bring Real-Time Stock Data to Your Website
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our service makes it easy to add real-time stock charts to
                  your website, so your users can stay up-to-date with the
                  latest market trends.
                </p>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32" id="embed">
            <div className="container items-center gap-8 px-4 md:px-6 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Embed Your Stock Chart
                </h2>
                <SyntaxHighlighter language="html">
                  {codeSnippet}
                </SyntaxHighlighter>

                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <p>
                    To create a new stock chart, visit the{" "}
                    <Link
                      href="/dashboard"
                      className="underline"
                      prefetch={false}
                    >
                      dashboard
                    </Link>{" "}
                    and follow the instructions to set up your chart. Once
                    you've created a chart, you can copy the code snippet and
                    embed it on your website.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
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
    </div>
  );
}
