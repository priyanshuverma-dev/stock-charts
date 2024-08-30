"use client";

import AuthModal from "@/components/auth-modal";
import CreateChartModal from "@/components/create-chart-form";
import ChartModal from "@/components/chart-modal";
import React, { useEffect, useState } from "react";

const ModalsProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <AuthModal />
      <CreateChartModal />
      <ChartModal />
    </>
  );
};

export default ModalsProvider;
