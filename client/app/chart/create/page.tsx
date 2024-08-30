"use client";
import CreateChartModal from "@/components/create-chart-form";
import { useEffect, useState } from "react";

export default function NewChart() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="">
      <CreateChartModal />
    </div>
  );
}
