import ChartsGrid from "@/components/charts-grid";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { BarChartIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b bg-background px-4 py-3 shadow-sm md:px-6">
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
            prefetch={false}
          >
            <BarChartIcon className="h-6 w-6" />
            <span>Dashboard</span>
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
            href={"/docs"}
            className={cn(
              "flex items-center gap-2",
              buttonVariants({ variant: "default" })
            )}
          >
            <span>Docs</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 px-4 py-6 md:px-6 md:py-10">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Your Charts</h1>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <ChartsGrid />
          </div>
        </div>
      </main>
    </div>
  );
}
